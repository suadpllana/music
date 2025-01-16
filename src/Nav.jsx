import React from 'react'
import { FaPlay } from "react-icons/fa";
import { GiLoveSong } from "react-icons/gi"
const Nav = ({setOpenPlaylist}) => {
  return (
    <nav className="nav-container">
    <button onClick={() => setOpenPlaylist(true)}><FaPlay/> Open Playlist</button>
    <button onClick={() => setOpenPlaylist(false)}><GiLoveSong/> Open current song</button>
    </nav>
  )
}

export default Nav
