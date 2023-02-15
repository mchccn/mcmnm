import texturePositions from "./texturePositions";
import { texturedPrism } from "./texturedPrism";
import * as THREE from "three";

export function createPlayerModel(texture: THREE.Texture) {
    const headGroup = new THREE.Object3D();
    headGroup.name = "headGroup";
    headGroup.position.x = 0;
    headGroup.position.y = 28;
    headGroup.position.z = 0;
    headGroup.translateOnAxis(new THREE.Vector3(0, 1, 0), -4);
    const head = texturedPrism(8, 8, 8, texture, texturePositions, "head");
    head.translateOnAxis(new THREE.Vector3(0, 1, 0), 4);
    headGroup.add(head);
    const hat = texturedPrism(8.504, 8.504, 8.504, texture, texturePositions, "hat");
    hat.translateOnAxis(new THREE.Vector3(0, 1, 0), 4);
    headGroup.add(hat);

    const bodyGroup = new THREE.Object3D();
    bodyGroup.name = "bodyGroup";
    bodyGroup.position.x = 0;
    bodyGroup.position.y = 18;
    bodyGroup.position.z = 0;
    const body = texturedPrism(8, 12, 4, texture, texturePositions, "body");
    bodyGroup.add(body);
    const jacket = texturedPrism(8.504, 12.504, 4.504, texture, texturePositions, "jacket");
    bodyGroup.add(jacket);

    const leftArmGroup = new THREE.Object3D();
    leftArmGroup.name = "leftArmGroup";
    leftArmGroup.position.x = -5.5;
    leftArmGroup.position.y = 18;
    leftArmGroup.position.z = 0;
    leftArmGroup.translateOnAxis(new THREE.Vector3(0, 1, 0), 4);
    const leftArm = texturedPrism(3, 12, 4, texture, texturePositions, "leftArm");
    leftArm.translateOnAxis(new THREE.Vector3(0, 1, 0), -4);
    leftArmGroup.add(leftArm);
    const leftSleeve = texturedPrism(3.504, 12.504, 4.504, texture, texturePositions, "leftSleeve");
    leftSleeve.translateOnAxis(new THREE.Vector3(0, 1, 0), -4);
    leftArmGroup.add(leftSleeve);

    const rightArmGroup = new THREE.Object3D();
    rightArmGroup.name = "rightArmGroup";
    rightArmGroup.position.x = 5.5;
    rightArmGroup.position.y = 18;
    rightArmGroup.position.z = 0;
    rightArmGroup.translateOnAxis(new THREE.Vector3(0, 1, 0), 4);
    const rightArm = texturedPrism(3, 12, 4, texture, texturePositions, "rightArm");
    rightArm.translateOnAxis(new THREE.Vector3(0, 1, 0), -4);
    rightArmGroup.add(rightArm);
    const rightSleeve = texturedPrism(3.504, 12.504, 4.504, texture, texturePositions, "rightSleeve");
    rightSleeve.translateOnAxis(new THREE.Vector3(0, 1, 0), -4);
    rightArmGroup.add(rightSleeve);

    const leftLegGroup = new THREE.Object3D();
    leftLegGroup.name = "leftLegGroup";
    leftLegGroup.position.x = -2;
    leftLegGroup.position.y = 6;
    leftLegGroup.position.z = 0;
    leftLegGroup.translateOnAxis(new THREE.Vector3(0, 1, 0), 4);
    const leftLeg = texturedPrism(4, 12, 4, texture, texturePositions, "leftLeg");
    leftLeg.translateOnAxis(new THREE.Vector3(0, 1, 0), -4);
    leftLegGroup.add(leftLeg);
    const leftTrousers = texturedPrism(4.504, 12.504, 4.504, texture, texturePositions, "leftTrousers");
    leftTrousers.translateOnAxis(new THREE.Vector3(0, 1, 0), -4);
    leftLegGroup.add(leftTrousers);

    const rightLegGroup = new THREE.Object3D();
    rightLegGroup.name = "rightLegGroup";
    rightLegGroup.position.x = 2;
    rightLegGroup.position.y = 6;
    rightLegGroup.position.z = 0;
    rightLegGroup.translateOnAxis(new THREE.Vector3(0, 1, 0), 4);
    const rightLeg = texturedPrism(4, 12, 4, texture, texturePositions, "rightLeg");
    rightLeg.translateOnAxis(new THREE.Vector3(0, 1, 0), -4);
    rightLegGroup.add(rightLeg);
    const rightTrousers = texturedPrism(4.504, 12.504, 4.504, texture, texturePositions, "rightTrousers");
    rightTrousers.translateOnAxis(new THREE.Vector3(0, 1, 0), -4);
    rightLegGroup.add(rightTrousers);

    const playerGroup = new THREE.Object3D();

    playerGroup.add(headGroup);
    playerGroup.add(bodyGroup);
    playerGroup.add(leftArmGroup);
    playerGroup.add(rightArmGroup);
    playerGroup.add(leftLegGroup);
    playerGroup.add(rightLegGroup);

    return playerGroup;
}
