import { songsData } from "./musicData";
import { useState, useRef, useEffect } from "react";
import ReactAudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Playlist from "./Playlist";
import cd from "../src/images/cd.png";
import NextSongs from "./NextSongs";
import {
  TbPlayerTrackPrevFilled,
  TbPlayerTrackNextFilled,
  TbRewindForward15,
  TbRewindBackward15,
} from "react-icons/tb";
import { RiResetLeftFill } from "react-icons/ri";
import Modal from "react-modal";

Modal.setAppElement("#root");

function MusicPlayer({ openPlaylist, setOpenPlaylist }) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [filteredSongs, setFilteredSongs] = useState(songsData);
  const [allSongs, setAllSongs] = useState(() => {
    const savedSongs = localStorage.getItem("allSongs");
    return savedSongs ? JSON.parse(savedSongs) : songsData;
  });
  const audioRef = useRef(null);
  const [newSong, setNewSong] = useState({
    songName: "",
    singer: "",
    imageFile: null,
    audioFile: null,
  });
  const [uploading, setUploading] = useState(false);
  const [isAddSongModalOpen, setIsAddSongModalOpen] = useState(false);

  const uploadToCloudinary = async (file, resourceType) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "music_preset");
    formData.append("resource_type", resourceType);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dbcsebbfs/${resourceType}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log(`Uploaded ${resourceType} URL:`, data.secure_url);
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      return null;
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setNewSong((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleAddSong = async (e) => {
    e.preventDefault();
    setUploading(true);

    const imageUrl = newSong.imageFile
      ? await uploadToCloudinary(newSong.imageFile, "image")
      : null;
    const audioUrl = newSong.audioFile
      ? await uploadToCloudinary(newSong.audioFile, "video")
      : null;

    if (imageUrl && audioUrl) {
      const newSongEntry = {
        id: Math.random(),
        imageSrc: imageUrl,
        singer: newSong.singer,
        songName: newSong.songName,
        audio: audioUrl,
      };

      setAllSongs((prev) => [newSongEntry, ...prev]);
      setFilteredSongs((prev) => [newSongEntry, ...prev]);
      setCurrentSongIndex(0);
      setIsAddSongModalOpen(false);
      setNewSong({
        songName: "",
        singer: "",
        imageFile: null,
        audioFile: null,
      });
    } else {
      alert("Failed to upload files. Please check the console for errors.");
    }

    setUploading(false);
  };

  const handleChange = (value) => {
    const filteredSongs = allSongs.filter(
      (song) =>
        song.songName.toLowerCase().includes(value.toLowerCase()) ||
        song.singer.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSongs(filteredSongs);
  };

  useEffect(() => {
    const songsJson = JSON.stringify(allSongs);
    localStorage.setItem("allSongs", songsJson);
  }, [allSongs]);

  function nextSong() {
    setCurrentSongIndex((prev) =>
      prev === allSongs.length - 1 ? 0 : prev + 1
    );
  }

  function prevSong() {
    setCurrentSongIndex((prev) =>
      prev === 0 ? allSongs.length - 1 : prev - 1
    );
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

  function pausePlayback() {
    if (audioRef.current && audioRef.current.audio.current) {
      audioRef.current.audio.current.pause();
      audioRef.current.audio.current.src = "";
    }
  }

  function openAddSongModal() {
    setIsAddSongModalOpen(true);
  }

  function closeAddSongModal() {
    setIsAddSongModalOpen(false);
    setNewSong({ songName: "", singer: "", imageFile: null, audioFile: null });
  }

  useEffect(() => {
    if (audioRef.current && allSongs.length > 0 && currentSongIndex >= 0) {
      audioRef.current.audio.current.src =
        allSongs[currentSongIndex]?.audio || "";
      audioRef.current.audio.current.load();
      audioRef.current.audio.current.play().catch((error) => {
        console.error("Playback error:", error);
      });
    } else if (audioRef.current) {
      pausePlayback();
    }
  }, [currentSongIndex, allSongs]);

  return (
    <div className="container">
      {openPlaylist && (
        <Playlist
          songId={allSongs[currentSongIndex]?.id}
          setFilteredSongs={setFilteredSongs}
          allSongs={allSongs}
          setAllSongs={setAllSongs}
          setOpenPlaylist={setOpenPlaylist}
          setCurrentSongIndex={setCurrentSongIndex}
          filteredSongs={filteredSongs}
          pausePlayback={pausePlayback}
        />
      )}

      <button onClick={openAddSongModal} className="add-song-button">
        ➕ Add New Song
      </button>

      <div className="currentSongContainer">
        <div className="cd-container">
          <img className="cd" src={cd} alt="" />
          <img
            className="image-in-cd"
            src={allSongs[currentSongIndex]?.imageSrc}
            alt={allSongs[currentSongIndex]?.songName || "Song Image"}
            onError={(e) => {
              e.target.src = cd;
              console.log("Image load failed, using fallback:", cd);
            }}
          />
        </div>
        <div className="currentSongs">
          <h1>{allSongs[currentSongIndex]?.songName || "No Song"}</h1>
          <p>{allSongs[currentSongIndex]?.singer || "Unknown Artist"}</p>
          <div className="controls">
            <button onClick={fastBackwards}>
              <TbRewindBackward15 />
            </button>
            <button onClick={prevSong}>
              <TbPlayerTrackPrevFilled />
            </button>

            {allSongs[currentSongIndex]?.audio ? (
              <ReactAudioPlayer
                ref={audioRef}
                src={allSongs[currentSongIndex]?.audio}
                autoPlay
                onEnded={nextSong}
                showJumpControls={false}
                showSkipControls={false}
                layout="stacked-reverse"
                onError={(e) => console.log("Audio load failed:", e)}
              />
            ) : (
              <p>Loading audio...</p>
            )}

            <button onClick={nextSong}>
              <TbPlayerTrackNextFilled />
            </button>
            <button onClick={fastForward}>
              <TbRewindForward15 />
            </button>
          </div>
          <button>
            <RiResetLeftFill className="reset" onClick={resetSong} />
          </button>
        </div>
        <div className="big pinpoint-image">
          <img
            src={allSongs[currentSongIndex]?.imageSrc}
            alt={allSongs[currentSongIndex]?.songName || "Song Image"}
            onError={(e) => {
              e.target.src = cd;
              console.log("Big image load failed, using fallback:", cd);
            }}
          />
        </div>
      </div>

      <NextSongs
        setCurrentSongIndex={setCurrentSongIndex}
        songsData={allSongs}
        currentSongIndex={currentSongIndex}
      />

      <Modal
        isOpen={isAddSongModalOpen}
        onRequestClose={closeAddSongModal}
        className="add-song-modal"
        overlayClassName="add-song-modal-overlay"
      >
        <h2>Add New Song</h2>
        <form onSubmit={handleAddSong} className="add-song-form">
          <label htmlFor="singer">Singer's Name</label>
          <input
            type="text"
            name="singer"
            placeholder="Singer"
            value={newSong.singer}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="songName,">Song's name</label>
          <input
            type="text"
            name="songName"
            placeholder="Song Name"
            value={newSong.songName}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="imageFile">Attach the image</label>
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            onChange={handleInputChange}
            required
          />
          <label htmlFor="audioFile">Attach the audio</label>
          <input
            type="file"
            name="audioFile"
            accept="audio/*"
            onChange={handleInputChange}
            required
          />
          <br />
          <button type="submit" disabled={uploading}>
            {uploading ? "Uploading..." : "Add Song"}
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default MusicPlayer;
