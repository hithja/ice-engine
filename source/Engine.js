export default class Engine {
    // Engine Settings
    eCanvas;
    eCtx;

    constructor() {}

    init(canvasName) {
        let canvas = document.getElementById(canvasName);
        let ctx = canvas.getContext("2d", { alpha: true });

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.imageSmoothingEnabled = false;

        this.eCanvas = canvas;
        this.eCtx = ctx;

        return [ctx, canvas];
    }
    getDeltaTime(now, lastTime) {
        const deltaTime = (now - lastTime) / 1000 * 10;
        lastTime = now;
        return [deltaTime, lastTime];
    }

    clearAll() {
        this.eCtx.clearRect(0, 0, canvas.width, canvas.height);
    }
}