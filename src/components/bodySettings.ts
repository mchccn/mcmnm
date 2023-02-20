import type { SkinInfoManager } from "../managers";
import { createBodySkinColorComponent } from "./bodySkinColor";

export function createBodySettingsComponent(skin: SkinInfoManager) {
    const container = document.createElement("div");

    container.classList.add("flex-col-with-gap");

    container.append(createBodySkinColorComponent(skin))

    return container;
}