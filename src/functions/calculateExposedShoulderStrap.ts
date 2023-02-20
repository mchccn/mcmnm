import { mixColors } from "../colors";
import type { SkinInfo } from "../types";

export function calculateExposedShoulderStrap(skin: SkinInfo) {
    if (!("exposed-shoulder-strap" in skin.meta))
        throw new ReferenceError("skin meta key 'exposed-shoulder-strap' is not present");

    const meta = skin.meta["exposed-shoulder-strap"];

    if (meta === true) {
        const skinColor = mixColors(skin.meta["skin-color"] as string, "#BFBFBF");
        const strapColor = mixColors(skin.meta["skin-color"] as string, "#8D8D8D");

        return { skinColor, strapColor };
    }

    return meta as {
        skinColor: string;
        strapColor: string;
    };
}
