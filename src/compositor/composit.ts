import { cloneImageData } from "./cloneImageData";

export function composit(...layers: ImageData[]) {
    if (!layers.length) throw new Error("at least one layer must be provided");

    if (new Set(layers.map((l) => l.width)).size !== 1 || new Set(layers.map((l) => l.height)).size !== 1)
        throw new Error("dimensions of layers to composit should all be the same");

    const buffer = cloneImageData(layers[0]);

    for (const l of layers.slice(1)) {
        for (let i = 0; i < buffer.data.length; i += 4) {
            const alpha = l.data[i + 3];

            if (!alpha) continue;

            buffer.data[i + 0] = l.data[i + 0];
            buffer.data[i + 1] = l.data[i + 1];
            buffer.data[i + 2] = l.data[i + 2];
            buffer.data[i + 3] = l.data[i + 3];
        }
    }

    return buffer;
}
