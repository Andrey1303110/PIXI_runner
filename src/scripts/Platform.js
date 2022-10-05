import * as PIXI from "pixi.js";
import { Globals } from "./Globals";



export class Platform {
    constructor(rows, cols, x) {
        this.rows = rows;
        this.cols = cols;

        this.width = cols * Globals.resources['tile'].texture.width;
        this.height = rows * Globals.resources['tile'].texture.height;

        this.createContainer(x);
        this.createTiles();
    }

    get left() {
        return this.container.x;
    }

    get right() {
        return this.left + this.width;
    }

    get top() {
        return this.container.y;
    }

    get bottom() {
        return this.container.y + this.height;
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