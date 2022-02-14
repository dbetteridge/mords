type Props = {
  key: string;
  letter: string;
  selected?: boolean;
  invalid?: boolean;
  valid?: boolean;
  onClick: any;
};

const Tile = ({ key, letter, selected, valid, invalid, onClick }: Props) => {
  return (
    <div
      key={key}
      class={`flex flex-row justify-center items-center w-12 h-12 border-2 rounded  m-2 ${
        selected
          ? "border-3 border-black bg-slate-500"
          : "border-slate-300 bg-white-0"
      } ${invalid ? "bg-red-600" : "bg-white-0"} ${
        invalid ? "text-white" : "text-black"
      } ${valid ? "bg-green-600" : "bg-white-0"} ${
        valid ? "text-white" : "text-black"
      } uppercase`}
      onClick={onClick}
    >
      <div class="text-4xl">{letter}</div>
    </div>
  );
};

export default Tile;
