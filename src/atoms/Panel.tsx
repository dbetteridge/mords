type Props = {
  children: any[];
  classStrings?: string;
};

const Panel = ({ children, classStrings }: Props) => {
  return (
    <div
      class={`flex flex-col flex-wrap items-center justify-between calc(w-screen-10rem) h-96 rounded border-2 border-slate-200 fixed top-20 bg-white z-20 m-5 p-5 ${classStrings}`}
    >
      {children}
    </div>
  );
};

export default Panel;
