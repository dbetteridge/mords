import { useEffect } from "preact/hooks";
import Panel from "../atoms/Panel";

type Props = {
  words: number;
  score: number;
  longestWord: string;
  day: string;
};

function Score({ day, words, score, longestWord }: Props) {
  useEffect(() => {
    const previousScores = JSON.parse(
      window.localStorage.getItem("mords") ?? "{}"
    );

    if (
      (previousScores &&
        previousScores.days &&
        !previousScores.days.filter((pastDay: any) => pastDay.day === day)
          .length) ||
      !previousScores ||
      !previousScores.days
    ) {
      window.localStorage.setItem(
        "mords",
        JSON.stringify({
          ...previousScores,
          days: [
            ...(previousScores.days ?? []),
            {
              day,
              score,
              longestWord,
            },
          ],
        })
      );
    }
  }, [day, score, longestWord, day]);

  return (
    <Panel>
      <p class="text-3xl">Day {day}</p>
      <p class="text-3xl">Well Done!</p>
      <p class="text-2xl">
        You have played <span class="text-green-700 text-4xl">{words}</span>{" "}
        words
      </p>
      <p class="text-2xl">
        For a total score of{" "}
        <span class="text-green-700 text-4xl">{score}</span>
      </p>
      <p class="text-2xl">Your longest word was</p>
      <span class="text-green-700 text-4xl"> {longestWord} </span>
    </Panel>
  );
}

export default Score;
