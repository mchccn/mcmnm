import type { SkinInfo } from "../types";

export function calculateBlush(skin: SkinInfo) {
    return "blush" in skin.meta ? (skin.meta["blush"] as string) : (skin.meta["skin-color"] as string);
}
