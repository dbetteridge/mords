import { Tile } from "./tile";

export class Grid {
  state: {
    grid: Array<Array<Tile>>;
    gridHeight: number;
    gridWidth: number;
  };
  constructor() {
    const GRID_DIM = 12;
    this.state = {
      gridHeight: GRID_DIM,
      gridWidth: GRID_DIM,
      grid: new Array(GRID_DIM)
        .fill(new Array(GRID_DIM).fill(0))
        .map((row: Tile[], i: number) => {
          return row.map((_single: Tile, j: number) => {
            return new Tile("", i, j);
          });
        }),
    };
  }

  parentAdjacencyCheck(i: number, j: number) {
    if (i > this.state.gridWidth || i < 0) return [];
    if (j > this.state.gridHeight || j < 0) return [];
    const parents = [];

    if (i - 1 >= 0 && this.state.grid[i - 1][j].state.letter !== "") {
      parents.push(this.state.grid[i - 1][j]);
    }

    if (j - 1 >= 0 && this.state.grid[i][j - 1].state.letter !== "") {
      parents.push(this.state.grid[i][j - 1]);
    }
    return parents;
  }

  childAdjacencyCheck(i: number, j: number) {
    if (i > this.state.gridWidth || i < 0) return [];
    if (j > this.state.gridHeight || j < 0) return [];
    const children = [];

    if (
      i + 1 < this.state.grid.length &&
      this.state.grid[i + 1][j].state.letter !== ""
    ) {
      children.push(this.state.grid[i + 1][j]);
    }

    if (
      j + 1 < this.state.grid[0].length &&
      this.state.grid[i][j + 1].state.letter !== ""
    ) {
      children.push(this.state.grid[i][j + 1]);
    }

    return children;
  }

  isGridEmpty() {
    let empty = true;
    this.state.grid.map((row) => {
      row.map((tile) => {
        if (tile.state.letter !== "") {
          empty = false;
        }
      });
    });
    return empty;
  }

  addTile(tile: Tile) {
    const keepTile = this.state.grid[tile.state.i][tile.state.j];
    if (this.state.grid[tile.state.i][tile.state.j].state.letter !== "") {
      keepTile.removeLinks();

      this.state.grid[tile.state.i][tile.state.j] = new Tile(
        "",
        tile.state.i,
        tile.state.j
      );
    }

    if (tile.state.letter !== "") {
      const children = this.childAdjacencyCheck(tile.state.i, tile.state.j);
      tile.state.children = children;

      children.map((child: Tile) => {
        child.state.parents = child.state.parents?.concat(tile);
      });

      const parents = this.parentAdjacencyCheck(tile.state.i, tile.state.j);
      tile.state.parents = parents;
      parents.map((parent: Tile) => {
        parent.state.children = parent.state.children?.concat(tile);
      });

      this.state.grid[tile.state.i][tile.state.j] = tile;
    }

    return keepTile;
  }

  moveTile(from: { i: number; j: number }, to: { i: number; j: number }) {
    const tile = this.state.grid[from.i][from.j];
    tile.removeLinks();
    this.state.grid[from.i][from.j] = new Tile("", from.i, from.j);
    tile.state = { ...tile.state, ...to };

    this.addTile(tile);
  }
}
