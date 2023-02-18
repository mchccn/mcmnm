import { developerUuid } from "../constants";

export async function renderMadeBy(options?: { timeout?: number }) {
    const { name, timeout } = await fetch(`https://api.minetools.eu/uuid/${developerUuid}`, {
        mode: "cors",
        signal: options?.timeout ? AbortSignal.timeout(options.timeout) : undefined,
    })
        .then((res) => res.json())
        .catch(() => ({ name: "kelsny", timeout: true }));

    const madeBy = document.querySelector<HTMLAnchorElement>(".made-by-anchor")!;

    madeBy.textContent = name;
    madeBy.href = timeout ? `https://github.com/kelsny` : `https://namemc.com/profile/${developerUuid}`;
}
