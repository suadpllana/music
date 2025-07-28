import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
Modal.setAppElement("#root");

const Playlist = ({
  songId,
  allSongs,
  setFilteredSongs,
  filteredSongs,
  setCurrentSongIndex,
  setAllSongs,
  setOpenPlaylist,
  pausePlayback,
}) => {
  const currentSongRef = useRef(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [songToDelete, setSongToDelete] = useState(null);

  useEffect(() => {
    setFilteredSongs(allSongs);
  }, [allSongs, setFilteredSongs]);

  useEffect(() => {
    if (currentSongRef.current) {
      currentSongRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [setOpenPlaylist]);

  function playSong(id) {
    const index = allSongs.findIndex((song) => song.id === id);
    if (index !== -1) {
      setCurrentSongIndex(index);
      setOpenPlaylist(false);
      setFilteredSongs(allSongs);
    
    } else {
      console.error(`Song with id ${id} not found in allSongs`);
    }
  }

  function closeModal() {
    setOpenPlaylist(false);
    setFilteredSongs(allSongs);
  }

  function handleChange(value) {
    const filteredSongs = allSongs.filter(
      (song) =>
        song.songName.toLowerCase().includes(value.toLowerCase()) ||
        song.singer.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSongs(filteredSongs);
  }

  function openDeleteModal(id) {
    setSongToDelete(id);
    setIsDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setIsDeleteModalOpen(false);
    setSongToDelete(null);
  }

  function confirmDelete() {
    if (songToDelete) {
      console.log("Before deletion - songId:", songId, "songToDelete:", songToDelete, "allSongs:", allSongs);
      const updatedSongs = allSongs.filter((song) => song.id !== songToDelete);
      const deletedSongIndex = allSongs.findIndex((song) => song.id === songToDelete);
      const currentSongIndex = allSongs.findIndex((song) => song.id === songId);

      console.log("Indices - deletedSongIndex:", deletedSongIndex, "currentSongIndex:", currentSongIndex);

      setAllSongs(updatedSongs);
      setFilteredSongs(updatedSongs);
      localStorage.setItem("allSongs", JSON.stringify(updatedSongs));

      if (songToDelete === songId) {
        console.log("Deleting current song");
        pausePlayback(); 
        if (updatedSongs.length > 0) {
          const newIndex = deletedSongIndex >= updatedSongs.length ? 0 : deletedSongIndex;
          console.log("New index:", newIndex);
          setCurrentSongIndex(newIndex);
        } else {
          console.log("No songs left, setting index to -1");
          setCurrentSongIndex(-1);
        }
      } else if (currentSongIndex !== -1) {
        if (deletedSongIndex < currentSongIndex) {
          console.log("Adjusting index to:", currentSongIndex - 1);
          setCurrentSongIndex(currentSongIndex - 1);
        }
      }

      console.log("After deletion - updatedSongs:", updatedSongs);
      toast.success("Song deleted successfully");
      closeDeleteModal();
    }
  }

  return (
    <div className="song-container" onClick={closeModal}>
      <div className="allSongs" onClick={(e) => e.stopPropagation()}>
        <h1>My Playlist</h1>
        <h3 style={{ margin: "0" }}>{filteredSongs?.length} Songs</h3>
        <input
          type="text"
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search the playlist"
        />
        {filteredSongs?.length > 0 ? (
          filteredSongs.map((song) => (
            <div
              key={song.id}
              ref={song.id === songId ? currentSongRef : null}
              onClick={() => playSong(song.id)}
              className={song.id === songId ? "songs black" : "songs"}
            >
              <img src={song.imageSrc} alt={`${song.songName} cover`} />
              <p>
                {song.singer} - {song.songName}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openDeleteModal(song.id);
                }}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>The song was not found</p>
        )}
        <p className="closeModal" onClick={closeModal}>
          x
        </p>
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        style={{
          content: {
            zIndex: 100000,
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "white",
            border: "1px solid #ccc",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          },
          overlay: {
            zIndex: 99999,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
        }}
        contentLabel="Confirm Delete Modal"
      >
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this song?</p>
        <div>
          <button onClick={confirmDelete} className="confirm-button">
            Yes
          </button>
          <button onClick={closeDeleteModal} className="cancel-button">
            No
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Playlist;