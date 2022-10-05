import * as PIXI from "pixi.js";
import { Globals } from "./Globals";

export class Diamond {
    constructor(x, y) {
        this.sprite = new PIXI.Sprite(Globals.resources['diamond'].texture);
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.anchor.x = -.5;
    }
}