import * as THREE from "three";
import { composit, dataToImage, getImageData, layerCache, loadImage, preprocess } from "../../compositor";
import { nullSkin } from "../../constants";
import type { SkinInfoManager } from "../../managers";
import { Gender, legsAccessoriesParts, partsDefaultMetadata, partsForGender } from "../../parts";
import { SkinRenderer } from "../../renderer/SkinRenderer";
import { wrapTextInSpan } from "../../utils";

export function createLegsAccessoriesComponent(skin: SkinInfoManager) {
    const container = document.createElement("div");
    container.classList.add("grid-container");

    const canvas = document.createElement("canvas");

    const renderer = new SkinRenderer({
        width: 175,
        height: 175 * (4 / 3),
        canvas,
        configure() {
            this.controls.enablePan = false;
            this.controls.enableRotate = false;
            this.controls.enableZoom = false;
            this.controls.target.y = 16;

            this.camera.position.x = 0;
            this.camera.position.y = 16;
            this.camera.position.z = 32;

            this.camera.lookAt(new THREE.Vector3(0, 16, 0));
        },
    });

    (async () => {
        for (const partName of legsAccessoriesParts.filter(
            (partName) =>
                partsForGender[Gender.NEUTRAL].includes(partName) ||
                partsForGender[skin.get("gender")].includes(partName),
        )) {
            const card = document.createElement("div");
            card.classList.add("layer-card");

            card.classList.toggle("card-selected", skin.get("legsAccessories").includes(partName));

            skin.onMetaChange(partName, () => {
                card.classList.toggle("card-selected", skin.get("legsAccessories").includes(partName));
            });

            card.addEventListener("click", () => {
                const accessories = skin.get("legsAccessories");

                if (accessories.includes(partName)) {
                    accessories.splice(accessories.indexOf(partName), 1);

                    skin.deleteMetadata(partName);

                    skin.set("legsAccessories", accessories);
                } else {
                    accessories.push(partName);

                    for (const key in partsDefaultMetadata[partName] ?? []) {
                        if (!skin.hasMetadata(key))
                            skin.setMetadata(key, partsDefaultMetadata[partName]![key]);
                    }

                    skin.set("legsAccessories", accessories);
                }
            });

            const image = document.createElement("img");

            image.draggable = false;

            const partImageData =
                layerCache.get(partName) ?? getImageData(await loadImage(`./assets/layers/${partName}.png`));

            const compiled = await dataToImage(
                composit(
                    layerCache.get("noop")!,
                    preprocess(
                        Object.assign(nullSkin, { meta: partsDefaultMetadata[partName] }),
                        partImageData,
                        partName,
                    ),
                ),
            );

            await renderer.use(compiled.src);

            renderer.render();

            image.src = (await dataToImage(renderer.getImageData())).src;

            card.append(image);
            card.append(wrapTextInSpan(partName.replaceAll("-", " ")));

            container.append(card);
        }
    })();

    return container;
}
