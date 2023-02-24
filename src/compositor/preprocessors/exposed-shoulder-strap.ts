import { calculateExposedShoulderStrap } from "../../functions";
import type { SkinInfo } from "../../types";
import { replaceColors } from "../replaceColors";

export default function (skin: SkinInfo, data: ImageData) {
    const { skinColor, strapColor } = calculateExposedShoulderStrap(skin);

    return replaceColors(data, [
        ["#FF0000", skinColor],
        ["#00FF00", strapColor],
    ]);
}
