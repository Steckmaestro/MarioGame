import Camera from "./Camera.js";
import Timer from "./Timer.js";
import { loadEntities } from "./entities.js";
import { loadLevel } from "./loaders/level.js";
import { setupKeyboard } from "./input.js";
import { createCollisionLayer, createCameraLayer } from "./layers.js";
import { setupMouseControl } from "./debug.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

Promise.all([loadEntities(), loadLevel("1-1")]).then(([entity, level]) => {
  console.log(entity);
  const camera = new Camera();

  const mario = entity.mario();
  mario.pos.set(64, 64);
  level.entities.add(mario);

  window.mario = mario;

  const goomba = entity.goomba();
  goomba.pos.x = 250;
  level.entities.add(goomba);

  const koopa = entity.koopa();
  koopa.pos.x = 300;
  level.entities.add(koopa);

  level.comp.layers.push(createCollisionLayer(level));

  // level.comp.layers.push(
  //   createCollisionLayer(level),
  //   createCameraLayer(camera)
  // );

  // window.camera = camera;
  // window.mario = mario;
  // window.level = level;

  const input = setupKeyboard(mario);

  // setupMouseControl(canvas, mario, camera);

  const timer = new Timer(1 / 60);
  timer.update = function update(deltaTime) {
    if (mario.pos.x > 100) {
      camera.pos.x = mario.pos.x - 100;
    }

    level.update(deltaTime);
    level.comp.draw(context, camera);
  };
  timer.start();
});
