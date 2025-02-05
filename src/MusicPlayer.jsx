import { songsData } from "./musicData";
import { useState, useRef, useEffect } from 'react';
import Playlist from "./Playlist";
import cd from "../src/images/cd.png"
import NextSongs from "./NextSongs";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbRewindForward15 } from "react-icons/tb";
import { TbRewindBackward15 } from "react-icons/tb";
import { RiResetLeftFill } from "react-icons/ri";
function MusicPlayer({openPlaylist , setOpenPlaylist}) {
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
    if(filteredQuery === ""){
      setFilteredSongs(songsData)
      return;
    }
    setFilteredSongs(
      songsData.filter(song =>
        song.songName.toLowerCase().includes(filteredQuery) || song.singer.toLowerCase().includes(filteredQuery)
      )
    )
  }
  function fastForward(){
    audioRef.current.currentTime += 15
  }
  function fastBackwards(){
  
    audioRef.current.currentTime -= 15
  }

  function resetSong(){
    audioRef.current.currentTime = 0; 
  }

 
 
  return (
    <>
      <div className="container">
     
       
    {openPlaylist &&
     <Playlist songId={songsData[currentSongIndex]?.id} setFilteredSongs={setFilteredSongs} songsData={songsData} setOpenPlaylist={setOpenPlaylist}  handleChange={handleChange} filteredSongs={filteredSongs} setCurrentSongIndex={setCurrentSongIndex}/>
    }
        
      
        <div className="currentSongContainer">
          <div className="cd-container">
            <img className="cd" src={cd} alt="" />
            <img className="image-in-cd" src={songsData[currentSongIndex].imageSrc} alt="" />
           
          </div>
          <div className="currentSongs">
      
         <h1>{songsData[currentSongIndex].songName}</h1>
         <p>{songsData[currentSongIndex].singer}</p>
         <div className="controls">
          <button onClick={fastBackwards}><TbRewindBackward15/></button>
           <button onClick={prevSong}><TbPlayerTrackPrevFilled/></button>
           <audio onEnded={nextSong} ref={audioRef} src={songsData[currentSongIndex].audio} controls></audio>
           
           <button onClick={nextSong}><TbPlayerTrackNextFilled/></button>
            <button onClick={fastForward}><TbRewindForward15/></button>
         
          
         </div>
         <button><RiResetLeftFill className="reset" onClick={resetSong} /></button>
       </div>
       <div className="big-image">
       <img src={songsData[currentSongIndex].imageSrc} alt="" />
      
       </div>
        </div>
         
          <NextSongs setCurrentSongIndex={setCurrentSongIndex} songsData={songsData} currentSongIndex={currentSongIndex}/>
        
      </div>
    </>
  );
}

export default MusicPlayer;
