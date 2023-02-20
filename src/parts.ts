import { select } from "./utils/select";

export const partsPriorities = (
    [
        [
            "boy-black-hair", // hair goes over head
            "girl-black-hair", // hair goes over head
        ],

        ["white-shoes"], // shoes should go over pants

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
export const legsAccessoriesParts = select<PartName>()("white-shoes");
export const accessoriesParts = [
    ...hairAccessoriesParts,
    ...bodyAccessoriesParts,
    ...armsAccessoriesParts,
    ...legsAccessoriesParts,
];

export type PartName = (typeof partsPriorities)[number];

export const partsList = [...partsPriorities].sort() as PartName[];

export const partsDefaultMetadata: Record<PartName, unknown> = {
    "boy-black-hair": null,
    "girl-black-hair": null,
    "white-shoes": null,
    "cargo-pants": null,
    "exposed-shoulder-strap": { "skin-color": "#FFFFFF", "exposed-shoulder-strap": true },
    "black-sweater": null,
    "base-skin": null,
};
