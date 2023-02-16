import { startUp } from "./routines/startUp";
import { SkinRenderer } from "./renderer/SkinRenderer";
import { renderMadeBy } from "./routines/renderMadeBy";
import { hydrateDownloadButton } from "./routines/hydrateDownloadButton";
import { hydrateResetButton } from "./routines/hydrateResetButton";

const skinInfo = await startUp();

await renderMadeBy();

const canvas = document.querySelector<HTMLCanvasElement>(".skin-model-preview")!;
const image = document.querySelector<HTMLImageElement>(".skin-flat-preview")!;

const renderer = new SkinRenderer(canvas, image);

hydrateResetButton();
hydrateDownloadButton(renderer);

await renderer.use(`https://mineskin.eu/skin/${{ boy: "hiwell", girl: "aanh" }[skinInfo.gender]}`);

renderer.start();
