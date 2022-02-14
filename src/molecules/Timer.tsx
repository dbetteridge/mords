import { useState, useEffect } from "preact/hooks";
import * as ds from "../ds";

type Props = {
  state: any;
  setState: any;
  fixed: boolean;
};

const Timer = ({ fixed, state, setState }: Props) => {
  const [timeRemaining, setTime] = useState(30000);

  useEffect(() => {
    let isMounted = true;
    if (fixed && timeRemaining < 1000) {
      setState({ ...state, finished: true, words: state.tree?.words });
    }

    if (!fixed && timeRemaining < 1000) {
      setState({ ...state, finished: true });
    }

    ds.timer(state.endTime, timeRemaining, (remain: number) => setTime(remain))(
      isMounted
    );

    return () => {
      isMounted = false;
    };
  }, [timeRemaining]);

  return (
    <div
      class={`flex flex-row justify-center items-center ${
        fixed ? " fixed top-2 left-2 z-1 w-14" : "w-40"
      } border-2 border-orange-500 rounded text-4xl text-orange-500 padding-2h-14`}
    >
      <div>
        {fixed
          ? (timeRemaining / 1000).toFixed(0)
          : new Date(timeRemaining).toISOString().substr(11, 8)}
      </div>
    </div>
  );
};

export default Timer;
