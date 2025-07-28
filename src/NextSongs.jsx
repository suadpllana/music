import React from 'react'
import {useState , useEffect} from "react"

const NextSongs = ({songsData , currentSongIndex, setCurrentSongIndex}) => {
    const [nextSongs , setNextSongs] = useState([])

    useEffect(() => {
     
        setNextSongs(songsData.slice(currentSongIndex + 1, currentSongIndex + 6))
        console.log(songsData)
        console.log(nextSongs)
    } , [currentSongIndex])

  return (
    <div className="next-songs-container">
      {nextSongs.length > 1 && <h2>Next Songs</h2>}
      {nextSongs.length === 1 && <h2>Next Song</h2>}
    
    {nextSongs.length > 0 ? 
    nextSongs.map((nextSong, index) => (
        <div key={nextSong.id} onClick={() => setCurrentSongIndex(nextSong.id - 1)}>
             <img  src={nextSong.imageSrc}/>  
             <p>{nextSong.singer} - {nextSong.songName}</p>
        </div>
       
    ))    
 : <p>No more songs</p>}

    </div>
  )
}

export default NextSongs
