import { persistedSkinKey, StorageManager } from "../managers/StorageManager";
import type { SkinInfo } from "../types";
import { waitForClick } from "../utils/waitForClick";

function hideGenderSelection(options?: { noTransition?: boolean }) {
    const container = document.querySelector<HTMLElement>(".choose-gender-container")!;

    if (options?.noTransition) container.style.transition = "none";

    container.classList.add("choose-gender-done");

    if (options?.noTransition) setTimeout(() => (container.style.transition = ""));
}

export async function startUp() {
    const progress = StorageManager.get<SkinInfo>(persistedSkinKey);

    if (!progress) {
        const [chooseBoy, chooseGirl] = Array.from(document.querySelectorAll(".choose-gender-card"));

        const choice = await waitForClick(chooseBoy, chooseGirl);

        hideGenderSelection();

        StorageManager.set<SkinInfo>(persistedSkinKey, {
            gender: choice === chooseBoy ? "boy" : "girl",
            hair: choice === chooseBoy ? "boy-black-hair" : "girl-black-hair",
            body: "black-sweater",
            arms: null!,
            legs: "cargo-pants",
            hairAccessories: [],
            bodyAccessories: [],
            armsAccessories: choice === chooseBoy ? [] : ["exposed-shoulder-strap"],
            legsAccessories: ["white-shoes"],
            meta: Object.assign(
                { "skin-color": "#FFFFFF", highlight: true },
                choice === chooseBoy ? {} : { "exposed-shoulder-strap": true },
            ),
        });

        return StorageManager.get<SkinInfo>(persistedSkinKey)!;
    } else {
        hideGenderSelection({ noTransition: true });

        return progress;
    }
}
