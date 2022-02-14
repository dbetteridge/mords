type Props = {
  icon: string;
  onClick: any;
};

const Icon = ({ icon, onClick }: Props) => {
  return (
    <img class="h-6 w-6" src={`${icon}.png`} onClick={onClick} alt={icon} />
  );
};

export default Icon;
