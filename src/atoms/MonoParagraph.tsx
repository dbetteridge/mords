type Props = {
  children: any;
  classString?: string;
};

const MonoParagraph = ({ children, classString }: Props) => {
  return <p class={`mono ${classString}`}>{children}</p>;
};

export default MonoParagraph;
