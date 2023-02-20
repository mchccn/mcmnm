import type { SkinInfoManager } from "../managers";
import type { SkinArmsAccessories, SkinInfo } from "../types";
import { createArmExposedShoulderStrapSettings } from "./armExposedShoulderStrapSettings";

export function createArmsSettingsComponent(skin: SkinInfoManager) {
    const container = document.createElement("div");

    container.classList.add("flex-col-with-gap");

    const map: Record<SkinArmsAccessories, (skin: SkinInfoManager) => HTMLElement> = {
        "exposed-shoulder-strap": createArmExposedShoulderStrapSettings,
    };

    function update(info: SkinInfo) {
        Array.from(container.children).forEach((child) => {
            if (!(child instanceof HTMLElement)) return;

            if (!info.armsAccessories.includes(child.dataset.tracked as SkinArmsAccessories)) child.remove();
        });

        for (const key of info.armsAccessories) {
            if (!container.querySelector(`[data-tracked=${key}]`)) {
                const element = map[key].call(undefined, skin);

                element.dataset.tracked = key;

                container.append(element);
            }
        }
    }

    for (const key of skin.get("armsAccessories")) {
        const element = map[key].call(undefined, skin);

        element.dataset.tracked = key;

        container.append(element);
    }

    skin.onChange(update);

    return container;
}
