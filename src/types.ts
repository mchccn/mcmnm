import type {
    armsAccessoriesParts,
    armsParts,
    bodyAccessoriesParts,
    bodyParts,
    hairAccessoriesParts,
    hairParts,
    legsAccessoriesParts,
    legsParts,
} from "./parts";
import type texturePositions from "./renderer/texturePositions";

export type SkinHair = (typeof hairParts)[number];
export type SkinBody = (typeof bodyParts)[number];
export type SkinArms = (typeof armsParts)[number];
export type SkinLegs = (typeof legsParts)[number];
export type SkinHairAccessories = (typeof hairAccessoriesParts)[number];
export type SkinBodyAccessories = (typeof bodyAccessoriesParts)[number];
export type SkinArmsAccessories = (typeof armsAccessoriesParts)[number];
export type SkinLegsAccessories = (typeof legsAccessoriesParts)[number];
export type SkinAccessories = SkinHairAccessories | SkinBodyAccessories | SkinArmsAccessories | SkinLegsAccessories;

export interface SkinInfo {
    gender: "boy" | "girl";
    hair: SkinHair;
    body: SkinBody;
    arms: SkinArms;
    legs: SkinLegs;
    hairAccessories: SkinHairAccessories[];
    bodyAccessories: SkinBodyAccessories[];
    armsAccessories: SkinArmsAccessories[];
    legsAccessories: SkinLegsAccessories[];
    meta: { [key: string]: unknown };
}

export type TexturePositions = typeof texturePositions;

export type FaceTexturePositions = TexturePositions[keyof TexturePositions];
