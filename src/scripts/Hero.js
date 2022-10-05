import * as PIXI from "pixi.js";
import { Globals } from "./Globals";

export class Hero {
    constructor(name) {
        this.name = name;

        this.dy = 0;
        this.jumpIndex = 0;
        this.platform = null;
        this.score = 0;

        this.sprite = new PIXI.AnimatedSprite(this.getSprites(this.name, 'run'));
        this.sprite.x = document.body.clientWidth * .1;
        this.sprite.y = 0;

        this.sprite.loop = true;
        this.sprite.animationSpeed = 1 / 7.5;
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
        return this.top + this.sprite.height;
    }

    get nextbottom() {
        return this.bottom + this.dy * 1.3;
    }

    getSprites(name, action) {
        let spritesArr = [];
        for (let i = 1; i <= Globals.spritesConfigs[name][action]; i++) {
            spritesArr.push(Globals.resources[`${name}_${action}_${i}`].texture);
        }
        return spritesArr;
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
        this.jumpIndex = 0;
        this.sprite.y = platform.top - this.sprite.height;
    }

    moveByPlatform(platform) {
        this.sprite.x = platform.nextleft - this.sprite.width;
    }

    startJump() {
        if (this.platform || this.jumpIndex === 1) {
            ++this.jumpIndex;
            this.platform = null;
            this.dy = -this.sprite.height/10;
        }
    }

    collectDiamond() {
        ++this.score;
        this.sprite.emit('score');
    }
}