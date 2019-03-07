import Phaser from "phaser";

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
    }

    init() {}

    preload() {}

    create() {
        this.ws = new WebSocket("ws://localhost:9001");
        this.ws.onopen = e => {
            this.ws.send("connected");
        };
    }

    update(time, delta) {}
}

export default GameScene;
