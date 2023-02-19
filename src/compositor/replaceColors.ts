import { hexToRgb } from "../colors";
import { cloneImageData } from "./cloneImageData";

export function replaceColors(image: ImageData, map: [string | number[], string | number[]][]) {
    const buffer = cloneImageData(image);

    for (let i = 0; i < buffer.data.length; i += 4) {
        const entry = map.find(
            ([from]) => (
                (from = typeof from === "string" ? hexToRgb(from) : from),
                buffer.data[i + 0] === from[0] && buffer.data[i + 1] === from[1] && buffer.data[i + 2] === from[2]
            ),
        );

        if (entry) {
            const to = typeof entry[1] === "string" ? hexToRgb(entry[1]) : entry[1];

            buffer.data[i + 0] = to[0];
            buffer.data[i + 1] = to[1];
            buffer.data[i + 2] = to[2];
        }
    }

    return buffer;
}
