import type { SkinInfoManager } from "../../managers";
import { createSkinBlushComponent } from "./headBlush";
import { createHeadHighlightComponent } from "./headHighlight";

export function createHeadSettingsComponent(skin: SkinInfoManager) {
    const container = document.createElement("div");

    container.classList.add("flex-col-with-gap");

    container.append(createHeadHighlightComponent(skin));
    container.append(createSkinBlushComponent(skin));

    return container;
}
