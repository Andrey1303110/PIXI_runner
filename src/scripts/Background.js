import * as PIXI from "pixi.js";
import { Globals } from "./Globals";

export class Background {
    constructor() {
        this.container = new PIXI.Container();
        this.createSprites();
    }

    createSprites() {
        this.sprites = [];

        for (let i = 0; i < 3; i++) {
            this.createSprite(i);
        }
    }

    createSprite(i) {
        const sprite = new PIXI.Sprite(Globals.resources['bg'].texture);
        sprite.x = sprite.width * i;
        sprite.y = 0;
        this.container.addChild(sprite);
        this.sprites.push(sprite);
    }
}