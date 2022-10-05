import * as PIXI from "pixi.js";
import { Platform } from "./Platform";

export class Platforms {
    constructor() {
        this.platforms = [];
        this.container = new PIXI.Container();

        this.ranges = {
            rows: {
                min: 2,
                max: 6,
            },
            cols: {
                min: 3,
                max: 9,
            },
            offset: {
                min: 60,
                max: 200,
            }
        };
        this.createPlatform(this.initRandomData);
    }

    get initRandomData() {
        return {
            rows: this.ranges.rows.min + Math.round(Math.random() * (this.ranges.rows.max - this.ranges.rows.min)),
            cols: this.ranges.cols.min + Math.round(Math.random() * (this.ranges.cols.max - this.ranges.cols.min)),
            x:    Math.round(Math.random() * this.ranges.offset.max),
        }
    }

    get randomData() {
        return {
            rows: this.ranges.rows.min + Math.round(Math.random() * (this.ranges.rows.max - this.ranges.rows.min)),
            cols: this.ranges.cols.min + Math.round(Math.random() * (this.ranges.cols.max - this.ranges.cols.min)),
            x:    this.current.right + this.ranges.offset.min + Math.round(Math.random() * (this.ranges.offset.max - this.ranges.offset.min)),
        }
    }

    createPlatform(data) {
        const platform = new Platform(data.rows, data.cols, data.x);
        this.container.addChild(platform.container);
        this.platforms.push(platform);
        this.current = platform;

        platform.container.once('hidden', () => {
            this.platforms = this.platforms.filter(item => item !== platform);
            platform.container.destroy();
        });
    }

    update(dt) {
        if (this.current.right < document.body.clientWidth) {
            this.createPlatform(this.randomData);
        }

        this.platforms.forEach(platform => {
            platform.move();
        })
    }
}