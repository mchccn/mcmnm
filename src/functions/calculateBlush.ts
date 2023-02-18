import type { SkinInfo } from "../types";

export function calculateBlush(skin: SkinInfo) {
    //TODO: find some magical colors to calculate blush

    return "blush" in skin.meta ? (skin.meta["blush"] as string) : (skin.meta["skin-color"] as string);
}
