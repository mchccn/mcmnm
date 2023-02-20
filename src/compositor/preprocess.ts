import { calculateBlush, calculateExposedShoulderStrap, calculateHighlight } from "../functions";
import type { PartName } from "../parts";
import type { SkinInfo } from "../types";
import { replaceColors } from "./replaceColors";

export function preprocess(skin: SkinInfo, id: ImageData, layer: PartName) {
    if (layer === "base-skin") {
        const skinColor = skin.meta["skin-color"] as string;
        const highlight = calculateHighlight(skin);
        const blush = calculateBlush(skin);

        return replaceColors(id, [
            ["#FF0000", skinColor],
            ["#00FF00", highlight],
            ["#0000FF", blush],
        ]);
    }

    if (layer === "exposed-shoulder-strap") {
        const { skinColor, strapColor } = calculateExposedShoulderStrap(skin);

        return replaceColors(id, [
            ["#FF0000", skinColor],
            ["#00FF00", strapColor],
        ]);
    }

    return id;
}
