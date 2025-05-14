export default class Camera {
    constructor(player, width, height) {
        this.width = width;
        this.height = height;
        this.x = player.pos.x - this.width / 2;
        this.y = player.pos.y - this.height / 2;
    }

    update(player) {
        this.x = player.pos.x - this.width / 2;
        this.y = player.pos.y - this.height / 2;
    }
    camMove(ctx, player) {
        ctx.translate(-player.cam.x, -player.cam.y);
        player.cam.update(player);
    }
}