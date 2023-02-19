import { developerUuid } from "../constants";

export async function renderMadeBy(options?: { timeout?: number }) {
    const madeBy = document.querySelector<HTMLAnchorElement>(".made-by-anchor")!;

    madeBy.textContent = "kelsny";
    madeBy.href = "https://github.com/kelsny";

    const { name } = await fetch(`https://api.minetools.eu/uuid/${developerUuid}`, {
        mode: "cors",
        signal: options?.timeout ? AbortSignal.timeout(options.timeout) : undefined,
    })
        .then((res) => res.json())
        .catch(() => ({ name: undefined }));


    if (name) {
        madeBy.textContent = name;
        madeBy.href = `https://namemc.com/profile/${developerUuid}`;
    }
}
