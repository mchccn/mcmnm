export function getImageData(image: HTMLImageElement) {
    const buffer = document.createElement("canvas");
    const ctx = buffer.getContext("2d")!;
    buffer.width = image.width;
    buffer.height = image.height;

    ctx.drawImage(image, 0, 0);

    return ctx.getImageData(0, 0, image.width, image.height);
}
