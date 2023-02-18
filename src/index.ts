import { compile } from "./compositor/compile";
import { composit } from "./compositor/composit";
import { dataToImage } from "./compositor/dataToImage";
import { getImageData } from "./compositor/getImageData";
import { loadImage } from "./compositor/loadImage";
import { persistedTabKey } from "./managers/StorageManager";
import { TabsManager } from "./managers/TabsManager";
import { SkinRenderer } from "./renderer/SkinRenderer";
import { hydrateDownloadButton } from "./routines/hydrateDownloadButton";
import { hydrateResetButton } from "./routines/hydrateResetButton";
import { renderMadeBy } from "./routines/renderMadeBy";
import { startUp } from "./routines/startUp";

renderMadeBy({ timeout: 250 });

const skinInfo = await startUp();

const canvas = document.querySelector<HTMLCanvasElement>(".skin-model-preview")!;
const image = document.querySelector<HTMLImageElement>(".skin-flat-preview")!;

const renderer = new SkinRenderer(canvas, image);

hydrateResetButton();
hydrateDownloadButton(renderer);

const addInput = document.createElement("input");
const addButton = document.createElement("button");

addInput.placeholder = "username";
addButton.textContent = "add";

addButton.addEventListener("click", async () => {
    try {
        const image = await loadImage(`https://mineskin.eu/skin/${addInput.value}`);

        const composited = await dataToImage(composit(getImageData(renderer.texture!.image), getImageData(image)));

        await renderer.use(composited.src);
    } catch (e) {
        alert("Unable to load: " + e);
    }
});

const replaceInput = document.createElement("input");
const replaceButton = document.createElement("button");

replaceInput.placeholder = "username";
replaceButton.textContent = "replace";

replaceButton.addEventListener("click", async () => {
    try {
        const image = await loadImage(`https://mineskin.eu/skin/${replaceInput.value}`);

        await renderer.use(image.src);
    } catch (e) {
        alert("Unable to load: " + e);
    }
});

new TabsManager(
    document.querySelector<HTMLElement>(".core-app-container")!,
    [
        new TabsManager.Tab("head", ["head", addInput, addButton, replaceInput, replaceButton]),
        new TabsManager.Tab("body", ["body"]),
        new TabsManager.Tab("arms", ["arms"]),
        new TabsManager.Tab("legs", ["legs"]),
    ],
    { persistedWithKey: persistedTabKey },
);

await renderer.use((await compile(skinInfo)).src);

renderer.start();
