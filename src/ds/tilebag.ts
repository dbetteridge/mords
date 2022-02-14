import { Tile } from "./tile";
import { getRandomLetter } from "./helpers";
export class TileBag {
  bag: Tile[];
  seed: number;
  constructor(size: number, seed: number) {
    this.bag = new Array(size).fill(0).map((_t, idx) => {
      return new Tile(getRandomLetter(idx, seed), idx % 5, idx % 3);
    });
    this.seed = seed;
  }
}
