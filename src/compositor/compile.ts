import { partsPriorities, type PartName } from "../data/skinParts";
import type { SkinInfo } from "../types";
import { composit } from "./composit";
import { dataToImage } from "./dataToImage";
import { getImageData } from "./getImageData";
import { loadImage } from "./loadImage";
import { replaceColors } from "./replaceColors";

const cache = new Map<string, ImageData>();

export async function compile(skin: SkinInfo) {
    const layers: PartName[] = ([
        "base-skin",
        skin.hair,
        skin.body,
        skin.arms,
        skin.legs,
        skin.accessories.hair,
        skin.accessories.body,
        skin.accessories.arms,
        skin.accessories.legs,
    ] as const)
        .flat()
        .filter(Boolean)
        .sort((a, b) => partsPriorities.indexOf(b) - partsPriorities.indexOf(a));

    const data = await Promise.all(
        layers.map(async (layer) => cache.get(layer) ?? getImageData(await loadImage(`./assets/layers/${layer}.png`))),
    );

    data.forEach((id, i) => cache.set(layers[i], id));

    return dataToImage(
        composit(
            ...data.map((id, i) => {
                const layer = layers[i];

                if (layer === "exposed-shoulder-strap") {
                    const meta = skin.meta[layer] as { primary: string; secondary: string };

                    return replaceColors(id, [
                        ["#FF0000", meta.primary],
                        ["#00FF00", meta.secondary],
                    ]);
                }

                return id;
            }),
        ),
    );
}