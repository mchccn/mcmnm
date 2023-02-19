import { hexToRgb, rgbToHex } from "../colors";
import type { SkinInfo } from "../types";

export function calculateBlush(skin: SkinInfo) {
    const skinColor = skin.meta["skin-color"] as string;

    let blush = skin.meta["blush"];

    if (typeof blush === "undefined" || blush === false) blush = skinColor;

    if (blush === true) {
        const rgb = hexToRgb(skinColor);

        if (rgb[0] < 255 - 12) {
            rgb[0] += 12;
        } else {
            rgb[1] -= 12;
            rgb[2] -= 12;
        }

        blush = rgbToHex(rgb);
    }

    return blush as string;
}
