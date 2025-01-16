import React from 'react'

const Playlist = ({songsData, setFilteredSongs ,filteredSongs, setCurrentSongIndex, handleChange, setOpenPlaylist }) => {
    
    function playSong(id){
        setCurrentSongIndex(id)
        setOpenPlaylist(false)
        setFilteredSongs(songsData)
        console.log(songsData.length)
    }
    function closeModal(){
        setOpenPlaylist(false)
    }


  return (
    <div className="song-container" onClick={closeModal}>
 <div className="allSongs" onClick={(e) => e.stopPropagation()}>
             
             <h1>My Playlist</h1>
             <input type="text" onChange={(e) => handleChange(e.target.value)}  placeholder="Search  the playlist"/>    
             {filteredSongs.length > 0 ? filteredSongs.map((song) => (
               <div key={song.id} onClick={() => 
                playSong(song.id)} className="songs">
                    <img  src={song.imageSrc}/>
                 <p>{song.singer} - {song.songName}</p>
               </div>
             )) : <p>The song was not found</p>}
           </div>
    </div>
    
   
  )
}

export default Playlist
