import { createSkinColorComponent } from "./components/skinColor";
import { createSkinHighlightComponent } from "./components/skinHighlight";
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

const skin = new SkinInfoManager(await startUp());

const canvas = document.querySelector<HTMLCanvasElement>(".skin-model-preview")!;
const image = document.querySelector<HTMLImageElement>(".skin-flat-preview")!;

const renderer = new SkinRenderer(canvas, image);

hydrateResetButton();
hydrateDownloadButton(renderer);

new TabsManager(
    document.querySelector<HTMLElement>(".core-app-container")!,
    [
        new TabsManager.Tab("head", [createSkinHighlightComponent(skin)]),
        new TabsManager.Tab("body", [createSkinColorComponent(skin)]),
        new TabsManager.Tab("arms", ["arms"]),
        new TabsManager.Tab("legs", ["legs"]),
    ],
    { persistedWithKey: persistedTabKey },
);

const rerender = async () => renderer.use((await compile(skin.getCopy())).src);

rerender();

skin.onChange(rerender);

renderer.start();
