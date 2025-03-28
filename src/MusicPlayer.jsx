import { songsData } from "./musicData";
import { useState, useRef, useEffect } from "react";
import ReactAudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css"; 

import Playlist from "./Playlist";
import cd from "../src/images/cd.png";
import NextSongs from "./NextSongs";
import { TbPlayerTrackPrevFilled, TbPlayerTrackNextFilled, TbRewindForward15, TbRewindBackward15 } from "react-icons/tb";
import { RiResetLeftFill } from "react-icons/ri";

function MusicPlayer({ openPlaylist, setOpenPlaylist }) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [filteredSongs, setFilteredSongs] = useState(songsData);
  const audioRef = useRef(null);
 

  function nextSong() {
    setCurrentSongIndex((prev) => (prev === songsData.length - 1 ? 0 : prev + 1));
  }

  function prevSong() {
    setCurrentSongIndex((prev) => (prev === 0 ? songsData.length - 1 : prev - 1));
  }

  function fastForward() {
    if (audioRef.current) audioRef.current.audio.current.currentTime += 15;
  }

  function fastBackwards() {
    if (audioRef.current) audioRef.current.audio.current.currentTime -= 15;
  }

  function resetSong() {
    if (audioRef.current) audioRef.current.audio.current.currentTime = 0;
  }

  return (
    <div className="container">
      {openPlaylist && (
        <Playlist
          songId={songsData[currentSongIndex]?.id}
          setFilteredSongs={setFilteredSongs}
          songsData={songsData}
          setOpenPlaylist={setOpenPlaylist}
          setCurrentSongIndex={setCurrentSongIndex}
          filteredSongs={filteredSongs}
        />
      )}

      <div className="currentSongContainer">
        <div className="cd-container">
          <img className="cd" src={cd} alt="" />
          <img className="image-in-cd" src={songsData[currentSongIndex].imageSrc} alt="" />
        </div>
        <div className="currentSongs">
          <h1>{songsData[currentSongIndex].songName}</h1>
          <p>{songsData[currentSongIndex].singer}</p>
          <div className="controls">
            <button onClick={fastBackwards}><TbRewindBackward15 /></button>
            <button onClick={prevSong}><TbPlayerTrackPrevFilled /></button>

            {songsData[currentSongIndex].audio ? (
              <ReactAudioPlayer
              ref={audioRef}
              src={songsData[currentSongIndex].audio}
              autoPlay
              onEnded={nextSong}
             
              showJumpControls={false} 
              showSkipControls={false} 
              layout="stacked-reverse"
            
            /> ) : <p>Loading audio</p>
              }
            

            <button onClick={nextSong}><TbPlayerTrackNextFilled /></button>
            <button onClick={fastForward}><TbRewindForward15 /></button>
          </div>
          <button><RiResetLeftFill className="reset" onClick={resetSong} /></button>
        </div>
        <div className="big-image">
          <img src={songsData[currentSongIndex].imageSrc} alt="" />
        </div>
      </div>

      <NextSongs setCurrentSongIndex={setCurrentSongIndex} songsData={songsData} currentSongIndex={currentSongIndex} />
    </div>
  );
}

export default MusicPlayer;
