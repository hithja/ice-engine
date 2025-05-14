import Scene from './Scene.js';

import DefObject from '../Object.js';
import Player from '../Player.js';

export default class GameScene extends Scene {
    constructor(ctx, name, id) {
        super(ctx, name, id);

        this.plX = 160;
        this.plY = 300;

        this.GRAVITY = 1.5;
        this.SPEED = 45;
        this.JUMP_FORCE = 42;

        this.bg = new DefObject({x:-1200, y:-1200}, {w: canvas.width+2400, h: canvas.height+2400}, '../../assets/space.jpg', {w: canvas.width+2400, h: canvas.height+2400});

        this.player = new Player({x: this.plX, y: this.plY}, {w: 50, h: 87}, '../../assets/player.png', this.GRAVITY, this.SPEED, this.JUMP_FORCE, {w: 70, h: 90});
    
        this.platfrorms = [
          new DefObject({x: -200, y: 600}, {w: canvas.width-100, h: 600}, '../../assets/image.png', {w: canvas.width-100, h: 600}, 'ground'),
          new DefObject({x: canvas.width-300, y: 600}, {w: canvas.width, h: 600}, '../../assets/lava.png', {w: canvas.width, h: 600}, 'trap'),
          new DefObject({x: 100, y: 260}, {w: 200, h: 50}, '../../assets/image.png', {w: 200, h: 50}, 'ground'),
          new DefObject({x: 400, y:500}, {w: 200, h: 50}, '../../assets/image.png', {w: 200, h: 50}, 'ground'),
          new DefObject({x: 700, y: 290}, {w: 200, h: 50}, '../../assets/image.png', {w: 200, h: 50}, 'ground'),
          new DefObject({x: 1100, y: 210}, {w: 200, h: 50}, '../../assets/image.png', {w: 200, h: 50}, 'ground'),
          new DefObject({x: 1500, y: 100}, {w: 200, h: 50}, '../../assets/image.png', {w: 200, h: 50}, 'ground'),
          new DefObject({x: 2000, y: -50}, {w: 200, h: 50}, '../../assets/image.png', {w: 200, h: 50}, 'ground'),
          new DefObject({x: 2100, y: -150}, {w: 100, h: 100}, '../../assets/kfc.png', {w: 100, h: 100}, 'finish'),
        ];
    }
    initScene(deltaTime) {
        this.ctx.save();
        this.player.cam.camMove(this.ctx, this.player);

        this.bg.create(this.ctx);
            
        for (let platfrom of this.platfrorms) {
          platfrom.create(this.ctx);
        }
    
        this.player.move(this.ctx, deltaTime, this.platfrorms);
        this.ctx.restore();
    }
}