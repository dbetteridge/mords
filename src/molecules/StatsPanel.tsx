import Panel from "../atoms/Panel";

type Props = { stats: any };

const StatsPanel = ({ stats }: Props) => {
  return (
    <Panel classStrings="">
      <p class="flex flex-row w-full items-center justify-center text-3xl">
        High Score:
        <span class="m-2 text-green-700 text-4xl">{stats.highScore}</span>
      </p>
      <p class="flex flex-row w-full  items-center justify-center text-3xl">
        Games Played:
        <span class="m-2 text-green-700 text-4xl">{stats.gamesPlayed}</span>
      </p>
      <p class="flex flex-row w-full flex-wrap items-center justify-center text-3xl">
        Longest Word:
        <span class="m-2 text-green-700 text-4xl">{stats.longestWord}</span>
      </p>
    </Panel>
  );
};

export default StatsPanel;
