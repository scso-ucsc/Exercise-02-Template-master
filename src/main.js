// Exercise 02: RNGolf
// Name: Sean Eric So
// Date: 10/27/2023

'use strict'

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 960,
    scene: [ Play ],
    physics: { //Setting Physics
        default: "arcade", //Setting default to arcade
        arcade: { //Adding parameters to arcade
            debug: true //Enabling debugging
        }
    }
}

let game = new Phaser.Game(config)

let { width, height } = game.config

let shotCount = 0;