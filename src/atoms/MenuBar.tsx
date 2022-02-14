import Icon from "./Icon";

type Props = {
  toggleSettings: any;
  goHome: any;
  showStats: any;
};

const MenuBar = ({ toggleSettings, goHome, showStats }: Props) => {
  return (
    <div class="flex flex-row h-10 w-screen justify-between items-center p-2 border border-slate-300">
      <Icon icon="home" onClick={() => goHome()} />
      <Icon icon="notepad" onClick={() => showStats()} />
      <Icon icon="settings" onClick={() => toggleSettings()} />
    </div>
  );
};

export default MenuBar;
