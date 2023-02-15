import { startUp } from "./routines/startUp";
import { SkinRenderer } from "./renderer/SkinRenderer";
import * as uuid from "uuid";

await startUp();

const { name } = await fetch("https://api.minetools.eu/uuid/b9516830c8bd4eb98058bd72eb5c3b87", { mode: "cors" })
    .then((res) => res.json())
    .catch(() => ({ name: "kelsny" }));

("https://namemc.com/profile/b9516830-c8bd-4eb9-8058-bd72eb5c3b87");

console.log(name);

const canvas = document.querySelector<HTMLCanvasElement>(".skin-model-preview")!;
const image = document.querySelector<HTMLImageElement>(".skin-flat-preview")!;

const renderer = new SkinRenderer(canvas, image);

document.querySelector(".skin-download-button")!.addEventListener("click", () => {
    const buffer = document.createElement("canvas");
    const ctx = buffer.getContext("2d")!;
    buffer.width = 64;
    buffer.height = 64;

    ctx.drawImage(renderer.texture!.image, 0, 0);

    const a = document.createElement("a");
    a.download = uuid.v4().replaceAll("-", "") + ".png";
    a.href = buffer.toDataURL();
    a.click();
});

await renderer.use("https://mineskin.eu/skin/hiwell");

renderer.start();

setTimeout(async () => {
    await renderer.use("https://mineskin.eu/skin/aanh");
}, 1000);
