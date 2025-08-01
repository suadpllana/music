import React from 'react'
import {useState , useEffect} from "react"

const NextSongs = ({songsData , currentSongIndex, setCurrentSongIndex}) => {
    const [nextSongs , setNextSongs] = useState([])

    useEffect(() => {
     
        setNextSongs(songsData.slice(currentSongIndex + 1, currentSongIndex + 6))
    } , [currentSongIndex, songsData])

      function playSong(id) {
    const index = songsData.findIndex((song) => song.id === id);
    if (index !== -1) {
      setCurrentSongIndex(index);

    
    } else {
      console.error(`Song with id ${id} not found in allSongs`);
    }
  }


  return (
    <div className="next-songs-container">
      {nextSongs.length > 1 && <h2>Next Songs</h2>}
      {nextSongs.length === 1 && <h2>Next Song</h2>}
    
    {nextSongs.length > 0 ? 
    nextSongs.map((nextSong, index) => (
        <div key={nextSong.id} onClick={() => playSong(nextSong.id)}>
             <img  src={nextSong.imageSrc}/>  
             <p>{nextSong.singer} - {nextSong.songName}</p>
        </div>
       
    ))    
 : <p>No more songs</p>}

    </div>
  )
}

export default NextSongs
