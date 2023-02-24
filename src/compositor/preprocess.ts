import type { PartName } from "../parts";
import type { SkinInfo } from "../types";

export const preprocessors = new Map<PartName, (skin: SkinInfo, data: ImageData) => ImageData>();

export function preprocess(skin: SkinInfo, data: ImageData, layer: PartName) {
    const preprocessor = preprocessors.get(layer);

    if (!preprocessor) return data;

    return preprocessor.call(undefined, skin, data);
}
