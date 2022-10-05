import { Globals } from "./Globals";

export let LoaderConfig = {
    music:    require("../sounds/music.mp3"),
    click:    require("../sounds/click.mp3"),
    bg:       require("../sprites/background.png"),
    diamond:  require("../sprites/diamond.png"),
    hero:     require("../sprites/hero.png"),
    jump:     require("../sprites/jump.png"),
    walk1:    require("../sprites/walk1.png"),
    walk2:    require("../sprites/walk2.png"),
    platform: require("../sprites/platform.png"),
    tile:     require("../sprites/tile.png"),
};

Object.keys(Globals.spritesConfigs).forEach(name => {
    Object.keys(Globals.spritesConfigs[name]).forEach(action => {
        for (let i = 1; i <= Globals.spritesConfigs[name][action]; i++) {
            LoaderConfig[`${name}_${action}_${i}`] = require(`../sprites/${name}/${action}/${i}.png`);
        }
    });
});
