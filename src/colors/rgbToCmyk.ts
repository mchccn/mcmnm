export function rgbToCmyk(rgb: number[]) {
    if (rgb.length !== 3) throw new Error(`invalid rgb tuple provided, length is not 3: ${rgb.length}`);

    let c = 1 - rgb[0] / 255;
    let m = 1 - rgb[1] / 255;
    let y = 1 - rgb[2] / 255;

    const k = Math.min(c, m, y);

    c = (c - k) / (1 - k) || 0;
    m = (m - k) / (1 - k) || 0;
    y = (y - k) / (1 - k) || 0;

    return [c, m, y, k];
}
