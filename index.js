import Engine from './source/Engine.js';
import SceneManeger from './source/Scenes/SceneManeger.js';

import LogoScene from './source/Scenes/Logo.js';
import GameScene from './source/Scenes/Game.js';

import Label from './source/UI/Label.js';

const engine = new Engine();
let initedEngine = engine.init('canvas');

let ctx = initedEngine[0];

const sman = new SceneManeger();
sman.addScene(new GameScene(ctx, 'game', 1));
sman.addScene(new LogoScene(ctx, 'logo', 2, sman));

// NUJNOE!
let lastTime = 0;
let FPS = 0;

let FPS_counter = new Label('FPS: 0', 10, 32, 300, '32px cursive', 'white');


function gameLoop(now) {
  requestAnimationFrame(gameLoop);
  const deltaTime = engine.getDeltaTime(now, lastTime)[0];
  lastTime = engine.getDeltaTime(now, lastTime)[1];
  
  FPS = 10/deltaTime;
  
  engine.clearAll();
  sman.toScene(deltaTime, 2);
  
  createText();
}

function createText() {
  FPS_counter.create(ctx);
  FPS_counter.changeText(ctx, `FPS: ${FPS.toFixed(0)}`);
}

gameLoop();