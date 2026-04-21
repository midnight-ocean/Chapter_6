import React from "react";
import { useState, useEffect } from "react";

import "./App.css";
import PlaylistDisplay from "./components/PlaylistDisplay";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";

import PlaylistService from "./services/playlistService";
import LoginService from "./services/loginService";


const App = () => {
  const [playlists, setPlaylists] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const [playlistName, setPlaylistName] = useState("");
  const [playlistCreator, setPlaylistCreator] = useState("");
  const [playlistSongs, setPlaylistSongs] = useState("");
  const [playlistLikes, setPlaylistLikes] = useState("");

  // Start procedures
  useEffect(() => {
    PlaylistService.getPlaylists().then((updatedPlaylists) => setPlaylists(updatedPlaylists));
    
    const storedUser = localStorage.getItem("userCredentials");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loginUser = await LoginService.login({username, password});
      setNotification({type: "info", message: "Login successful!"});
      setUser(loginUser);
      localStorage.setItem("userCredentials", JSON.stringify(loginUser));
    } 
    catch (error) {
      setNotification({type: "warning", message: "Login failed!"});
    }
    setTimeout(() => {
      setNotification(null);
    }, 3000);
    setUsername("");
    setPassword("");
  }

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      setUser(null);
      localStorage.removeItem("userCredentials");
      setNotification({type: "info", message: "Logout successful!"})
    }
    catch (error) {
      setNotification({type: "warning", message: "Logout failed (which is weird)!"})
    }
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  }

  const handleAddition = async (event) => {
    event.preventDefault();
    try {
      const newPlaylist = {
        name: playlistName,
        creator: playlistCreator,
        numOfSongs: playlistSongs,
        likes: playlistLikes
      }
      const playlistAddition = await PlaylistService.postPlaylist(newPlaylist, user.token);
      setPlaylists([...playlists, playlistAddition]);
      setNotification({type: "info", message: "Playlist " + playlistName + " was successfully created!"})
    }
    catch (error) {
      setNotification({type: "warning", message: error.response.data.error})
    }
    setTimeout(() => {
      setNotification(null);
    }, 3000);
    setPlaylistName("");
    setPlaylistCreator("");
    setPlaylistSongs("");
    setPlaylistLikes("");
  }

  const handleLike = async (event, playlist) => {
    event.preventDefault();
    try {
      const likedPlaylist = await PlaylistService.likePlaylist(playlist);
      const updatedPlaylists =  playlists.map(
      (pList) => {
        if (pList.id === playlist.id) {
          return {
            ...pList,
            likes: pList.likes + 1
          }
        }
        return pList;
      }
    )
    setPlaylists(updatedPlaylists);
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleRemove = async (event, playlist) => {
    event.preventDefault();
    try {
      const removedPlaylist = await PlaylistService.removePlaylist(playlist, user.token);
      console.log(removedPlaylist)
      setPlaylists(
        playlists.filter((iterPlaylist) => {
          return iterPlaylist.id != playlist.id
        })
      );
      setNotification({type: "info", message: "Playlist " + playlist.name + " was successfully removed!"})
    }
    catch (error) {
      setNotification({type: "warning", message: error.response.data.error})
    }
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  }
  return (
    <div>
      {notification && <Notification notification={notification} />}
      <h2>Playlists Application</h2>
      {user ? 
        (<PlaylistDisplay username={user.username} playlists={playlists}
          playlistName={playlistName} playlistCreator={playlistCreator} playlistSongs={playlistSongs} playlistLikes={playlistLikes}
          setPlaylistName={setPlaylistName} setPlaylistCreator={setPlaylistCreator} setPlaylistSongs={setPlaylistSongs} setPlaylistLikes={setPlaylistLikes}
          handleLogout={handleLogout} handleAddition={handleAddition} handleLike={handleLike} handleRemove={handleRemove}/>) :
        (<LoginForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin}/>)
      }
    </div>
  )
}

export default App;