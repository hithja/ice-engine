import Scene from './Scene.js';
import SceneManeger from './SceneManeger.js';
import GameScene from './Game.js';


import DefObject from '../Object.js';
import Label from '../UI/Label.js';

export default class LogoScene extends Scene {
    constructor(ctx, name, id) {
        super(ctx, name, id);

        this.logo = new DefObject({x: canvas.width / 2 - 400 / 2, y: (canvas.height / 2 - 350 / 2) - 120}, {w: 400, h: 350}, '../../assets/EngineLogo.png', {w: 400, h: 350}, 'ground');
        this.text = new Label('Made with IceEngine', canvas.width / 2 - 300 / 2 - 10, (canvas.height / 2 - 350 / 2) + 320, 300, '32px cursive', 'white');

        this.isLogoHiden = false;

        this.alpha = 1;
        this.fadeSpeed = 0.01;

        this.sman = new SceneManeger();
        this.sman.addScene(new GameScene(this.ctx, 'game', 1));
    }
    initScene(deltaTime) {
        if (!this.isLogoHiden) {
            this.ctx.fillStyle = '#333333';
            this.ctx.fillRect(0, 0, canvas.width, canvas.height);

            this.ctx.save();

            this.ctx.globalAlpha = this.alpha;
            this.logo.create(this.ctx);
            this.text.create(this.ctx);
            
            this.ctx.restore();

            setTimeout(() => {this.alpha -= this.fadeSpeed;}, 1500);
            if (this.alpha <= 0) {
                this.alpha = 0;
                this.isLogoHiden = true;
            }
        }

        if (this.isLogoHiden) {
            this.sman.toScene(deltaTime, 1);
        }

    }
}