import * as THREE from "three";
import { createArmsAccessoriesComponent, createArmsSettingsComponent, createHeadSettingsComponent, createLegsAccessoriesComponent, createLegsSettingsComponent, } from "./components";
import { createBodySettingsComponent } from "./components/body/bodySettings";
import { compile } from "./compositor/compile";
import { SkinInfoManager, StorageManager, TabsManager, persistedSkinKey, persistedTabKey } from "./managers";
import { SkinRenderer } from "./renderer/SkinRenderer";
import { hydrateDownloadButton, hydrateResetButton, renderMadeBy, startUp } from "./routines";
import { loadPreprocessors } from "./routines/loadPreprocessors";
import { html } from "./utils/html";

renderMadeBy({ timeout: 500 });

const skin = new SkinInfoManager(await startUp());

const canvas = document.querySelector<HTMLCanvasElement>(".skin-model-preview")!;
const image = document.querySelector<HTMLImageElement>(".skin-flat-preview")!;

const renderer = new SkinRenderer({
    width: 300,
    height: 400,
    canvas,
    image,
    configure() {
        this.controls.enablePan = false;
        this.controls.minDistance = 8;
        this.controls.maxDistance = 128;
        this.controls.target.y = 16;

        this.camera.position.x = 0;
        this.camera.position.y = 16;
        this.camera.position.z = 32;

        this.camera.lookAt(new THREE.Vector3(0, 16, 0));
    },
});

hydrateResetButton();
hydrateDownloadButton(renderer);

await loadPreprocessors();

new TabsManager(
    document.querySelector<HTMLElement>(".core-app-container")!,
    [
        new TabsManager.Tab("head", [html`<h1>settings</h1>`, createHeadSettingsComponent(skin)]),
        new TabsManager.Tab("body", [html`<h1>settings</h1>`, createBodySettingsComponent(skin)]),
        new TabsManager.Tab("arms", [
            html`<h1>settings</h1>`,
            createArmsSettingsComponent(skin),
            html`<h1>accessories</h1>`,
            createArmsAccessoriesComponent(skin),
        ]),
        new TabsManager.Tab("legs", [
            html`<h1>settings</h1>`,
            createLegsSettingsComponent(skin),
            html`<h1>accessories</h1>`,
            createLegsAccessoriesComponent(skin),
        ]),
    ],
    { persistedWithKey: persistedTabKey },
);

renderer.start();

skin.onChange(
    await (async function update() {
        const compiled = await compile(skin.getCopy());

        await renderer.use(compiled.src);

        return update;
    })(),
);

skin.onChange((info) => {
    StorageManager.set(persistedSkinKey, info);
});
