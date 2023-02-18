import { hexToRgb } from "./hexToRgb";
import { rgbToHex } from "./rgbToHex";

export function gradientColors(from: string, to: string, steps: number): string[];
export function gradientColors(from: number[], to: number[], steps: number): number[][];
export function gradientColors(from: string | number[], to: string | number[], steps: number) {
    if (steps < 2) throw new RangeError(`must have at least 2 steps, received: ${steps}`);

    const [f, t] =
        typeof from === "string" && typeof to === "string"
            ? [hexToRgb(from), hexToRgb(to)]
            : Array.isArray(from) && Array.isArray(to)
            ? [from, to]
            : [
                  [0, 0, 0],
                  [0, 0, 0],
              ];

    void rgbToHex(f);
    void rgbToHex(t);

    const diffs = t.map((_, channel) => t[channel] - f[channel]);

    const colors = new Array(steps)
        .fill(0)
        .map((_, grade) => f.map((_, channel) => f[channel] + Math.round((diffs[channel] / steps) * grade)));

    if (typeof from === "string" && typeof to === "string") return colors.map(rgbToHex);

    return colors;
}
