interface ChipCardProps {
  title: string;
  selected?: boolean;
  onClick?: () => void;
}
const ChipCard = ({ title, selected = false, onClick }: ChipCardProps) => {
  return (
    <button
      className={`px-4 h-8 rounded-full text-sm font-medium transition cursor-pointer ${
        selected
          ? "bg-white text-black"
          : "bg-white/10 text-white/80 hover:bg-white/15 hover:text-white"
      }`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default ChipCard;
