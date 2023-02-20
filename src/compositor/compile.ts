import { partsPriorities, type PartName } from "../parts";
import type { SkinInfo } from "../types";
import { composit } from "./composit";
import { dataToImage } from "./dataToImage";
import { getImageData } from "./getImageData";
import { loadImage } from "./loadImage";
import { preprocess } from "./preprocess";

export const layerCache = new Map<string, ImageData>([["noop", getImageData(await loadImage("./assets/noop.png"))]]);

export async function compile(skin: SkinInfo) {
    const layers: PartName[] = (
        [
            "base-skin",
            skin.hair,
            skin.body,
            skin.arms,
            skin.legs,
            skin.hairAccessories,
            skin.bodyAccessories,
            skin.armsAccessories,
            skin.legsAccessories,
        ] as const
    )
        .flat()
        .filter(Boolean)
        .sort((a, b) => partsPriorities.indexOf(b) - partsPriorities.indexOf(a));

    const data = await Promise.all(
        layers.map(
            async (layer) => layerCache.get(layer) ?? getImageData(await loadImage(`./assets/layers/${layer}.png`)),
        ),
    );

    data.forEach((id, i) => layerCache.set(layers[i], id));

    return dataToImage(
        composit(
            getImageData(await loadImage(`./assets/layers/watermark.png`)),
            ...data.map((id, i) => preprocess(skin, id, layers[i])),
        ),
    );
}
