import Panel from "../atoms/Panel";
import MonoParagraph from "../atoms/MonoParagraph";

type Props = {
  toggleSettings: () => void;
};

function Settings({ toggleSettings }: Props) {
  return (
    <Panel classStrings="h-40">
      <MonoParagraph classString="flex flex-row w-full items-center justify-center">
        You can clear your scores here
      </MonoParagraph>
      <MonoParagraph classString="flex flex-row w-full items-center justify-center">
        This cannot be undone.
      </MonoParagraph>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        onClick={() => {
          window.localStorage.removeItem("mords");
          toggleSettings();
        }}
      >
        Clear Scores
      </button>
    </Panel>
  );
}

export default Settings;
