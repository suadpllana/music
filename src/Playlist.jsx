import React, { useEffect, useRef } from "react";

const Playlist = ({
  songId,
  songsData,
  setFilteredSongs,
  filteredSongs,
  setCurrentSongIndex,
  handleChange,
  setOpenPlaylist,
}) => {
  const currentSongRef = useRef(null);


  useEffect(() => {
    if (currentSongRef.current) {
      currentSongRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [setOpenPlaylist]); 

  function playSong(id) {
    setCurrentSongIndex(id);
    setOpenPlaylist(false);
    setFilteredSongs(songsData);
    console.log(songsData.length);
  }


  function closeModal() {
    setOpenPlaylist(false);
    setFilteredSongs(songsData);
  }
  function handleChange(value) {
    const filteredSongs = songsData.filter((song) =>
      song.songName.toLowerCase().includes(value.toLowerCase())
     || song.singer.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSongs(filteredSongs);
  }

  return (
    <div className="song-container" onClick={closeModal}>
      <div className="allSongs" onClick={(e) => e.stopPropagation()}>
        <h1>My Playlist</h1>
        <input
          type="text"
         onChange={(e) => handleChange(e.target.value)}
          placeholder="Search the playlist"
        />
        {filteredSongs?.length > 0 ? (
          filteredSongs.map((song) => (
            <div
              key={song.id}
              ref={song.id === songId ? currentSongRef : null} 
              onClick={() => playSong(song.id)}
              className={song.id === songId ? "songs black" : "songs"}
            >
              <img src={song.imageSrc} alt={`${song.songName} cover`} />
              <p>
                {song.singer} - {song.songName}
              </p>
            </div>
          ))
        ) : (
          <p>The song was not found</p>
        )}
        <p className="closeModal" onClick={closeModal}>
          x
        </p>
      </div>
    </div>
  );
};

export default Playlist;
