import { persistedSkinKey, persistedTabKey, StorageManager } from "../managers/StorageManager";

export function hydrateResetButton() {
    document.querySelector(".skin-reset-button")!.addEventListener("click", () => {
        StorageManager.delete(persistedSkinKey);
        StorageManager.delete(persistedTabKey);

        location.reload();
    });
}
