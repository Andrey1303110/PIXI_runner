import * as PIXI from "pixi.js";
import { Background } from "./Background";

export class FinalScene {
    constructor() {
        this.container = new PIXI.Container();

        this.createBackground();
    }

    createBackground() {
        if (this.bg) {
            return;
        }

        this.bg = new Background();
        this.container.addChild(this.bg.container);
    }
}