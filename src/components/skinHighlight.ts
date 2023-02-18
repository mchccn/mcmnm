import { calculateHighlight } from "../functions/calculateHighlight";
import type { SkinInfoManager } from "../managers/SkinInfoManager";
import { debounce } from "../utils/debounce";

export function createSkinHighlightComponent(skin: SkinInfoManager) {
    const skinHighlightGroup = document.createElement("div");

    const skinHighlight = document.createElement("label");
    skinHighlight.htmlFor = "skinHighlight";
    skinHighlight.textContent = "highlight";

    const skinHighlightInput = document.createElement("select");
    skinHighlightInput.name = "skinHighlight";

    skinHighlightInput.append(
        ...["none", "auto", "custom"].map((text) => {
            const option = document.createElement("option");

            option.textContent = text;
            option.value = text;

            return option;
        }),
    );

    const initial = skin.getMetadata("highlight");
    skinHighlightInput.value =
        typeof initial === "undefined" || initial === false ? "none" : initial === true ? "auto" : "custom";

    skinHighlightInput.addEventListener("change", () => {
        skinCustomHighlight.style.display = skinHighlightInput.value === "custom" ? "" : "none";

        if (skinHighlightInput.value === "none") {
            return skin.setMetadata("highlight", false);
        }

        if (skinHighlightInput.value === "auto") {
            return skin.setMetadata("highlight", true);
        }

        const highlight = calculateHighlight(skin.getCopy());

        skinCustomHighlightInput.value = highlight;

        return skin.setMetadata("highlight", highlight);
    });

    skinHighlight.appendChild(skinHighlightInput);

    const skinCustomHighlight = document.createElement("label");
    skinCustomHighlight.htmlFor = "skinCustomHighlight";
    skinCustomHighlight.textContent = "custom highlight color";

    skinCustomHighlight.style.display = typeof skin.getMetadata("highlight") === "string" ? "" : "none";

    const skinCustomHighlightInput = document.createElement("input");
    skinCustomHighlightInput.name = "skinCustomHighlight";
    skinCustomHighlightInput.type = "color";
    skinCustomHighlightInput.value = skin.getMetadata("highlight");

    skinCustomHighlightInput.addEventListener(
        "input",
        debounce(() => {
            skin.setMetadata("highlight", skinCustomHighlightInput.value);
        }, 100),
    );

    skinCustomHighlight.appendChild(skinCustomHighlightInput);

    skinHighlightGroup.appendChild(skinHighlight);
    skinHighlightGroup.appendChild(skinCustomHighlight);

    return skinHighlightGroup;
}
