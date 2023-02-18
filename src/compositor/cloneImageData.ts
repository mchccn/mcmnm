export function cloneImageData(image: ImageData) {
    return new ImageData(new Uint8ClampedArray(image.data), image.width, image.height);
}
