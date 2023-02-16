import { persistedTabKey } from "./managers/StorageManager";
import { TabsManager } from "./managers/TabsManager";
import { SkinRenderer } from "./renderer/SkinRenderer";
import { hydrateDownloadButton } from "./routines/hydrateDownloadButton";
import { hydrateResetButton } from "./routines/hydrateResetButton";
import { renderMadeBy } from "./routines/renderMadeBy";
import { startUp } from "./routines/startUp";

const skinInfo = await startUp();

await renderMadeBy();

const canvas = document.querySelector<HTMLCanvasElement>(".skin-model-preview")!;
const image = document.querySelector<HTMLImageElement>(".skin-flat-preview")!;

const renderer = new SkinRenderer(canvas, image);

hydrateResetButton();
hydrateDownloadButton(renderer);

new TabsManager(document.querySelector<HTMLElement>(".core-app-container")!, [
    new TabsManager.Tab("head", ["head"]),
    new TabsManager.Tab("body", ["body"]),
    new TabsManager.Tab("arms", ["arms"]),
    new TabsManager.Tab("legs", ["legs"]),
], { persistedWithKey: persistedTabKey });

await renderer.use(`https://mineskin.eu/skin/${{ boy: "hiwell", girl: "aanh" }[skinInfo.gender]}`);

renderer.start();
