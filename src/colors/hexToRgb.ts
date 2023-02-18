export function hexToRgb(hex: string) {
    if (!/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex)) throw new Error(`invalid hex string provided: ${hex}`);

    return Array.from(
        hex
            .slice(1)
            .replace(/^([0-9a-fA-f])([0-9a-fA-f])([0-9a-fA-f])$/, "$1$1$2$2$3$3")
            .match(/.{1,2}/g)!,
    ).map((x) => parseInt(x, 16));
}
