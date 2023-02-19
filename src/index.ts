import { createSkinColorComponent, createSkinHighlightComponent } from "./components";
import { createSkinBlushComponent } from "./components/skinBlush";
import { compile } from "./compositor/compile";
import { SkinInfoManager, TabsManager, persistedTabKey } from "./managers";
import { SkinRenderer } from "./renderer/SkinRenderer";
import { hydrateDownloadButton, hydrateResetButton, renderMadeBy, startUp } from "./routines";

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
        new TabsManager.Tab("head", [createSkinHighlightComponent(skin), createSkinBlushComponent(skin)]),
        new TabsManager.Tab("body", [createSkinColorComponent(skin)]),
        new TabsManager.Tab("arms", ["arms"]),
        new TabsManager.Tab("legs", ["legs"]),
    ],
    { persistedWithKey: persistedTabKey },
);

const rerender = () => (compile(skin.getCopy()).then((image) => renderer.use(image.src)), rerender);

skin.onChange(rerender());

renderer.start();
