import type texturePositions from "./renderer/texturePositions";

export interface SkinInfo {
    gender: "boy" | "girl";
}

export type TexturePositions = typeof texturePositions;

export type FaceTexturePositions = TexturePositions[keyof TexturePositions];
