import React from 'react'
import {useState} from "react"
import { FaPlay } from "react-icons/fa";
import { GiLoveSong } from "react-icons/gi"
const Sidebar = ({setOpenPlaylist}) => {
  
     
   return (
    <div  className="sidebar">
        <button onClick={() => setOpenPlaylist(true)}><FaPlay/> Open Playlist</button>
        <button  onClick={() => setOpenPlaylist(false)}><GiLoveSong/> Open Current Song</button>
    </div>
  )
}

export default Sidebar 
