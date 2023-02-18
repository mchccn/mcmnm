export function cmykToRgb(cmyk: number[]) {
    if (cmyk.length !== 4) throw new Error(`invalid cmyk tuple provided, length is not 4: ${cmyk.length}`);

    let r = cmyk[0] * (1 - cmyk[3]) + cmyk[3];
    let g = cmyk[1] * (1 - cmyk[3]) + cmyk[3];
    let b = cmyk[2] * (1 - cmyk[3]) + cmyk[3];

    r = Math.max(0, Math.min(Math.round((1 - r) * 255 + 0.5), 255));
    g = Math.max(0, Math.min(Math.round((1 - g) * 255 + 0.5), 255));
    b = Math.max(0, Math.min(Math.round((1 - b) * 255 + 0.5), 255));

    return [r, g, b];
}
