class TileResolver {
  constructor(matrix, tileSize = 16) {
    this.matrix = matrix;
    
    
  }
}

export default class TileCollider {
  constructor(tiles) {
    this.tiles = tiles;
  }

  test(entity) {
    console.log("testing: ", entity);
  }
}
