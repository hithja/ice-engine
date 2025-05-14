export default class SceneManeger {
    constructor () {
        this.scene = [];
        this.currScene = 0;
    }
    addScene(scene) {
        this.scene.push(scene);
    }
    toScene(deltaTime, id) {
        this.currScene = id;
        this.scene[id-1].initScene(deltaTime)
    }
}