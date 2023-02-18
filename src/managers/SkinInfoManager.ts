import type { SkinInfo } from "../types";
import { StorageManager, persistedProgressKey } from "./StorageManager";

export class SkinInfoManager {
    #skin;
    #onChanges = new Set<(skin: SkinInfo) => void>();

    constructor(skin: SkinInfo) {
        this.#skin = skin;
    }

    onChange(handler: (skin: SkinInfo) => void) {
        this.#onChanges.add(handler);

        return this;
    }

    offChange(handler: (skin: SkinInfo) => void) {
        return this.#onChanges.delete(handler);
    }

    get<K extends Exclude<keyof SkinInfo, "meta">>(key: K): SkinInfo[K] {
        return this.#skin[key];
    }

    getMetadata<T>(key: string) {
        return this.#skin.meta[key] as T;
    }

    set<K extends Exclude<keyof SkinInfo, "meta">>(key: K, value: SkinInfo[K]) {
        this.#skin[key] = value;

        StorageManager.set(persistedProgressKey, this.#skin);

        this.#dispatchOnChange();
    }

    setMetadata<T>(key: string, value: T) {
        this.#skin.meta[key] = value;

        StorageManager.set(persistedProgressKey, this.#skin);

        this.#dispatchOnChange();
    }

    getCopy() {
        return JSON.parse(JSON.stringify(this.#skin)) as SkinInfo;
    }

    #dispatchOnChange() {
        this.#onChanges.forEach((handler) => handler.call(undefined, this.getCopy()));
    }
}
