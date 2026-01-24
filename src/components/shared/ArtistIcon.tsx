const ArtistIcon = ({
  arTistImg,
  artistTitle,
}: {
  arTistImg: string;
  artistTitle: string;
}) => {
  return (
    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-transparent">
      <img
        src={arTistImg}
        alt={artistTitle}
        className="w-full h-full rounded-full"
      />
    </div>
  );
};

export default ArtistIcon;
