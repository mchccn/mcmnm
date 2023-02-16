import { loadImage } from "./loadImage";

export async function dataToImage(data: ImageData) {
    const buffer = document.createElement("canvas");
    const ctx = buffer.getContext("2d")!;
    buffer.width = data.width;
    buffer.height = data.height;
    
    ctx.putImageData(data, 0, 0);
    
    return loadImage(buffer.toDataURL());
}