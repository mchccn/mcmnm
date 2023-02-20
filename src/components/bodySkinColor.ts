import type { SkinInfoManager } from "../managers/SkinInfoManager";
import { debounce } from "../utils/debounce";
import { wrapTextInSpan } from "../utils/wrapTextInSpan";

export function createBodySkinColorComponent(skin: SkinInfoManager) {
    const group = document.createElement("div");
    group.classList.add("input-group");

    const label = document.createElement("label");
    label.htmlFor = "bodySkinColor";

    label.append(wrapTextInSpan("skin color"));

    const input = document.createElement("input");
    input.name = "bodySkinColor";
    input.type = "color";
    input.value = skin.getMetadata("skin-color");

    input.addEventListener(
        "input",
        debounce(() => {
            skin.setMetadata("skin-color", input.value);
        }, 100),
    );

    label.prepend(input);

    group.append(label);

    return group;
}
