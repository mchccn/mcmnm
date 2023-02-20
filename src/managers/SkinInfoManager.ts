import type { SkinInfo } from "../types";
import { StorageManager, persistedSkinKey } from "./StorageManager";

export class SkinInfoManager {
    #skin;
    #onChanges = new Set<(skin: SkinInfo) => void>();
    #onSpecificChanges = new Map<Exclude<keyof SkinInfo, "meta">, Set<(skin: SkinInfo) => void>>();
    #onMetaChanges = new Map<string, Set<(skin: SkinInfo) => void>>();

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

    onSpecificChange(key: Exclude<keyof SkinInfo, "meta">, handler: (skin: SkinInfo) => void) {
        const set = this.#onSpecificChanges.get(key);

        this.#onSpecificChanges.set(key, new Set([...(set ?? []), handler]));

        return this;
    }

    offSpecificChange(key: Exclude<keyof SkinInfo, "meta">, handler: (skin: SkinInfo) => void) {
        return !!this.#onSpecificChanges.get(key)?.delete(handler);
    }

    onMetaChange(key: string, handler: (skin: SkinInfo) => void) {
        const set = this.#onMetaChanges.get(key);

        this.#onMetaChanges.set(key, new Set([...(set ?? []), handler]));

        return this;
    }

    offMetaChange(key: string, handler: (skin: SkinInfo) => void) {
        return !!this.#onMetaChanges.get(key)?.delete(handler);
    }

    get<K extends Exclude<keyof SkinInfo, "meta">>(key: K): SkinInfo[K] {
        return this.#skin[key];
    }

    getMetadata<T>(key: string) {
        return this.#skin.meta[key] as T;
    }

    set<K extends Exclude<keyof SkinInfo, "meta">>(key: K, value: SkinInfo[K]) {
        this.#skin[key] = value;

        StorageManager.set(persistedSkinKey, this.#skin);

        this.#dispatchOnChange();
        this.#dispatchOnSpecificChange(key);
    }

    setMetadata<T>(key: string, value: T) {
        this.#skin.meta[key] = value;

        StorageManager.set(persistedSkinKey, this.#skin);

        this.#dispatchOnChange();
        this.#dispatchOnMetaChange(key);
    }

    hasMetadata(key: string) {
        return key in this.#skin.meta;
    }

    deleteMetadata<T>(key: string) {
        if (!(key in this.#skin.meta)) return false;

        delete this.#skin.meta[key];

        this.#dispatchOnChange();
        this.#dispatchOnMetaChange(key);

        return true;
    }

    getCopy() {
        return JSON.parse(JSON.stringify(this.#skin)) as SkinInfo;
    }

    #dispatchOnChange() {
        this.#onChanges.forEach((handler) => handler.call(undefined, this.getCopy()));
    }

    #dispatchOnSpecificChange(key: Exclude<keyof SkinInfo, "meta">) {
        this.#onSpecificChanges.get(key)?.forEach((handler) => handler.call(undefined, this.getCopy()));
    }

    #dispatchOnMetaChange(key: string) {
        this.#onMetaChanges.get(key)?.forEach((handler) => handler.call(undefined, this.getCopy()));
    }
}
