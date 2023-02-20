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

    #WEBGL_lose_context: WEBGL_lose_context | null;

    constructor({
        width,
        height,
        canvas,
        configure,
        backgroundColor,
        image,
    }: {
        width: number;
        height: number;
        canvas: HTMLCanvasElement;
        configure?: (this: SkinRenderer<I>) => void;
        backgroundColor?: THREE.ColorRepresentation;
        image?: I;
    }) {
        this.canvas = canvas;
        this.image = image!;

        this.camera = new THREE.PerspectiveCamera(75, 3 / 4, 0.1, 128 + 32);

        this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, logarithmicDepthBuffer: true });

        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.controls = new OrbitControls(this.camera, this.canvas);

        this.renderer.setSize(width, height);

        this.scene = new THREE.Scene();

        this.scene.background = new THREE.Color(backgroundColor ?? 0xfafafa);

        configure?.call(this);

        this.#WEBGL_lose_context = this.renderer.getContext().getExtension("WEBGL_lose_context");
    }

    async use(src: string) {
        this.#texture = await new Promise<THREE.Texture>((resolve) => new THREE.TextureLoader().load(src, resolve));

        this.#texture.magFilter = THREE.NearestFilter;
        this.#texture.minFilter = THREE.NearestFilter;
        this.#texture.anisotropy = 0;

        if (this.#model) this.scene.remove(this.#model);
        if (this.#texture) this.#texture.dispose();

        if (this.image) this.image.src = src;

        this.#model = createPlayerModel(this.#texture);

        this.scene.add(this.#model);
    }

    render() {
        this.renderer.render(this.scene, this.camera);

        this.controls.update();
    }

    start() {
        this.render();

        this.#animId = requestAnimationFrame(this.start.bind(this));
    }

    stop() {
        cancelAnimationFrame(this.#animId);

        this.#animId = -1;
    }

    loseContext() {
        this.#WEBGL_lose_context?.loseContext();
    }

    restoreContext() {
        this.#WEBGL_lose_context?.restoreContext();
    }

    getImageData() {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        canvas.width = this.renderer.domElement.width;
        canvas.height = this.renderer.domElement.height;

        ctx.drawImage(this.renderer.domElement, 0, 0);

        return ctx.getImageData(0, 0, canvas.width, canvas.height);
    }

    get model() {
        return this.#model;
    }

    get texture() {
        return this.#texture;
    }
}
