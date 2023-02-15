import type { TexturePositions, FaceTexturePositions } from "../types";
import type { BufferAttribute } from "three";
import * as THREE from "three";

export function texturedPrism(
    width: number,
    height: number,
    depth: number,
    texture: THREE.Texture,
    texturePositions: TexturePositions,
    textureName: keyof TexturePositions,
) {
    const geometry = new THREE.BoxGeometry(width, height, depth);

    geometry.computeBoundingBox();

    const textureWidth = texture.image.width;
    const textureHeight = texture.image.height;

    const uvAttr = geometry.getAttribute("uv") as BufferAttribute;
    const uvArray = uvAttr.array as number[];

    const prismTexturePositions = texturePositions[textureName];

    (["right", "left", "top", "bottom", "front", "back"] as const).forEach((faceName, index) => {
        const face = prismTexturePositions[faceName] as FaceTexturePositions[keyof FaceTexturePositions];

        const tx1 = ("sx" in face ? face.sx : face.x) / textureWidth;
        const ty1 = face.y / textureHeight;
        const tx2 = (("sx" in face ? face.sx : face.x) + ("sw" in face ? face.sw : face.w)) / textureWidth;
        const ty2 = (face.y + face.h) / textureHeight;

        const vectors = [
            new THREE.Vector2(tx1, ty2),
            new THREE.Vector2(tx1, ty1),
            new THREE.Vector2(tx2, ty2),
            new THREE.Vector2(tx2, ty1),
        ];

        if ("flipX" in face) {
            const copy = [...vectors];

            vectors[0] = copy[3];
            vectors[1] = copy[2];
            vectors[2] = copy[1];
            vectors[3] = copy[0];
        }

        if ("flipY" in face) {
            const copy = [...vectors];

            vectors[0] = copy[2];
            vectors[1] = copy[3];
            vectors[2] = copy[0];
            vectors[3] = copy[1];
        }

        uvArray[index * 8 + 0] = vectors[2].x;
        uvArray[index * 8 + 1] = vectors[2].y;

        uvArray[index * 8 + 2] = vectors[0].x;
        uvArray[index * 8 + 3] = vectors[0].y;

        uvArray[index * 8 + 4] = vectors[3].x;
        uvArray[index * 8 + 5] = vectors[3].y;

        uvArray[index * 8 + 6] = vectors[1].x;
        uvArray[index * 8 + 7] = vectors[1].y;
    });

    uvAttr.needsUpdate = true;

    geometry.setAttribute("uv", uvAttr);

    const material = new THREE.MeshBasicMaterial({
        map: texture,
        alphaTest: 0.1,
        transparent: true,
        side: THREE.DoubleSide,
    });

    const cube = new THREE.Mesh(geometry, material);

    cube.name = textureName;

    return cube;
}
