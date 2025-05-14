import DefObject from './Object.js';
import AABB from "./AABB.js";
import Camera from './Camera.js';

export default class Player extends DefObject {
    constructor(pos, size, txtr, gravity, speed, jumpForce, txtrSize) {
        super(pos, size, txtr, txtrSize);
        this.speed = speed;
        this.jumpForce = jumpForce;
        this.gravity = gravity;

        this.isJumping = false;
        this.isMirrored = false;
        this.txtrSize = txtrSize;
        this.keys = {};
        this.velocity = {x: 0, y: 0};

        this.cam = new Camera(this, canvas.width, canvas.height);

        document.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
        });
        document.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });

    }
    move(ctx, deltaTime, blocks) {
        this.velocity.x = 0;
        if (this.keys['a'] && !this.keys['d']) {this.isMirrored = true; this.velocity.x -= this.speed * deltaTime; this.mirror(ctx, this.isMirrored)};
        if (this.keys['d'] && !this.keys['a']) {this.isMirrored = false; this.velocity.x += this.speed * deltaTime; this.mirror(ctx, this.isMirrored)};
        this.mirror(ctx, this.isMirrored)

        this.pos.x += this.velocity.x;

        let hitbox = new AABB(this.pos.x, this.pos.y, this.size.w, this.size.h);

        for (let block of blocks) {
            if (hitbox.checkCollisions(block.getHitbox())) {
                switch (block.id) {
                    case 'finish':
                        location.reload();
                        alert("You won!");
                        break;
                    case 'trap':
                        location.reload();
                        break;
                    case 'ground':
                        this.pos.x -= this.velocity.x;
                        break;
                }
            }
        }

        if (this.keys['w'] && !this.isJumping) {
            this.velocity.y = -this.jumpForce * deltaTime * 5;
        }
        this.isJumping = true; 

        this.velocity.y += this.gravity * deltaTime * 5;
        this.pos.y += this.velocity.y;

        hitbox = new AABB(this.pos.x, this.pos.y, this.size.w, this.size.h);

        for (let block of blocks) {
            if (hitbox.checkCollisions(block.getHitbox())) {
                switch (block.id) {
                    case 'finish':
                        location.reload();
                        alert("You won!");
                        break;
                    case 'trap':
                        location.reload();
                        break;
                    case 'ground':
                        if (this.velocity.y > 0) {
                            this.pos.y = block.pos.y - this.size.h - 0.1;
                            this.isJumping = false;
                        }
                        else if (this.velocity.y < 0) {
                            this.pos.y = block.pos.y + block.size.h;
                        }
                        this.velocity.y = 0;
                        break;
                }
                break;
            }
        }
    }    
}