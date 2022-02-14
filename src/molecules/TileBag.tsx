import * as ds from "../ds";
import Tile from "../atoms/Tile";
import { State } from "../app";
import { pickTile } from "./Grid";

type Props = {
  state: State;
  setState: any;
  disabled?: boolean;
};

const TileBag = ({ disabled, state, setState }: Props) => {
  const { tileBag: tiles }: { tileBag: ds.Tile[] } = state;
  const selectTileBag = (tile: ds.Tile) => (_event: any) => {
    state.tileBag.map((bagTile: ds.Tile, idx: number) => {
      if (tile.state.id === bagTile.state.id) {
        setState({ ...state, selectedTilePos: idx });
        if (state.selectedGridTile) {
          pickTile(
            state.grid.state.grid[state.selectedGridTile.i][
              state.selectedGridTile.j
            ],
            state.selectedGridTile?.i,
            state.selectedGridTile.j,
            { ...state, selectedTilePos: idx },
            setState
          );
          setState({ ...state, selectedGridTile: null });
        }
      }
    });
  };
  return (
    <div class="flex flex-row flex-wrap justify-center content-center border-2 border-black w-full h-64 bg-white z-1 fixed bottom-0 left-0">
      {tiles.map((tile, idx) => (
        <Tile
          key={`bag-${idx}`}
          letter={tile.state.letter}
          selected={state.selectedTilePos === idx}
          onClick={disabled ? null : selectTileBag(tile)}
        />
      ))}
    </div>
  );
};

export default TileBag;
