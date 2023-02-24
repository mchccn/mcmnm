import { select } from "./utils/select";

export const partsPriorities = (
    [
        [
            "boy-black-hair", // hair goes over head
            "girl-black-hair", // hair goes over head
        ],

        ["shoes-1"], // shoes should go over pants

        ["cargo-pants"], // needs to cover waist

        ["exposed-shoulder-strap"], // must be drawn on over arms
        ["black-sweater"],

        ["base-skin"], // base
    ] as const
).flat();

export const hairParts = select<PartName>()("boy-black-hair", "girl-black-hair");
export const bodyParts = select<PartName>()("black-sweater");
export const armsParts = select<PartName>()();
export const legsParts = select<PartName>()("cargo-pants");
export const hairAccessoriesParts = select<PartName>()();
export const bodyAccessoriesParts = select<PartName>()();
export const armsAccessoriesParts = select<PartName>()("exposed-shoulder-strap");
export const legsAccessoriesParts = select<PartName>()("shoes-1");
export const accessoriesParts = [
    ...hairAccessoriesParts,
    ...bodyAccessoriesParts,
    ...armsAccessoriesParts,
    ...legsAccessoriesParts,
];

export type PartName = (typeof partsPriorities)[number];

export const partsList = [...partsPriorities].sort() as PartName[];

export enum Gender {
    BOY = "boy",
    GIRL = "girl",
    NEUTRAL = "neutral",
}

export const partsGender: Record<PartName, Gender> = {
    "boy-black-hair": Gender.BOY,
    "girl-black-hair": Gender.GIRL,
    "shoes-1": Gender.NEUTRAL,
    "cargo-pants": Gender.NEUTRAL,
    "exposed-shoulder-strap": Gender.GIRL,
    "black-sweater": Gender.NEUTRAL,
    "base-skin": Gender.NEUTRAL,
};

export const partsForGender = {
    [Gender.BOY]: Object.entries(partsGender)
        .filter(([, v]) => v === Gender.BOY)
        .map(([k]) => k) as PartName[],
    [Gender.GIRL]: Object.entries(partsGender)
        .filter(([, v]) => v === Gender.GIRL)
        .map(([k]) => k) as PartName[],
    [Gender.NEUTRAL]: Object.entries(partsGender)
        .filter(([, v]) => v === Gender.NEUTRAL)
        .map(([k]) => k) as PartName[],
};

export const partsDefaultMetadata: Record<PartName, unknown> = {
    "boy-black-hair": null,
    "girl-black-hair": null,
    "shoes-1": { "shoes-1": "#FFFFFF" },
    "cargo-pants": null,
    "exposed-shoulder-strap": { "skin-color": "#FFFFFF", "exposed-shoulder-strap": true },
    "black-sweater": null,
    "base-skin": null,
};
