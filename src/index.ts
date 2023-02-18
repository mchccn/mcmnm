import { compile } from "./compositor/compile";
import { SkinInfoManager } from "./managers/SkinInfoManager";
import { persistedTabKey } from "./managers/StorageManager";
import { TabsManager } from "./managers/TabsManager";
import { SkinRenderer } from "./renderer/SkinRenderer";
import { hydrateDownloadButton } from "./routines/hydrateDownloadButton";
import { hydrateResetButton } from "./routines/hydrateResetButton";
import { renderMadeBy } from "./routines/renderMadeBy";
import { startUp } from "./routines/startUp";

renderMadeBy({ timeout: 250 });

const skinInfo = new SkinInfoManager(await startUp());

const canvas = document.querySelector<HTMLCanvasElement>(".skin-model-preview")!;
const image = document.querySelector<HTMLImageElement>(".skin-flat-preview")!;

const renderer = new SkinRenderer(canvas, image);

hydrateResetButton();
hydrateDownloadButton(renderer);

const skinColor = document.createElement("label");
skinColor.htmlFor = "skinColor";
skinColor.textContent = "skin color";

const skinColorInput = document.createElement("input");
skinColorInput.type = "color";
skinColorInput.value = skinInfo.getMetadata("skin-color");

skinColorInput.addEventListener("change", () => {
    skinInfo.setMetadata("skin-color", skinColorInput.value);
});

skinColor.appendChild(skinColorInput);

const skinHighlight = document.createElement("label");
skinHighlight.htmlFor = "skinHighlight";
skinHighlight.textContent = "highlight";

const skinHighlightInput = document.createElement("input");
skinHighlightInput.type = "checkbox";
skinHighlightInput.name = "skinHighlight";

skinHighlightInput.checked = skinInfo.getMetadata("highlight");

skinHighlightInput.addEventListener("change", () => {
    skinInfo.setMetadata("highlight", !skinInfo.getMetadata("highlight"));
});

skinHighlight.appendChild(skinHighlightInput);

new TabsManager(
    document.querySelector<HTMLElement>(".core-app-container")!,
    [
        new TabsManager.Tab("head", [skinHighlight]),
        new TabsManager.Tab("body", [skinColor]),
        new TabsManager.Tab("arms", ["arms"]),
        new TabsManager.Tab("legs", ["legs"]),
    ],
    { persistedWithKey: persistedTabKey },
);

const rerender = async () => renderer.use((await compile(skinInfo.getCopy())).src);

rerender();

skinInfo.onChange(rerender);

renderer.start();
