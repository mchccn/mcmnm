import { startUp } from "./routines/startUp";
import { SkinRenderer } from "./renderer/SkinRenderer";
import * as uuid from "uuid";

await startUp();

const renderer = new SkinRenderer(
    document.querySelector<HTMLCanvasElement>(".skin-model-preview")!,
    document.querySelector<HTMLImageElement>(".skin-flat-preview")!,
);

document.querySelector(".skin-download-button")!.addEventListener("click", () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    canvas.width = 64;
    canvas.height = 64;

    ctx.drawImage(renderer.texture!.image, 0, 0);

    const a = document.createElement("a");
    a.download = uuid.v4().replaceAll("-", "") + ".png";
    a.href = canvas.toDataURL();
    a.click();
});

await renderer.use("https://mineskin.eu/skin/hiwell");

renderer.start();

setTimeout(async () => {
    await renderer.use("https://mineskin.eu/skin/aanh");
}, 1000);
