export function rgbToHex(rgb: number[]) {
    if (rgb.length !== 3) throw new Error(`rgbToHex: invalid rgb tuple provided, length is not 3: ${rgb.length}`);

    return "#" + rgb.map((x) => x.toString(16).padStart(2, "0")).join("");
}
