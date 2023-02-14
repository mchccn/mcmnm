import { persistedProgressKey, StorageManager } from "../manager/StorageManager";
import type { SkinInfo } from "../types";
import { waitForClick } from "../utils/waitForClick";

function hideGenderSelection() {
    document.querySelector(".choose-gender-container")!.classList.add("choose-gender-done");
}

export async function startUp() {
    const progress = StorageManager.get<SkinInfo>(persistedProgressKey);

    if (!progress) {
        const [chooseBoy, chooseGirl] = Array.from(document.querySelectorAll(".choose-gender-card"));

        const choice = await waitForClick(chooseBoy, chooseGirl);

        hideGenderSelection();

        StorageManager.set(persistedProgressKey, {
            gender: choice === chooseBoy ? "boy" : "girl",
        } satisfies SkinInfo);
    } else {
        hideGenderSelection();

        // load skin info
    }
}
