import type { SkinInfoManager } from "../managers/SkinInfoManager";
import { debounce } from "../utils/debounce";

export function createSkinColorComponent(skin: SkinInfoManager) {
    const skinColorGroup = document.createElement("div");

    const skinColor = document.createElement("label");
    skinColor.htmlFor = "skinColor";
    skinColor.textContent = "skin color";

    const skinColorInput = document.createElement("input");
    skinColorInput.name = "skinColor";
    skinColorInput.type = "color";
    skinColorInput.value = skin.getMetadata("skin-color");

    skinColorInput.addEventListener(
        "input",
        debounce(() => {
            skin.setMetadata("skin-color", skinColorInput.value);
        }, 100),
    );

    skinColor.appendChild(skinColorInput);

    skinColorGroup.appendChild(skinColor);

    return skinColorGroup;
}
