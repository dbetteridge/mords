import { trie } from "../app";
import { Tile } from "./tile";
import { Grid } from "./grid";

export class Tree {
  root: Tile;
  words?: Tile[][];
  constructor(firstTile: Tile) {
    this.root = firstTile;
    this.words = [];
  }

  parseTree(word: Tile[], grid: Grid) {
    this.words = [];
    grid.state.grid.map((row: Tile[]) => {
      row.map((cell: Tile) => {
        if (cell.state.letter !== "" && cell.state.children?.length) {
          // No parent tile
          if (!cell.state.parents?.length) {
            this.parseChildren(word, cell);
            return;
          }

          if (
            // If a parent tile exists it must share the same row as the child
            !this.commonRow([cell.state.parents[0], cell.state.children[0]]) &&
            // or it must share the same column, but if both fail its not usable
            !this.commonCol([cell.state.parents[0], cell.state.children[0]])
          ) {
            this.parseChildren(word, cell);
            return;
          }

          if (
            cell.state.children.length > 1 &&
            // If a parent tile exists it must share the same row as the child
            !this.commonRow([cell.state.parents[0], cell.state.children[1]]) &&
            // or it must share the same column, but if both fail its not usable
            !this.commonCol([cell.state.parents[0], cell.state.children[1]]) &&
            cell.state.parents.length === 1
          ) {
            this.parseChildren(word, cell);
            return;
          }
        }
      });
    });

    console.log(this.words);
  }

  commonRow(word: Tile[]) {
    let allRow = true;
    word.map((tile) => {
      if (tile.state.j !== word[0].state.j) {
        allRow = false;
      }
    });

    return allRow;
  }

  commonCol(word: Tile[]) {
    let allCol = true;
    word.map((tile) => {
      if (tile.state.i !== word[0].state.i) {
        allCol = false;
      }
    });

    return allCol;
  }

  /**
   * If a given word has a parent tile that should form part of that word, it is not a valid word.
   * Otherwise add it to our word list
   * @param word
   */
  hasValidParent(word: Tile[]) {
    const firstTile = word[0];
    const lastTile = word[word.length - 1];
    const firstTileParent =
      firstTile.state.parents && firstTile.state.parents[0];
    const otherParent = firstTile.state.parents && firstTile.state.parents[1];
    if (
      (!firstTileParent ||
        (!this.commonRow([firstTileParent, lastTile]) &&
          !this.commonCol([firstTileParent, lastTile]))) &&
      (!otherParent ||
        (!this.commonRow([otherParent, lastTile]) &&
          !this.commonCol([otherParent, lastTile])))
    ) {
      const wordAsText = word.map((tile) => tile.state.letter).join("");

      if (wordAsText.length > 1 && trie.search(wordAsText)) {
        word.map((tile) => {
          tile.state.invalid = false;
          tile.state.valid = true;
        });
        this.words?.push(word);
      } else {
        word.length > 1 &&
          word.map((tile) => {
            tile.state.invalid = true;
            tile.state.valid = false;
          });
      }
    }
  }

  parseChildren(word: Tile[], currentTile: Tile) {
    let children = currentTile.state.children;

    if (
      // current tile starts a new word
      !this.commonRow([...word, currentTile]) &&
      !this.commonCol([...word, currentTile])
    ) {
      // existing word has no other children then add to the list
      if (word[word.length - 1].state.children?.length === 1) {
        this.hasValidParent(word);
      }
      // if other children exist, return so they can be parsed
      return;
    }

    word = word.concat(currentTile);

    if (!children || !children.length) {
      this.hasValidParent(word);
      return;
    }

    if (children && children.length) {
      this.parseChildren(word, children[0]);
    }

    if (children?.length > 1) {
      if (
        !this.commonRow([...word, children[1]]) &&
        !this.commonCol([...word, children[1]])
      ) {
        return;
      } else {
        this.parseChildren(word, children[1]);
      }
    }

    return word;
  }
}
