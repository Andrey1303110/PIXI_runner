import * as PIXI from "pixi.js";

export class SceneManager {
    constructor() {
        this.container = new PIXI.Container();
        this.scene = null;
    }

    start(scene) {
        if (this.scene) {
            this.scene.container.destroy();
        }

        this.scene = scene;
        this.container.addChild(this.scene.container);
    }

    update(dt) {
        if (this.scene && this.scene.update) {
            this.scene.update(dt);
        }
    }
}