import type { SkinInfoManager } from "../../managers";
import type { SkinInfo, SkinLegsAccessories } from "../../types";
import { createShoesOneSettings } from "./legShoesOneSettings";

export function createLegsSettingsComponent(skin: SkinInfoManager) {
    const container = document.createElement("div");

    container.classList.add("flex-col-with-gap");

    const map: Record<SkinLegsAccessories, (skin: SkinInfoManager) => HTMLElement> = {
        "shoes-1": createShoesOneSettings,
    };

    function update(info: SkinInfo) {
        Array.from(container.children).forEach((child) => {
            if (!(child instanceof HTMLElement)) return;

            if (!info.legsAccessories.includes(child.dataset.tracked as SkinLegsAccessories)) child.remove();
        });

        for (const key of info.legsAccessories) {
            if (!container.querySelector(`[data-tracked=${key}]`)) {
                const element = map[key].call(undefined, skin);

                element.dataset.tracked = key;

                container.append(element);
            }
        }
    }

    for (const key of skin.get("legsAccessories")) {
        const element = map[key].call(undefined, skin);

        element.dataset.tracked = key;

        container.append(element);
    }

    skin.onChange(update);

    return container;
}
