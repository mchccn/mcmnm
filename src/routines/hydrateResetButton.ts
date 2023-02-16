import { persistedProgressKey, StorageManager } from "../managers/StorageManager";

export function hydrateResetButton() {
    document.querySelector(".skin-reset-button")!.addEventListener("click", () => {
        StorageManager.delete(persistedProgressKey);

        location.reload();
    });
}
