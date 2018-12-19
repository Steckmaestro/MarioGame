import { Trait, Sides } from "../Entity.js";

export default class Solid extends Trait {
  constructor() {
    super("solid");
  }

  obstruct(entity, side, match) {
    if (side === Sides.BOTTOM) {
      entity.bounds.right = match.x1;
      entity.vel.x = 0;
    }
  }
}
