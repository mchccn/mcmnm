import { calculateHighlight } from "../functions/calculateHighlight";
import type { SkinInfoManager } from "../managers/SkinInfoManager";
import { debounce } from "../utils/debounce";

export function createSkinHighlightComponent(skin: SkinInfoManager) {
    const highlightGroup = document.createElement("div");

    const highlight = document.createElement("label");
    highlight.htmlFor = "skinHighlight";
    highlight.textContent = "highlight";

    const highlightInput = document.createElement("select");
    highlightInput.name = "skinHighlight";

    highlightInput.append(
        ...["none", "auto", "custom"].map((text) => {
            const option = document.createElement("option");

            option.textContent = text;
            option.value = text;

            return option;
        }),
    );

    const initial = skin.getMetadata("highlight");

    highlightInput.value =
        typeof initial === "undefined" || initial === false ? "none" : initial === true ? "auto" : "custom";

    highlightInput.addEventListener("change", () => {
        customHighlight.style.display = highlightInput.value === "custom" ? "" : "none";

        if (highlightInput.value === "none") {
            return skin.setMetadata("highlight", false);
        }

        if (highlightInput.value === "auto") {
            return skin.setMetadata("highlight", true);
        }

        const highlight = calculateHighlight(skin.getCopy());

        customHighlightInput.value = highlight;

        return skin.setMetadata("highlight", highlight);
    });

    highlight.appendChild(highlightInput);

    const customHighlight = document.createElement("label");
    customHighlight.htmlFor = "skinCustomHighlight";
    customHighlight.textContent = "custom highlight color";

    customHighlight.style.display = typeof skin.getMetadata("highlight") === "string" ? "" : "none";

    const customHighlightInput = document.createElement("input");
    customHighlightInput.name = "skinCustomHighlight";
    customHighlightInput.type = "color";
    customHighlightInput.value = skin.getMetadata("highlight");

    customHighlightInput.addEventListener(
        "input",
        debounce(() => {
            skin.setMetadata("highlight", customHighlightInput.value);
        }, 100),
    );

    customHighlight.appendChild(customHighlightInput);

    highlightGroup.appendChild(highlight);
    highlightGroup.appendChild(customHighlight);

    return highlightGroup;
}
