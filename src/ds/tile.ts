import { sameLocation } from "./";

export class Tile {
  state: {
    id: string;
    letter: string;
    i: number;
    j: number;
    parents?: Tile[];
    children?: Tile[];
    invalid: boolean;
    valid: boolean;
  };
  constructor(letter: string, i: number, j: number) {
    this.state = {
      id: `${i},${j}`,
      letter,
      i,
      j,
      parents: [],
      children: [],
      invalid: false,
      valid: false,
    };
  }

  getLocation() {
    return { i: this.state.i, j: this.state.j };
  }

  setLocation(i: number, j: number) {
    this.state.i = i;
    this.state.j = j;
    this.state.id = `${i},${j}`;
    this.state.invalid = false;
    this.state.valid = false;
  }

  removeLinks() {
    if (this.state.parents) {
      this.state.parents?.map((parent) => {
        parent.state.children = parent.state.children?.filter(
          (child) => !sameLocation(this, child)
        );
      });
    }

    if (this.state.children) {
      this.state.children.map((child) => {
        child.state.parents = child.state.parents?.filter(
          (parent) => !sameLocation(this, parent)
        );
      });
    }
  }
}
