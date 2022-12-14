import * as PIXI from "pixi.js";
import TWEEN from "@tweenjs/tween.js";
import { Globals } from "./Globals";
import {Howl, Howler} from 'howler';
import { Background } from "./Background";
import { Platforms } from "./Platforms";
import { Hero } from "./Hero";
import { LabelScore } from "./LabelScore";
import { FinalScene } from "./FinalScene";

export class MainScene {
    constructor() {
        this.container = new PIXI.Container();

        this.init();
    }

    init() {
        this.addSounds();
        this.createBackground();
        this.cretePlatforms();
        this.createHero();
        this.createUI();
    }

    update(dt) {
        this.bg.update(dt);
        this.platforms.checkCollision(this.hero);
        this.platforms.update(dt);
        this.hero.update(dt);
    }

    createBackground() {
        if (this.bg) {
            return;
        }

        this.bg = new Background();
        this.container.addChild(this.bg.container);
    }

    cretePlatforms() {
        this.platforms = new Platforms();
        this.container.addChild(this.platforms.container);
    }

    createHero() {
        this.hero = new Hero('soldier');
        this.container.addChild(this.hero.sprite);
        this.container.interactive = true;
        this.container.on('pointerdown', () => {
            this.hero.startJump();
        });
        this.hero.sprite.once('die', () => {
            Globals.scene.start(new FinalScene(this.hero.score));
        })
    }

    createUI() {
        this.labelScore = new LabelScore();
        this.container.addChild(this.labelScore);
        this.hero.sprite.on('score', () => {
            this.labelScore.renderScore(this.hero.score);
        });
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
            Globals.resources.sounds.music.play();
        });
        */
    }
}