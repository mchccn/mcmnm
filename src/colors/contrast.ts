import { luminance } from "./luminance";

export function contrast(a: string | number[], b: string | number[]) {
    const al = luminance(a);
    const bl = luminance(b);

    const brightest = Math.max(al, bl);
    const darkest = Math.min(al, bl);

    return (brightest + 0.05) / (darkest + 0.05);
}
