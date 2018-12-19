import { Vec2 } from "./math.js";
import BoundingBox from "./BoundingBox.js";

export const Sides = {
  TOP: Symbol("top"),
  BOTTOM: Symbol("bottom"),
  RIGHT: Symbol("right"),
  LEFT: Symbol("left")
};

export class Trait {
  constructor(name) {
    this.NAME = name;
    this.tasks = [];
  }

  collides(us, them) {
    // console.log("Collided with ", them);
  }

  queue(task) {
    this.tasks.push(task);
  }

  finalize() {
    this.tasks.forEach(task => task());
    this.tasks.length = 0;
  }

  obstruct() {}

  update() {
    // debugger;
    console.warn("Unhandled update call in Trait", this);
  }
}

export default class Entity {
  constructor() {
    this.canCollide = true;

    this.pos = new Vec2(0, 0);
    this.vel = new Vec2(0, 0);
    this.size = new Vec2(0, 0);
    this.offset = new Vec2(0, 0);
    this.bounds = new BoundingBox(this.pos, this.size, this.offset);
    this.lifetime = 0;
    this.traits = [];
  }

  addTrait(trait) {
    this.traits.push(trait);
    this[trait.NAME] = trait;
  }

  obstruct(side, match) {
    this.traits.forEach(trait => {
      trait.obstruct(this, side, match);
    });
  }

  collides(candidate) {
    this.traits.forEach(trait => {
      trait.collides(this, candidate);
    });
  }

  draw() {}

  finalize() {
    this.traits.forEach(trait => {
      trait.finalize();
    });
  }

  update(deltaTime, level) {
    this.traits.forEach(trait => {
      trait.update(this, deltaTime, level);
    });

    this.lifetime += deltaTime;
  }
}
