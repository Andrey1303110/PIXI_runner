import * as PIXI from "pixi.js";
import { MainScene } from "./MainScene";
import { Background } from "./Background";
import { Globals } from "./Globals";
import { LabelScore } from "./LabelScore";

export class FinalScene {
    constructor(score) {
        this.container = new PIXI.Container();
        this.score = score;
        this.init();
    }

    init() {
        this.createBackground();
        this.createPopup();
        this.createLabelScore();
        this.createText();
        this.addHandler();
    }

    createBackground() {
        if (this.bg) {
            return;
        }

        this.bg = new Background();
        this.container.addChild(this.bg.container);
    }

    createPopup() {
        const width = document.body.clientWidth * .4;
        const height = document.body.clientWidth * .25;
        const x = document.body.clientWidth/2 - width/2;
        const y = document.body.clientHeight/2 - height/2;
        this.popup = new PIXI.Graphics();
        this.popup.beginFill(0x000000, 0.5);
        this.popup.drawRect(x, y, width, height);
        this.container.addChild(this.popup);
    }

    createLabelScore() {
        this.labelScore = new LabelScore(document.body.clientWidth/2, document.body.clientHeight/2 - document.body.clientWidth * .05, 0.5);
        this.labelScore.renderScore(this.score);
        this.container.addChild(this.labelScore);
    }

    createText() {
        const text = new PIXI.Text();
        text.anchor.set(.5);
        text.x = document.body.clientWidth/2;
        text.y = document.body.clientHeight/2 + document.body.clientWidth * .05;
        text.style = {
            fontFamily: "Verdana",
            fontWeight: "normal",
            fontSize: document.body.clientWidth * .02,
            fill: ["#FFFFFF"]
        };
        text.text = "Tap to restart";
        this.container.addChild(text);
    }

    addHandler() {
        this.container.interactive = true;
        this.container.once('pointerdown', () => {
            Globals.scene.start(new MainScene());
        });
    }
}