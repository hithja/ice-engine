export default class AABB {
    constructor(x, y, width, height) {
        this.min = { X: x, Y: y };
        this.max = { X: x + width, Y: y + height };
    }

    checkCollisions(other) {
        return !(
            this.max.X < other.min.X ||
            this.max.Y < other.min.Y ||
            this.min.X > other.max.X ||
            this.min.Y > other.max.Y
        );
    }
}
