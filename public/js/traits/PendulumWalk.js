import { Trait, Sides } from "../Entity.js";

export default class PendulumWalk extends Trait {
  constructor() {
    super("pendulumwalk");
    this.speed = -40;
  }

  obstruct(entity, side) {
    if (side === Sides.LEFT || side === Sides.RIGHT) {
      this.speed = -this.speed;
    }
  }

  update(entity, deltaTime) {
    entity.vel.x = this.speed;
  }
}
