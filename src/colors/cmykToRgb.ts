export function cmykToRgb(cmyk: number[]) {
    if (cmyk.length !== 4) throw new Error(`invalid cmyk tuple provided, length is not 4: ${cmyk.length}`);

    let r = cmyk[0] * (1 - cmyk[3]) + cmyk[3];
    let g = cmyk[1] * (1 - cmyk[3]) + cmyk[3];
    let b = cmyk[2] * (1 - cmyk[3]) + cmyk[3];

    r = (1 - r) * 255 + 0.5;
    g = (1 - g) * 255 + 0.5;
    b = (1 - b) * 255 + 0.5;

    return [r, g, b];
}
