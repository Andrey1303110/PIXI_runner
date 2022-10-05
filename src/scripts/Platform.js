import * as PIXI from "pixi.js";
import { Globals } from "./Globals";
import { Diamond } from "./Diamond";

export class Platform {
    constructor(rows, cols, x) {
        this.rows = rows;
        this.cols = cols;

        this.width = cols * Globals.resources['tile'].texture.width;
        this.height = rows * Globals.resources['tile'].texture.height;

        this.dx = -7;

        this.diamonds = [];

        this.createContainer(x);
        this.createTiles();
        this.createDiamonds();
    }

    get left() {
        return this.container.x;
    }

    get nextleft() {
        return this.left + this.dx;
    }

    get right() {
        return this.left + this.width;
    }

    get top() {
        return this.container.y;
    }

    get bottom() {
        return this.top + this.height;
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

    createDiamonds() {
        const y = Globals.diamondsConfigs.offset.min + Math.random() * (Globals.diamondsConfigs.offset.max - Globals.diamondsConfigs.offset.min);

        for (let i = 0; i < this.cols; i++) {
            if (Math.random() <= .75) {
                const diamond = new Diamond(Globals.resources['tile'].texture.height * i, -y);
                this.container.addChild(diamond.sprite);
                this.diamonds.push(diamond);
            }
        }
    }

    move() {
        this.container.x += Globals.configs.speed * this.dx;

        if (this.right < 0) {
            this.container.emit('hidden');
        }
    }

    checkCollision(object) {
        this.diamonds.forEach(diamond => {
            diamond.checkCollision(object)
        });

        if (this.isCollideTop(object)) {
            object.stayOnPlatform(this);
        } else {
            if (object.platform === this) {
                object.platform = null;
            }

            if (this.isCollideLeft(object)) {
                object.moveByPlatform(this);
            }
        }
    }

    isCollideTop(object) {
        return (object.right >= this.left &&
            object.left <= this.right &&
            object.bottom <= this.top &&
            object.nextbottom >= this.top);
    }

    isCollideLeft(object) {
        return (object.bottom >= this.top &&
            object.top <= this.bottom &&
            object.right <= this.left &&
            object.right >= this.nextleft);
    }
}