import { hexToRgb } from "./hexToRgb";

export function luminance(color: string | number[]) {
    const rgb = (typeof color === "string" ? hexToRgb(color) : color).map((c) => {
        const v = c / 255;

        return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    });

    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}
