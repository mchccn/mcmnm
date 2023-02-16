import * as uuid from "uuid";
import type { SkinRenderer } from "../renderer/SkinRenderer";

export function hydrateDownloadButton(renderer: SkinRenderer<HTMLImageElement>) {
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
}
