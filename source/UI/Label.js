export default class Label {
    constructor(text, x, y, maxWidth, font, color) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.maxWidth = maxWidth;
        this.font = font;
        this.color = color;
    }
    create(ctx) {
        ctx.font = this.font;
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, this.x, this.y, this.maxWidth);
    }
    changeText(ctx, newText) {
        this.text = newText;
        ctx.font = this.font;
        ctx.fillText(this.text, this.x, this.y, this.maxWidth);
    }
}