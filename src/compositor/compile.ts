import { calculateBlush } from "../functions/calculateBlush";
import { calculateHighlight } from "../functions/calculateHighlight";
import { partsPriorities, type PartName } from "../parts";
import type { SkinInfo } from "../types";
import { composit } from "./composit";
import { dataToImage } from "./dataToImage";
import { getImageData } from "./getImageData";
import { loadImage } from "./loadImage";
import { replaceColors } from "./replaceColors";

const cache = new Map<string, ImageData>();

export async function compile(skin: SkinInfo) {
    const layers: PartName[] = (
        [
            "base-skin",
            skin.hair,
            skin.body,
            skin.arms,
            skin.legs,
            skin.accessories.hair,
            skin.accessories.body,
            skin.accessories.arms,
            skin.accessories.legs,
        ] as const
    )
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
                    const meta = skin.meta[layer] as { primary: string; secondary: string };

                    //TODO: CALCULATE COLORS HERE
                    // false/undefined -> error, since if this layer is present there must be metadata
                    // true -> auto, calculate colors for user
                    // anything else -> use custom colors from user

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
