import * as PIXI from "pixi.js";

export class LabelScore extends PIXI.Text {
    constructor(x = document.body.clientWidth * .015, y = document.body.clientWidth * .015, anchor = 0) {
        super();
        this.x = x;
        this.y = y;
        this.anchor.set(anchor);
        this.style = {
            fontFamily: "Verdana",
            fontWeight: "bold",
            fontSize: document.body.clientHeight * .06,
            fill: ["#FF7F50"]
        };
        this.renderScore();
    }

    renderScore(score = 0) {
        this.text = `Score: ${score}`;
    }
}