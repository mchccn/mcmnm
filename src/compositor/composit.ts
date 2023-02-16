export function composit(...layers: ImageData[]) {
    const buffer = document.createElement("canvas");
    const ctx = buffer.getContext("2d")!;
    buffer.width = Math.max(...layers.map((l) => l.width));
    buffer.height = Math.max(...layers.map((l) => l.height));
    
    for (const layer of layers) ctx.putImageData(layer, 0, 0);
    
    return ctx.getImageData(0, 0, buffer.width, buffer.height);
}