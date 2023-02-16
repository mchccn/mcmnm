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
        });

        return StorageManager.get<SkinInfo>(persistedProgressKey)!;
    } else {
        hideGenderSelection({ noTransition: true });

        return progress;
    }
}
