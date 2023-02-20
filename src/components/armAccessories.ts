import * as THREE from "three";
import { layerCache } from "../compositor/compile";
import { composit } from "../compositor/composit";
import { dataToImage } from "../compositor/dataToImage";
import { getImageData } from "../compositor/getImageData";
import { loadImage } from "../compositor/loadImage";
import { preprocess } from "../compositor/preprocess";
import { nullSkin } from "../constants";
import type { SkinInfoManager } from "../managers";
import { armsAccessoriesParts, partsDefaultMetadata } from "../parts";
import { SkinRenderer } from "../renderer/SkinRenderer";
import { wrapTextInSpan } from "../utils/wrapTextInSpan";

export function createArmsAccessoriesComponent(skin: SkinInfoManager) {
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
        for (const partName of armsAccessoriesParts) {
            const card = document.createElement("div");
            card.classList.add("layer-card");

            card.classList.toggle("card-selected", skin.get("armsAccessories").includes(partName));

            skin.onMetaChange(partName, () => {
                card.classList.toggle("card-selected", skin.get("armsAccessories").includes(partName));
            });

            card.addEventListener("click", () => {
                const accessories = skin.get("armsAccessories");

                if (accessories.includes(partName)) {
                    accessories.splice(accessories.indexOf(partName), 1);

                    skin.deleteMetadata(partName);

                    skin.set("armsAccessories", accessories);
                } else {
                    accessories.push(partName);

                    skin.setMetadata(partName, true);

                    skin.set("armsAccessories", accessories);
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
