import type { SkinInfoManager } from "../../managers";
import { debounce, wrapTextInSpan } from "../../utils";

export function createShoesOneSettings(skin: SkinInfoManager) {
    const group = document.createElement("div");
    group.classList.add("input-group");

    const label = document.createElement("label");
    label.htmlFor = "legsShoeColor";

    label.append(wrapTextInSpan("shoe color"));

    const input = document.createElement("input");
    input.name = "legsShoeColor";
    input.type = "color";
    input.value = skin.getMetadata("skin-color");

    input.addEventListener(
        "input",
        debounce(() => {
            skin.setMetadata("shoes-1", input.value);
        }, 100),
    );

    label.prepend(input);

    group.append(label);

    return group;
}