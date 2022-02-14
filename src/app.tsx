import Grid from "./molecules/Grid";
import TileBag from "./molecules/TileBag";
import Timer from "./molecules/Timer";
import Control from "./molecules/Control";
import Fade from "./molecules/Fade";
import Score from "./molecules/Score";
import MenuBar from "./atoms/MenuBar";
import StatsPanel from "./molecules/StatsPanel";
import Settings from "./molecules/Settings";

import * as ds from "./ds";
import { useEffect, useState } from "preact/hooks";

import validWords from "./ds/words.json";

export const trie = new ds.Trie();
(validWords as any).words.map((word: string) => {
  trie.insert(word);
});

const grid = new ds.Grid();
const hardcodedStartDate = new Date("2022-02-14T00:00:00");

export type State = {
  tileBag: ds.Tile[];
  grid: ds.Grid;
  selectedTilePos: number;
  selectedGridTile?: { i: number; j: number };
  tree?: ds.Tree;
  endTime?: number;
  inProgress: boolean;
  finished?: boolean;
  words: ds.Tile[][];
  day: string;
};

export function App() {
  const [state, setState]: [State, any] = useState({
    grid,
    selectedTilePos: -1,
    tree: undefined,
    inProgress: false,
    words: [],
    day: (
      (new Date().getTime() - hardcodedStartDate.getTime()) /
      (1000 * 60 * 60 * 24)
    ).toFixed(0),
    finished: false,
    tileBag: new Array(15).fill({ state: { letter: "" } }),
  });

  const [showSettings, setSettings] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const toggleSettings = () => {
    setSettings(!showSettings);
    if (!showSettings) {
      setShowStats(false);
    }
  };

  const toggleStats = () => {
    setShowStats(!showStats);

    if (!showStats) {
      setSettings(false);
    }
  };

  const [stats, setStats] = useState({
    highScore: 0,
    longestWord: "",
    gamesPlayed: 0,
  });

  useEffect(() => {
    if (showStats) {
      const { days } = JSON.parse(window.localStorage.getItem("mords") ?? "{}");
      if (days) {
        const gamesPlayed = days.length;
        const highScore = days
          .map((day: any) => day.score)
          .reduce(
            (prev: number, current: number) =>
              current > prev ? current : prev,
            0
          );
        const longestWord = days
          .map((day: any) => day.longestWord)
          .reduce(
            (prev: string, current: string) =>
              current.length > prev.length ? current : prev,
            ""
          );

        setStats({
          gamesPlayed,
          highScore,
          longestWord,
        });
      }
    }
  }, [showStats]);

  if (!state.finished && state.inProgress)
    return (
      <div class="flex flex-col w-fill h-screen">
        <MenuBar
          toggleSettings={toggleSettings}
          goHome={() => {
            setState({ ...state, finished: false, inProgress: false });
            setSettings(false);
            setShowStats(false);
          }}
          showStats={toggleStats}
        />
        <Timer fixed={true} state={state} setState={setState} />
        <Grid state={state} setState={setState} />
        <TileBag state={state} setState={setState} />
      </div>
    );

  return (
    <div class="flex flex-col w-fill h-screen items-center ">
      <MenuBar
        toggleSettings={toggleSettings}
        showStats={toggleStats}
        goHome={() => {
          setState({ ...state, finished: false, inProgress: false });
          setShowStats(false);
          setSettings(false);
        }}
      />
      {!state.finished && !state.inProgress && !showSettings && !showStats && (
        <Control
          state={state}
          start={() => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const tileBag = new ds.TileBag(15, today.getTime());

            setState({
              ...state,
              endTime: new Date().getTime() + 30 * 1000,
              tileBag: tileBag.bag,
              inProgress: true,
            });
          }}
        />
      )}

      {showSettings && <Settings toggleSettings={toggleSettings} />}

      {showStats && <StatsPanel stats={stats} />}

      {!state.finished && !state.inProgress && (
        <Fade>
          <Grid state={state} setState={setState} />
          <TileBag state={state} setState={setState} />
        </Fade>
      )}

      {!showSettings && !showStats && state.finished && (
        <Score
          day={state.day}
          words={state.words?.length}
          score={state.words.reduce(
            (prev, word) => prev + word.length,
            state.words.length
          )}
          longestWord={state.words.reduce((prev, word) => {
            if (word.length > prev.length) {
              return word.map((tile) => tile.state.letter).join("");
            } else {
              return prev;
            }
          }, "")}
        />
      )}
    </div>
  );
}
