import { developerUuid } from "../constants";

export async function renderMadeBy() {
    const { name } = await fetch(`https://api.minetools.eu/uuid/${developerUuid}`, { mode: "cors" })
        .then((res) => res.json())
        .catch(() => ({ name: "kelsny" }));

    const madeBy = document.querySelector<HTMLAnchorElement>(".made-by-anchor")!;

    madeBy.textContent = name;
    madeBy.href = `https://namemc.com/profile/${developerUuid}`;
}
