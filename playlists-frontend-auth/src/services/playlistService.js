// This is a js file

import axios from "axios";

const API_URL = "/api/playlists";

const getPlaylists = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}

const postPlaylist = async (playlist, token) => {
    const auth = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    const response = await axios.post(API_URL, playlist, auth);
    return response.data;
}

const likePlaylist = async (playlist) => {
    const response = await axios.put(API_URL + "/likes/" + playlist.id, playlist);
    return response.data;
}

const removePlaylist = async (playlist, token) => {
    const auth = {
        headers: {
            Authorization: "Bearer " + token
        }
    };
    const response = await axios.delete(API_URL + "/" + playlist.id, auth);
    return response.data;
}

export default { getPlaylists, postPlaylist, likePlaylist, removePlaylist };