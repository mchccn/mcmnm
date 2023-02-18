import { cmykToRgb } from "./cmykToRgb";
import { hexToRgb } from "./hexToRgb";
import { rgbToCmyk } from "./rgbToCmyk";
import { rgbToHex } from "./rgbToHex";

function mixCmyks(...cmyks: number[][]) {
    const c = cmyks.map((cmyk) => cmyk[0]).reduce((a, b) => a + b, 0) / cmyks.length;
    const m = cmyks.map((cmyk) => cmyk[1]).reduce((a, b) => a + b, 0) / cmyks.length;
    const y = cmyks.map((cmyk) => cmyk[2]).reduce((a, b) => a + b, 0) / cmyks.length;
    const k = cmyks.map((cmyk) => cmyk[3]).reduce((a, b) => a + b, 0) / cmyks.length;

    return [c, m, y, k];
}

export function mixColors(...colors: string[]): string;
export function mixColors(...colors: number[][]): number[];
export function mixColors(...colors: string[] | number[][]) {
    const normalized = colors.map((color) => (typeof color === "string" ? hexToRgb(color) : color));
    const cmyks = normalized.map(rgbToCmyk);

    const mixed = mixCmyks(...cmyks);

    return typeof colors[0] === "string" ? rgbToHex(cmykToRgb(mixed)) : cmykToRgb(mixed);
}
