import AABB from "./AABB.js";

export default class DefObject {
    constructor(pos, size, txtr, txtrSize, id) {
        this.pos = pos;
        this.size = size;
        this.txtr = `${txtr}`;
        this.txtrSize = txtrSize;
        this.id = id;

        this.importedTxtr = new Image();
        this.importedTxtr.src = this.txtr;

        this.isTxtrLodaded = true;
        this.importedTxtr.onload = () => {
        }
    }
    
    create(ctx) {
        if (this.isTxtrLodaded) {
            ctx.drawImage(this.importedTxtr, this.pos.x, this.pos.y, this.txtrSize.w, this.txtrSize.h);
            return true;
        }
        return false;
    }
    changePos(ctx, x, y) {
        this.pos.x = x;
        this.pos.y = y;

        let oldX = this.pos.x;
        let oldY = this.pos.y;

        this.clear(ctx, oldX, oldY);

        ctx.globalAlpha = 1.0;
    
        if (this.isTxtrLodaded) {
            ctx.drawImage(this.importedTxtr, this.pos.x, this.pos.y, this.txtrSize.w, this.txtrSize.h);
        }
    }
    clear(ctx, oldX, oldY) {
        ctx.clearRect(oldX, oldY, this.txtrSize.w, this.txtrSize.h);
    }
    mirror(ctx, isMirrored) {
        ctx.save();

        ctx.scale(isMirrored ? -1 : 1, 1);

        ctx.drawImage(this.importedTxtr, this.pos.x*(isMirrored ? -1 : 1), this.pos.y, this.txtrSize.w*(isMirrored ? -1 : 1), this.txtrSize.h);

        ctx.restore();
    }
    getHitbox() {
        return new AABB(this.pos.x, this.pos.y, this.size.w, this.size.h);
    }
}