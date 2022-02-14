import React from "preact/compat";
import { State } from "../app";
import Tile from "../atoms/Tile";
import * as ds from "../ds";
import { sameGridLocation } from "../ds";

type Props = {
  state: State;
  setState: any;
};

const Grid = ({ state, setState }: Props) => {
  const { grid }: { grid: ds.Grid } = state;
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref && ref.current) {
      const div = ref.current as any;
      div.scrollTo(div.clientWidth / 2, div.clientHeight / 2);
    }
  }, [ref]);

  const selectedGridTile = state.selectedGridTile || {
    i: -1,
    j: -1,
  };

  const selectGridTile = (tile: ds.Tile) => (_event: any) => {
    state.grid.state.grid.map((row: ds.Tile[], i: number) => {
      row.map((currentTile: ds.Tile, j: number) => {
        if (ds.sameLocation(currentTile, tile)) {
          pickTile(currentTile, i, j, state, setState);
        }
      });
    });
  };

  return (
    <div
      class="flex flex-row items-center justify-center w-screen h-[calc(100vh-18.5rem)] overflow-scroll"
      ref={ref}
    >
      {grid.state.grid.map((row) => (
        <div class="flex flex-col flex-wrap justify-center items-center w-fit">
          {row.map((tile) => (
            <Tile
              key={`grid-${tile.state.id}`}
              letter={tile.state.letter}
              selected={
                selectedGridTile.i === tile.state.i &&
                selectedGridTile.j === tile.state.j
              }
              invalid={tile.state.invalid}
              valid={tile.state.valid}
              onClick={selectGridTile(tile)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;

export const pickTile = (
  currentTile: ds.Tile,
  i: number,
  j: number,
  state: State,
  setState: any
) => {
  if (
    // Item in tilebag is selected
    // so lets place it on the grid where we just clicked
    state.selectedTilePos !== -1 &&
    state.tileBag[state.selectedTilePos].state
  ) {
    const selectedTile = state.tileBag[state.selectedTilePos];
    const newTile = new ds.Tile(selectedTile.state.letter, i, j);

    const keepTile = state.grid.addTile(newTile);

    state.tileBag[state.selectedTilePos] = keepTile
      ? new ds.Tile(
          keepTile.state.letter,
          selectedTile.state.i,
          selectedTile.state.j
        )
      : new ds.Tile("", selectedTile.state.i, selectedTile.state.j);

    createOrParseTree(state, setState);
  } else {
    // Toggle selected grid tile
    if (
      state.selectedGridTile &&
      sameGridLocation(state.selectedGridTile, currentTile)
    ) {
      setState({
        ...state,
        selectedGridTile: undefined,
      });
    } else {
      setState({
        ...state,
        selectedGridTile: currentTile.getLocation(),
      });
    }
  }
};

const createOrParseTree = (state: State, setState: any) => {
  if (state.selectedTilePos === -1) return;
  const tree = state.tree ?? new ds.Tree(state.tileBag[state.selectedTilePos]);

  tree.parseTree([], state.grid);
  setState({
    ...state,
    selectedTilePos: -1,
    tree,
    selectedGridTile: undefined,
  });
};
