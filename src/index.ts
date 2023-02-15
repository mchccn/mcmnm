import { startUp } from "./routines/startUp";
import { SkinRenderer } from "./renderer/SkinRenderer";

await startUp();

const renderer = new SkinRenderer(
    document.querySelector<HTMLCanvasElement>(".skin-model-preview")!,
    document.querySelector<HTMLImageElement>(".skin-flat-preview")!,
);

await renderer.use("https://mineskin.eu/skin/hiwell");

renderer.start();

document.querySelector(".skin-download-button")!.addEventListener("click", () => {
    renderer
});

setTimeout(async () => {
    await renderer.use("https://mineskin.eu/skin/aanh");
}, 1000);
