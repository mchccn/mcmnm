import { calculateBlush } from "../../functions";
import type { SkinInfoManager } from "../../managers";
import { debounce, wrapTextInSpan } from "../../utils";

export function createSkinBlushComponent(skin: SkinInfoManager) {
    const group = document.createElement("div");
    group.classList.add("input-group");

    const label = document.createElement("label");
    label.htmlFor = "headBlush";

    label.append(wrapTextInSpan("blush"));

    const input = document.createElement("select");
    input.name = "headBlush";

    input.append(
        ...["none", "auto", "custom"].map((text) => {
            const option = document.createElement("option");

            option.textContent = text;
            option.value = text;

            return option;
        }),
    );

    const initial = skin.getMetadata("blush");

    input.value = typeof initial === "undefined" || initial === false ? "none" : initial === true ? "auto" : "custom";

    input.addEventListener("change", () => {
        custom.style.display = input.value === "custom" ? "" : "none";

        if (input.value === "none") {
            return skin.setMetadata("blush", false);
        }

        if (input.value === "auto") {
            return skin.setMetadata("blush", true);
        }

        const blush = calculateBlush(skin.getCopy());

        custom.value = blush;

        return skin.setMetadata("blush", blush);
    });

    label.append(input);

    const custom = document.createElement("input");
    custom.name = "headCustomBlush";
    custom.type = "color";
    custom.value = skin.getMetadata("blush");

    custom.style.display = typeof skin.getMetadata("blush") === "string" ? "" : "none";

    custom.addEventListener(
        "input",
        debounce(() => {
            skin.setMetadata("blush", custom.value);
        }, 100),
    );

    group.append(label);
    group.append(custom);

    return group;
}
