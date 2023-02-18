import { persistedProgressKey, StorageManager } from "../managers/StorageManager";
import type { SkinInfo } from "../types";
import { waitForClick } from "../utils/waitForClick";

function hideGenderSelection(options?: { noTransition?: boolean }) {
    const container = document.querySelector<HTMLElement>(".choose-gender-container")!;

    if (options?.noTransition) container.style.transition = "none";

    container.classList.add("choose-gender-done");

    if (options?.noTransition) setTimeout(() => (container.style.transition = ""));
}

export async function startUp() {
    const progress = StorageManager.get<SkinInfo>(persistedProgressKey);

    if (!progress) {
        const [chooseBoy, chooseGirl] = Array.from(document.querySelectorAll(".choose-gender-card"));

        const choice = await waitForClick(chooseBoy, chooseGirl);

        hideGenderSelection();

        StorageManager.set<SkinInfo>(persistedProgressKey, {
            gender: choice === chooseBoy ? "boy" : "girl",
            hair: choice === chooseBoy ? "boy-black-hair" : "girl-black-hair",
            body: "black-sweater",
            arms: undefined!,
            legs: "cargo-pants",
            accessories: {
                hair: [],
                body: [],
                arms: choice === chooseBoy ? [] : ["exposed-shoulder-strap"],
                legs: ["white-shoes"],
            },
            meta: Object.assign(
                { "skin-color": "#FFFFFF", highlight: true },
                choice === chooseBoy ? {} : { "exposed-shoulder-strap": { primary: "#E0E0E0", secondary: "#C7C7C7" } },
            ),
        });

        return StorageManager.get<SkinInfo>(persistedProgressKey)!;
    } else {
        hideGenderSelection({ noTransition: true });

        return progress;
    }
}
