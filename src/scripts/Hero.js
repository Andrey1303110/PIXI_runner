import * as PIXI from "pixi.js";
import { Globals } from "./Globals";

export class Hero {
    constructor(name) {
        this.createSpriteArr(name, 'run');

        this.dy = 0;
        this.platform = null;

        this.sprite = new PIXI.AnimatedSprite(this.spriteArr);
        //this.sprite.anchor.set(0.5);
        this.sprite.x = document.body.clientWidth/2;
        this.sprite.y = document.body.clientHeight/2;

        this.sprite.loop = true;
        this.sprite.animationSpeed = 1/7.5;
        this.sprite.play();
    }

    get left() {
        return this.sprite.x;
    }

    get right() {
        return this.left + this.sprite.width;
    }

    get top() {
        return this.sprite.y;
    }

    get bottom() {
        return this.sprite.y + this.sprite.height;
    }

    get nextBottom() {
        return this.bottom + this.dy;
    }

    createSpriteArr(name, action) {
        this.spriteArr = [];
        for (let i = 1; i <= Globals.spritesConfigs[name][action]; i++) {
            this.spriteArr.push(Globals.resources[`${name}_${action}_${i}`].texture);
        }
    }

    update() {
        if (!this.platform) {
            ++this.dy;
            this.sprite.y += this.dy;
        }
    }

    stayOnPlatform(platform) {
        this.platform = platform;

        this.dy = 0;
        this.sprite.y = platform.top - this.sprite.height;
    }
}