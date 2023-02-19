import { calculateBlush } from "../functions";
import type { SkinInfoManager } from "../managers/SkinInfoManager";
import { debounce } from "../utils/debounce";

export function createSkinBlushComponent(skin: SkinInfoManager) {
    const blushGroup = document.createElement("div");

    const blush = document.createElement("label");
    blush.htmlFor = "skinBlush";
    blush.textContent = "blush";

    const blushInput = document.createElement("select");
    blushInput.name = "skinBlush";

    blushInput.append(
        ...["none", "auto", "custom"].map((text) => {
            const option = document.createElement("option");

            option.textContent = text;
            option.value = text;

            return option;
        }),
    );

    const initial = skin.getMetadata("blush");

    blushInput.value =
        typeof initial === "undefined" || initial === false ? "none" : initial === true ? "auto" : "custom";

    blushInput.addEventListener("change", () => {
        customBlush.style.display = blushInput.value === "custom" ? "" : "none";

        if (blushInput.value === "none") {
            return skin.setMetadata("blush", false);
        }

        if (blushInput.value === "auto") {
            return skin.setMetadata("blush", true);
        }

        const blush = calculateBlush(skin.getCopy());

        customBlushInput.value = blush;

        return skin.setMetadata("blush", blush);
    });

    blush.appendChild(blushInput);

    const customBlush = document.createElement("label");
    customBlush.htmlFor = "skinCustomBlush";
    customBlush.textContent = "custom blush color";

    customBlush.style.display = typeof skin.getMetadata("blush") === "string" ? "" : "none";

    const customBlushInput = document.createElement("input");
    customBlushInput.name = "skinCustomBlush";
    customBlushInput.type = "color";
    customBlushInput.value = skin.getMetadata("blush");

    customBlushInput.addEventListener(
        "input",
        debounce(() => {
            skin.setMetadata("blush", customBlushInput.value);
        }, 100),
    );

    customBlush.appendChild(customBlushInput);

    blushGroup.appendChild(blush);
    blushGroup.appendChild(customBlush);

    return blushGroup;
}
