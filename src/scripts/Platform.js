import * as PIXI from "pixi.js";
import { Globals } from "./Globals";

export class Platform {
    constructor(rows, cols, x) {
        this.rows = rows;
        this.cols = cols;

        this.createContainer(x);
        this.createTiles();

        console.log(Globals.resources['tile'].texture.height);
    }

    createContainer(x) {
        this.container = new PIXI.Container();
        this.container.x = x;
        this.container.y = document.body.clientHeight - this.rows * Globals.resources['tile'].texture.height;
    }

    createTiles() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.createTile(row, col);
            }
        }
    }

    createTile(row, col) {
        const texture = row === 0 ? 'platform' : 'tile';
        const tile = new PIXI.Sprite(Globals.resources[texture].texture);
        tile.x = col * tile.width;
        tile.y = row * tile.height;

        this.container.addChild(tile);
    }
}