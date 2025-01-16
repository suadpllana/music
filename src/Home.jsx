import React from 'react'
import MusicPlayer from './MusicPlayer'
import Sidebar from './Sidebar'
import Nav from './Nav'
import {useState} from "react"
const Home = () => {
    const [openPlaylist , setOpenPlaylist] = useState(false);
    const [openCurrentSong , setOpenCurrentSong] = useState(true)
  
    return (
    <div className="home">
      <Nav setOpenPlaylist={setOpenPlaylist}/>
        <Sidebar  setOpenPlaylist={setOpenPlaylist}/>
      <MusicPlayer  setOpenPlaylist={setOpenPlaylist} openPlaylist={openPlaylist}/>
    </div>
  )
}

export default Home
