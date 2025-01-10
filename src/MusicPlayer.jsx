import { songsData } from "./musicData";
import { useState, useRef, useEffect } from 'react';

function MusicPlayer() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [audio, setAudio] = useState(songsData[currentSongIndex].audio);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSongs, setFilteredSongs] = useState(songsData);
  const audioRef = useRef(null);

  function nextSong() {
    if (currentSongIndex === songsData.length - 1) {
      setCurrentSongIndex(0);
    } else {
      setCurrentSongIndex(currentSongIndex + 1);
    }
  }

  useEffect(() => {
    audioRef.current.play();
  }, [currentSongIndex]);

  function prevSong() {
    if (currentSongIndex <= 0) {
      setCurrentSongIndex(songsData.length - 1);
    } else {
      setCurrentSongIndex(currentSongIndex - 1);
    }
  }
  function handleChange(query){
    const filteredQuery = query.toLowerCase().trim();
 
    setFilteredSongs(
      songsData.filter(song =>
        song.songName.toLowerCase().includes(filteredQuery) || song.singer.toLowerCase().includes(filteredQuery)
      )
    )


  }



 
 
  return (
    <>
      <div className="container">
       

        <div className="allSongs">
          <input type="text" onChange={(e) => handleChange(e.target.value)}  placeholder="Search  the playlist"/>
          <h1>My Playlist</h1>
          {filteredSongs.length > 0 ? filteredSongs.map((song) => (
            <div key={song.id} onClick={() => setCurrentSongIndex(song.id)} className="songs">
              <p>{song.singer} - {song.songName}</p>
            </div>
          )) : <p>The song was not found</p>}
        </div>

        <div className="currentSongs">
          <h1>Current Song</h1>
          <p>{songsData[currentSongIndex].singer}</p>
          <p>{songsData[currentSongIndex].songName}</p>
          <img src={songsData[currentSongIndex].imageSrc} alt="" />
          <div className="controls">
            <button onClick={prevSong}>⏮️</button>
            <audio onEnded={nextSong} ref={audioRef} src={songsData[currentSongIndex].audio} controls></audio>
            <button onClick={nextSong}>⏭️</button>
          
          </div>
        </div>
      </div>
    </>
  );
}

export default MusicPlayer;
