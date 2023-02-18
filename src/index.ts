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
import { debounce } from "./utils/debounce";

renderMadeBy({ timeout: 250 });

const skin = new SkinInfoManager(await startUp());

const canvas = document.querySelector<HTMLCanvasElement>(".skin-model-preview")!;
const image = document.querySelector<HTMLImageElement>(".skin-flat-preview")!;

const renderer = new SkinRenderer(canvas, image);

hydrateResetButton();
hydrateDownloadButton(renderer);

//

const skinColor = document.createElement("label");
skinColor.htmlFor = "skinColor";
skinColor.textContent = "skin color";

const skinColorInput = document.createElement("input");
skinColorInput.name = "skinColor";
skinColorInput.type = "color";
skinColorInput.value = skin.getMetadata("skin-color");

skinColorInput.addEventListener(
    "input",
    debounce(() => {
        skin.setMetadata("skin-color", skinColorInput.value);
    }, 100),
);

skinColor.appendChild(skinColorInput);

//

new TabsManager(
    document.querySelector<HTMLElement>(".core-app-container")!,
    [
        new TabsManager.Tab("head", [createSkinHighlightComponent(skin)]),
        new TabsManager.Tab("body", [skinColor]),
        new TabsManager.Tab("arms", ["arms"]),
        new TabsManager.Tab("legs", ["legs"]),
    ],
    { persistedWithKey: persistedTabKey },
);

const rerender = async () => renderer.use((await compile(skin.getCopy())).src);

rerender();

skin.onChange(rerender);

renderer.start();
