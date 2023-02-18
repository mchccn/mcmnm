import { hexToRgb } from "./hexToRgb";
import { rgbToHex } from "./rgbToHex";

export function adjustColor(color: string, amount: number): string;
export function adjustColor(color: number[], amount: number): number[];
export function adjustColor(color: string | number[], amount: number) {
    const rgb = typeof color === "string" ? hexToRgb(color) : color;

    void rgbToHex(rgb);

    const adjusted = rgb.map((v) => Math.max(0, Math.min(v + amount, 255)));

    if (typeof color === "string") return rgbToHex(adjusted);

    return adjusted;
}
