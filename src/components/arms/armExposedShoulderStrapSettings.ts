import { calculateExposedShoulderStrap } from "../../functions";
import type { SkinInfoManager } from "../../managers";
import { debounce, wrapTextInSpan } from "../../utils";

export function createArmExposedShoulderStrapSettings(skin: SkinInfoManager) {
    const group = document.createElement("div");
    group.classList.add("input-group");

    const label = document.createElement("label");
    label.htmlFor = "exposedShoulderStrapSettings";

    label.append(wrapTextInSpan("exposed shoulder strap"));

    const input = document.createElement("select");
    input.name = "exposedShoulderStrapSettings";

    input.append(
        ...["none", "auto", "custom"].map((text) => {
            const option = document.createElement("option");

            option.textContent = text;
            option.value = text;

            return option;
        }),
    );

    const initial = skin.getMetadata("exposed-shoulder-strap");

    if (!skin.hasMetadata("exposed-shoulder-strap"))
        throw new ReferenceError("skin meta key 'exposed-shoulder-strap' is not present");

    input.value = initial === true ? "auto" : "custom";

    input.addEventListener("change", () => {
        if (input.value === "none") {
            const accessories = skin.get("armsAccessories");

            accessories.splice(accessories.indexOf("exposed-shoulder-strap"), 1);

            skin.set("armsAccessories", accessories);

            return skin.deleteMetadata("exposed-shoulder-strap");
        }

        customSkinColor.style.display = input.value === "custom" ? "" : "none";
        customStrapColor.style.display = input.value === "custom" ? "" : "none";

        if (input.value === "auto") {
            return skin.setMetadata("exposed-shoulder-strap", true);
        }

        const values = calculateExposedShoulderStrap(skin.getCopy());

        customSkinColor.value = values.skinColor;
        customStrapColor.value = values.strapColor;

        return skin.setMetadata("exposed-shoulder-strap", values);
    });

    label.append(input);

    const customSkinColor = document.createElement("input");
    customSkinColor.name = "exposedShoulderStrapSettingsSkinColor";
    customSkinColor.type = "color";
    customSkinColor.value = skin.getMetadata<{ skinColor: string }>("exposed-shoulder-strap")?.skinColor ?? "#E0E0E0";

    customSkinColor.style.display = skin.getMetadata("exposed-shoulder-strap") !== true ? "" : "none";

    customSkinColor.addEventListener(
        "input",
        debounce(() => {
            skin.setMetadata("exposed-shoulder-strap", {
                ...skin.getMetadata("exposed-shoulder-strap")!,
                skinColor: customSkinColor.value,
            });
        }, 100),
    );

    const customStrapColor = document.createElement("input");
    customStrapColor.name = "exposedShoulderStrapSettingsStrapColor";
    customStrapColor.type = "color";
    customStrapColor.value =
        skin.getMetadata<{ strapColor: string }>("exposed-shoulder-strap")?.strapColor ?? "#C7C7C7";

    customStrapColor.style.display = skin.getMetadata("exposed-shoulder-strap") !== true ? "" : "none";

    customStrapColor.addEventListener(
        "input",
        debounce(() => {
            skin.setMetadata("exposed-shoulder-strap", {
                ...skin.getMetadata("exposed-shoulder-strap")!,
                strapColor: customStrapColor.value,
            });
        }, 100),
    );

    group.append(label);
    group.append(customSkinColor);
    group.append(customStrapColor);

    return group;
}
