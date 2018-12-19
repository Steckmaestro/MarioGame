import Camera from "./Camera.js";
import Entity from "./Entity.js";
import PlayerController from "./traits/PlayerController.js";
import Timer from "./Timer.js";
import { loadEntities } from "./entities.js";
import { createLevelLoader } from "./loaders/level.js";
import { setupKeyboard } from "./input.js";
import { createCollisionLayer, createCameraLayer } from "./layers.js";
import { setupMouseControl } from "./debug.js";

function createPlayerEnv(playerEntity) {
  const playerEnv = new Entity();
  const playerControl = new PlayerController();
  playerControl.setPlayer(playerEntity);
  playerEnv.addTrait(playerControl);
  return playerEnv;
}

async function main(canvas) {
  const context = canvas.getContext("2d");
  const entityFactory = await loadEntities();
  const loadLevel = await createLevelLoader(entityFactory);
  const level = await loadLevel("1-1");

  const camera = new Camera();

  const mario = entityFactory.mario();
  mario.pos.set(64, 64);
  level.entities.add(mario);

  const playerEnv = createPlayerEnv(mario);
  level.entities.add(playerEnv);

  // window.mario = mario;

  // level.comp.layers.push(createCollisionLayer(level));

  // window.camera = camera;
  // window.level = level;

  const input = setupKeyboard(mario);

  // setupMouseControl(canvas, mario, camera);

  const timer = new Timer(1 / 60);
  timer.update = function update(deltaTime) {
    camera.pos.x = Math.max(0, mario.pos.x - 100);

    level.update(deltaTime);
    level.comp.draw(context, camera);
  };
  timer.start();
}

const canvas = document.getElementById("screen");
main(canvas);
