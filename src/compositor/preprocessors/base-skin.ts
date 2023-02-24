import { calculateBlush, calculateHighlight } from "../../functions";
import type { SkinInfo } from "../../types";
import { replaceColors } from "../replaceColors";

export default function (skin: SkinInfo, data: ImageData) {
    const skinColor = skin.meta["skin-color"] as string;
    const highlight = calculateHighlight(skin);
    const blush = calculateBlush(skin);

    return replaceColors(data, [
        ["#FF0000", skinColor],
        ["#00FF00", highlight],
        ["#0000FF", blush],
    ]);
}
