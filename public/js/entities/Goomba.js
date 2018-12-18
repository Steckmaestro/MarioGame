import Entity, { Sides } from "../Entity.js";
import PendulumWalk from "../traits/PendulumWalk.js";
import { loadSpriteSheet } from "../loaders.js";

export function loadGoomba() {
  return loadSpriteSheet("goomba").then(createGoombaFactory);
}

function createGoombaFactory(sprite) {
  console.log(sprite);
  const walkAnim = sprite.animations.get("walk");

  // Create support functions
  function drawGoomba(context) {
    sprite.draw(walkAnim(this.lifetime), context, 0, 0);
  }

  // Main function
  return function createGoomba() {
    const goomba = new Entity();
    goomba.size.set(16, 16);

    goomba.addTrait(new PendulumWalk());

    goomba.draw = drawGoomba;

    return goomba;
  };
}
