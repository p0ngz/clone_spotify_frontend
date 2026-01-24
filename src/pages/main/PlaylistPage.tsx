import PlaylistDetail from "../../components/PlaylistDetail";
import TableListSong from "../../components/shared/TableListSong";

// Image array for looping
const images = [
  "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
  "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452",
  "https://i.scdn.co/image/ab67616d0000b2737fcead687e99583072cc217b",
  "https://i.scdn.co/image/ab67616d0000b2731f6a2a40bb692936879db730",
];

// Mock playlist songs data
const playlistDetail = {
  playlistId: 1,
  title: "The Sweet Playlist",
  description:
    "A collection of sweet and soothing tracks to brighten your day.",
  coverImage:
    "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
  createdBy: "Pongsatorn Tassaro",
  totalSong: 12,
  totalDuration: 75,
};
const playlistSongs = [
  {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    date: "2019-11-29",
    duration: "3:22",
    image: images[0],
  },
  {
    id: 2,
    title: "Save Your Tears",
    artist: "The Weeknd",
    album: "After Hours",
    date: "2020-03-20",
    duration: "3:35",
    image: images[1],
  },
  {
    id: 3,
    title: "Starboy",
    artist: "The Weeknd, Daft Punk",
    album: "Starboy",
    date: "2016-11-25",
    duration: "3:50",
    image: images[2],
  },
  {
    id: 4,
    title: "Die For You",
    artist: "The Weeknd",
    album: "Starboy",
    date: "2016-11-25",
    duration: "4:20",
    image: images[3],
  },
  {
    id: 5,
    title: "The Hills",
    artist: "The Weeknd",
    album: "Beauty Behind the Madness",
    date: "2015-08-28",
    duration: "4:02",
    image: images[0],
  },
  {
    id: 6,
    title: "Can't Feel My Face",
    artist: "The Weeknd",
    album: "Beauty Behind the Madness",
    date: "2015-08-28",
    duration: "3:33",
    image: images[1],
  },
  {
    id: 7,
    title: "Earned It",
    artist: "The Weeknd",
    album: "Beauty Behind the Madness",
    date: "2015-08-28",
    duration: "4:37",
    image: images[2],
  },
  {
    id: 8,
    title: "I Feel It Coming",
    artist: "The Weeknd, Daft Punk",
    album: "Starboy",
    date: "2016-11-25",
    duration: "4:29",
    image: images[3],
  },
  {
    id: 9,
    title: "Call Out My Name",
    artist: "The Weeknd",
    album: "My Dear Melancholy,",
    date: "2018-03-30",
    duration: "3:48",
    image: images[0],
  },
  {
    id: 10,
    title: "Often",
    artist: "The Weeknd",
    album: "Beauty Behind the Madness",
    date: "2015-08-28",
    duration: "4:09",
    image: images[1],
  },
  {
    id: 11,
    title: "Heartless",
    artist: "The Weeknd",
    album: "After Hours",
    date: "2019-11-27",
    duration: "3:18",
    image: images[2],
  },
  {
    id: 12,
    title: "In Your Eyes",
    artist: "The Weeknd",
    album: "After Hours",
    date: "2020-03-20",
    duration: "3:57",
    image: images[3],
  },
];

const PlaylistPage = () => {
  return (
    <div id="playlist-page" className="w-full">
      <div id="playlist-detail-container" className="w-full h-64">
        <PlaylistDetail
          playlistId={playlistDetail.playlistId}
          title={playlistDetail.title}
          description={playlistDetail.description}
          coverImage={playlistDetail.coverImage}
          createdBy={playlistDetail.createdBy}
        //   createdAt={playlistDetail.createdAt}
          totalSong={playlistDetail.totalSong}
          totalDuration={playlistDetail.totalDuration}
        />
      </div>
      <div id="playlist-table" className="w-full">
        <TableListSong isPlaylistPage={true} songs={playlistSongs} />
      </div>
    </div>
  );
};

export default PlaylistPage;
