import { hexToRgb } from "./hexToRgb";
import { rgbToHex } from "./rgbToHex";

export function difference(a: string, b: string): string;
export function difference(a: number[], b: number[]): number[];
export function difference(a: string | number[], b: string | number[]) {
    if (typeof a === "string" && typeof b === "string") {
        const t = hexToRgb(b);

        return rgbToHex(hexToRgb(a).map((v, i) => Math.max(0, Math.min(v - t[i], 255))));
    }

    if (Array.isArray(a) && Array.isArray(b)) {
        return a.map((v, i) => Math.max(0, Math.min(v - b[i], 255)));
    }

    throw new TypeError("mismatched types");
}
