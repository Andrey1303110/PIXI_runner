import * as PIXI from "pixi.js";
import { Globals } from "./Globals";

export class Hero {
    constructor(name) {
        this.createSpriteArr(name, 'run');

        this.sprite = new PIXI.AnimatedSprite(this.spriteArr);

        this.sprite.anchor.set(0.5);

        this.sprite.x = document.body.clientWidth/2;
        this.sprite.y = document.body.clientHeight/2;

        this.sprite.loop = true;
        this.sprite.animationSpeed = 1/10;
        this.sprite.play();
    }

    createSpriteArr(name, action) {
        this.spriteArr = [];
        for (let i = 1; i <= Globals.spritesConfigs[name][action]; i++) {
            this.spriteArr.push(Globals.resources[`${name}_${action}_${i}`].texture);
        }
    }
}