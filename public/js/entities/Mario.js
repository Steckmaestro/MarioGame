import Entity from "../Entity.js";
import { loadSpriteSheet } from "../loaders.js";
import Jump from "../traits/Jump.js";
import Stomper from "../traits/Stomper.js";
import Go from "../traits/Go.js";
import Killable from "../traits/Killable.js";
import Solid from "../traits/Solid.js";
import { createAnim } from "../anim.js";

const FAST_DRAG = 1 / 5000;
const SLOW_DRAG = 1 / 1000;

export function loadMario() {
  return loadSpriteSheet("mario").then(createMarioFactory);
}

function createMarioFactory(sprite) {
  // Create support functions
  const runAnim = sprite.animations.get("run");

  function routeFrame(mario) {
    if (mario.jump.falling) {
      return "jump";
    }
    if (mario.go.distance > 0) {
      if (
        (mario.vel.x > 0 && mario.go.direction < 0) ||
        (mario.vel.x < 0 && mario.go.direction > 0)
      ) {
        return "break";
      }
      return runAnim(mario.go.distance);
    }
    return "idle";
  }

  function setTurboState(turboOn) {
    this.go.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
  }

  function drawMario(context) {
    sprite.draw(routeFrame(this), context, 0, 0, this.go.heading < 0 ? 1 : 0);
  }

  // Main function
  return function createMario() {
    const mario = new Entity();
    mario.size.set(14, 16);
    // mario.offset.set(20, 32);

    mario.addTrait(new Jump());
    mario.addTrait(new Go());
    mario.addTrait(new Stomper());
    mario.addTrait(new Killable());
    mario.addTrait(new Solid());

    mario.killable.removeAfter = 0;

    mario.turbo = setTurboState;
    mario.draw = drawMario;

    mario.turbo(false);

    return mario;
  };
}
