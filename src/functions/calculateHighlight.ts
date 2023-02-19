import { difference, mixColors } from "../colors";
import type { SkinInfo } from "../types";

export function calculateHighlight(skin: SkinInfo) {
    const skinColor = skin.meta["skin-color"] as string;

    let highlight = skin.meta["highlight"];

    if (typeof highlight === "undefined" || highlight === false) highlight = skinColor;

    if (highlight === true) highlight = mixColors(skinColor, difference(skinColor, "#6C8785"));

    return highlight as string;
}
