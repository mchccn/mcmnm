import { contrast } from "../colors/contrast";
import { difference } from "../colors/difference";
import { mixColors } from "../colors/mixColors";
import type { SkinInfo } from "../types";

export function calculateHighlight(skin: SkinInfo) {
    const skinColor = skin.meta["skin-color"] as string;

    let highlight = skin.meta["highlight"];

    if (typeof highlight === "undefined" || highlight === false) highlight = skinColor;
    else if (highlight === true) {
        highlight = mixColors(skinColor, difference(skinColor, "#6C8785"));

        if (contrast(highlight as string, skinColor) > 3) highlight = mixColors(skinColor, "#93787A");
    }

    return highlight as string;
}
