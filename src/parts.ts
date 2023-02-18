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

export type PartName = (typeof partsPriorities)[number];

export const partsList = [...partsPriorities].sort() as PartName[];
