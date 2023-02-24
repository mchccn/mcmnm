import { calculateHighlight } from "../../functions";
import type { SkinInfoManager } from "../../managers";
import { debounce, wrapTextInSpan } from "../../utils";

export function createHeadHighlightComponent(skin: SkinInfoManager) {
    const group = document.createElement("div");
    group.classList.add("input-group");

    const label = document.createElement("label");
    label.htmlFor = "headHighlight";

    label.append(wrapTextInSpan("highlight"));

    const input = document.createElement("select");
    input.name = "headHighlight";

    input.append(
        ...["none", "auto", "custom"].map((text) => {
            const option = document.createElement("option");

            option.textContent = text;
            option.value = text;

            return option;
        }),
    );

    const initial = skin.getMetadata("highlight");

    input.value = typeof initial === "undefined" || initial === false ? "none" : initial === true ? "auto" : "custom";

    input.addEventListener("change", () => {
        custom.style.display = input.value === "custom" ? "" : "none";

        if (input.value === "none") {
            return skin.setMetadata("highlight", false);
        }

        if (input.value === "auto") {
            return skin.setMetadata("highlight", true);
        }

        const highlight = calculateHighlight(skin.getCopy());

        custom.value = highlight;

        return skin.setMetadata("highlight", highlight);
    });

    label.append(input);

    const custom = document.createElement("input");
    custom.name = "headCustomHighlight";
    custom.type = "color";
    custom.value = skin.getMetadata("highlight");

    custom.style.display = typeof skin.getMetadata("highlight") === "string" ? "" : "none";

    custom.addEventListener(
        "input",
        debounce(() => {
            skin.setMetadata("highlight", custom.value);
        }, 100),
    );

    group.append(label);
    group.append(custom);

    return group;
}
