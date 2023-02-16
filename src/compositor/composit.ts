export function composit(...layers: [ImageData, ...ImageData[]]) {
    if (new Set(layers.map((l) => l.width)).size !== 1 || new Set(layers.map((l) => l.height)).size !== 1)
        throw new Error("Dimensions of layers to composit should all be the same.");

    const buffer = new ImageData(new Uint8ClampedArray(layers[0].data), layers[0].width, layers[0].height);

    for (const l of layers.slice(1)) {
        for (let i = 0; i < buffer.data.length; i += 4) {
            const alpha = l.data[i + 3];

            if (!alpha) continue;

            buffer.data[i + 0] = l.data[i + 0];
            buffer.data[i + 1] = l.data[i + 1];
            buffer.data[i + 2] = l.data[i + 2];
        }
    }

    return buffer;
}
