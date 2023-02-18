import type { PartName } from "./parts";
import type texturePositions from "./renderer/texturePositions";

type Of<T, U extends T> = Extract<T, U>;

export type SkinHair = Of<PartName, "boy-black-hair" | "girl-black-hair">;
export type SkinBody = Of<PartName, "black-sweater">;
export type SkinArms = Of<PartName, never>;
export type SkinLegs = Of<PartName, "cargo-pants">;
export type SkinHairAccessories = Of<PartName, never>;
export type SkinBodyAccessories = Of<PartName, never>;
export type SkinArmsAccessories = Of<PartName, "exposed-shoulder-strap">;
export type SkinLegsAccessories = Of<PartName, "white-shoes">;
export type SkinAccessories = SkinHairAccessories | SkinBodyAccessories | SkinArmsAccessories | SkinLegsAccessories;

export interface SkinInfo {
    gender: "boy" | "girl";
    hair: SkinHair;
    body: SkinBody;
    arms: SkinArms;
    legs: SkinLegs;
    accessories: {
        hair: SkinHairAccessories[];
        body: SkinBodyAccessories[];
        arms: SkinArmsAccessories[];
        legs: SkinLegsAccessories[];
    };
    meta: { [key: string]: unknown };
}

export type TexturePositions = typeof texturePositions;

export type FaceTexturePositions = TexturePositions[keyof TexturePositions];
