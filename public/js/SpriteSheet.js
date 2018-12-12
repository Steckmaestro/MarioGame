/**
 * Creates an instance of SpriteSheet.
 *
 * @constructor
 * @author: Thomas Steck
 * @this {SpriteSheet}
 * @param {Image} HTMLImageElement: HTML Object.
 * @param {Number} Width: width of clippped pos (x,y) and width of final drawn image.
 * @param {Number} Height: height of clippped pos (x,y) and height of final drawn image.
 */
export default class SpriteSheet {
  constructor(image, width, height) {
    this.image = image;
    this.width = width;
    this.height = height;
    this.tiles = new Map();
  }

  define(name, x, y, width, height) {
    const buffer = document.createElement("canvas");
    buffer.width = width;
    buffer.height = height;
    buffer.getContext("2d").drawImage(
      this.image,
      x, // x, y start clipping
      y,
      width, // width, height of clipped image
      height,
      0, // x, y where to place image on canvas
      0,
      width, // width, height of image on canvas (stretch/reduce)
      height
    );
    this.tiles.set(name, buffer);
  }

  defineTile(name, x, y) {
    this.define(name, x * this.width, y * this.height, this.width, this.height);
  }

  draw(name, context, x, y) {
    const buffer = this.tiles.get(name);
    context.drawImage(buffer, x, y);
  }

  drawTile(name, context, x, y) {
    this.draw(name, context, x * this.width, y * this.height);
  }
}
