import { preprocessors } from "../compositor";
import { partsList } from "../parts";

export async function loadPreprocessors() {
    const modules = await Promise.allSettled(
        partsList.map(async (layer) => [layer, await import(`../compositor/preprocessors/${layer}.ts`)] as const),
    );

    for (const module of modules) {
        if (module.status === "fulfilled") {
            preprocessors.set(module.value[0], module.value[1].default);
        }
    }
}
