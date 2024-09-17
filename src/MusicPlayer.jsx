import { songsData } from "./musicData"
import { useState, useRef , useEffect } from 'react';




function MusicPlayer(){


    const [currentSongIndex, setCurrentSongIndex] = useState(0)
    const [audio ,setAudio] = useState(songsData[currentSongIndex].audio)
    const audioRef = useRef(null)



        function nextSong(){
            if(currentSongIndex == songsData.length - 1){
                setCurrentSongIndex(0)
            }
            else{
                setCurrentSongIndex(currentSongIndex + 1)
            }
        }

        useEffect(() => {
           
              audioRef.current.play(); 
           
          }, [currentSongIndex]); 


        function prevSong(){
            if(currentSongIndex <= 0) {
                setCurrentSongIndex(songsData.length - 1)
            }
            else{
                setCurrentSongIndex(currentSongIndex - 1)
            }
        }

       
    return(
        <>
        <div className="container">
            <h1>My PlayList</h1>
            <p>{songsData[currentSongIndex].singer}</p>
            <p>{songsData[currentSongIndex].songName}</p>
            <img src={songsData[currentSongIndex].imageSrc} alt="" />
            <div className="controls">
            <button onClick={prevSong}>⏮️</button>
            <audio onEnded={nextSong} ref={audioRef} src={songsData[currentSongIndex].audio} controls></audio>
            <button onClick={nextSong}>⏭️</button>
            </div>
           
        </div>
        </>
    )
}


export default MusicPlayer