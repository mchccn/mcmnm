import type { SkinInfo } from "../../types";
import { replaceColors } from "../replaceColors";

export default function (skin: SkinInfo, data: ImageData) {
    const shoeColor = skin.meta["shoes-1"] as string;

    return replaceColors(data, [
        ["#FF0000", shoeColor],
    ]);
}
