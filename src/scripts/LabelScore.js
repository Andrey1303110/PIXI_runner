import * as PIXI from "pixi.js";

export class LabelScore extends PIXI.Text {
    constructor() {
        super();
        this.x = document.body.clientWidth * .015;
        this.y = document.body.clientWidth * .015;
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