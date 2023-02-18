import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createPlayerModel } from "./createPlayerModel";

export class SkinRenderer<I extends HTMLImageElement | undefined = undefined> {
    readonly canvas: HTMLCanvasElement;
    readonly image: I;

    readonly camera: THREE.Camera;

    readonly renderer: THREE.WebGLRenderer;

    readonly controls: OrbitControls;

    readonly scene: THREE.Scene;

    #model?: THREE.Object3D;
    #texture?: THREE.Texture;

    #animId = -1;

    constructor(canvas: HTMLCanvasElement, image?: I) {
        this.canvas = canvas;
        this.image = image!;

        this.camera = new THREE.PerspectiveCamera(75, 3 / 4, 0.1, 100);

        this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, logarithmicDepthBuffer: true });

        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.enableDamping = false;
        this.controls.enablePan = false;
        this.controls.enableZoom = false;
        this.controls.target = new THREE.Vector3(0, 16, 0);

        this.renderer.setSize(300, 400);

        this.scene = new THREE.Scene();

        this.scene.background = new THREE.Color(0xfafafa);

        this.camera.position.x = 0;
        this.camera.position.y = 16;
        this.camera.position.z = 32;

        this.camera.lookAt(new THREE.Vector3(0, 16, 0));
    }

    async use(src: string) {
        if (this.#model) this.scene.remove(this.#model);
        if (this.#texture) this.#texture.dispose();

        if (this.image) this.image.src = src;

        this.#texture = await new Promise<THREE.Texture>((resolve) => new THREE.TextureLoader().load(src, resolve));

        this.#texture.magFilter = THREE.NearestFilter;
        this.#texture.minFilter = THREE.NearestFilter;
        this.#texture.anisotropy = 0;

        this.#model = createPlayerModel(this.#texture);

        this.scene.add(this.#model);
    }

    render() {
        this.#animId = requestAnimationFrame(this.render.bind(this));

        this.renderer.render(this.scene, this.camera);
    }

    start() {
        this.render();
    }

    stop() {
        cancelAnimationFrame(this.#animId);

        this.#animId = -1;
    }

    get model() {
        return this.#model;
    }

    get texture() {
        return this.#texture;
    }
}
