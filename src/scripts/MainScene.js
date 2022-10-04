import * as PIXI from "pixi.js";
import TWEEN from "@tweenjs/tween.js";
import { Globals } from "./Globals";
import {Howl, Howler} from 'howler';
import { Background } from "./Background";
import { Platforms } from "./Platforms";

export class MainScene {
    constructor() {
        this.container = new PIXI.Container();

        this.init();
    }

    init() {
        this.addSounds();
        this.createBackground();
        this.cretePlatforms();
    }

    update(dt) {
        this.bg.update(dt);
    }

    createBackground() {
        if (this.bg) {
            return;
        }

        this.bg = new Background();

        /*
        this.bg = new PIXI.Sprite(Globals.resources["bg"].texture);

        this.bg.width = Math.max(window.innerWidth, window.innerHeight);
        this.bg.height = Math.max(window.innerWidth, window.innerHeight);

        this.bg.x = document.body.clientWidth / 2;
        this.bg.y = document.body.clientHeight / 2;

        this.bg.anchor.set(0.5);
        */
        this.container.addChild(this.bg.container);
    }

    cretePlatforms() {
        this.platforms = new Platforms();
        this.container.addChild(this.platforms.container);
    }

    addSounds() {
        if (Globals.resources.sounds) {
            return;
        }

        Globals.resources.sounds = {
            click: new Howl({
                src: Globals.resources.click.url,
            }),
            music: new Howl({
                src: Globals.resources.music.url,
                autoplay: true,
                loop: true,
                volume: 0,
            }),
        };

        /*
        Globals.resources.sounds.music.on('load', function(){
            Globals.resources.sounds.theme.play();
        });
        */
    }
}