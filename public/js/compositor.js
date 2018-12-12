export default class Compositor {
  constructor() {
    this.layers = [];
  }

  // TODO: Check out higher order function
  draw(context) {
    this.layers.forEach(layer => {
      layer(context);
    });
  }
}
