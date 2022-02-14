import { useEffect, useState } from "preact/hooks";
import { State } from "../app";
import Panel from "../atoms/Panel";
import Timer from "./Timer";
import MonoParagraph from "../atoms/MonoParagraph";

type Props = {
  start: any;
  state: State;
};

const Control = ({ start, state }: Props) => {
  const [time, setTime]: any = useState({});

  useEffect(() => {
    const todayMidnight = new Date();
    todayMidnight.setHours(23, 59, 59, 59);

    const mords = JSON.parse(window.localStorage.getItem("mords") ?? "{}");

    const sameDay =
      mords &&
      mords.days &&
      mords.days[mords.days.length - 1] &&
      mords.days[mords.days.length - 1].day === state.day;

    setTime({ endTime: todayMidnight.getTime(), sameDay });
  }, []);

  return (
    <Panel classStrings="fixed top-10 bg-white z-40 h-5/6">
      <MonoParagraph>
        The goal is to place as many valid words as you can in 30 seconds.
      </MonoParagraph>

      <MonoParagraph>
        You can swap letters by selecting a letter in the grid, then clicking
        its replacement in the tile-bag (bottom of the screen).
      </MonoParagraph>

      <MonoParagraph>
        You can put letters back by selecting a letter in the grid, then
        clicking an empty space in the tile-bag.
      </MonoParagraph>

      {time.sameDay && (
        <MonoParagraph classString="text-xl">
          Next game available in
        </MonoParagraph>
      )}
      {time.sameDay && <Timer fixed={false} state={time} setState={setTime} />}

      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 mono"
        onClick={() => start()}
        disabled={time.sameDay}
      >
        Start
      </button>
    </Panel>
  );
};

export default Control;
