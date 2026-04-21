import { useState } from "react";

import Section from "./Section";


const Playlist = ({ playlist, handleLike, handleRemove }) => {
    const [isEnabled, setIsEnabled] = useState(true);
    return (
        <Section componentTitle={playlist.name + " by " + playlist.creator}>
            {
                isEnabled ?
                (<div>
                    {playlist.numOfSongs} songs
                    <br />
                    {playlist.likes} likes {""} <button type="button" onClick={(event) => handleLike(event, playlist)}>Like</button>
                    <br />
                    Added by {playlist.user.username} {""} <button type="button" onClick={(event) => handleRemove(event, playlist)}>Remove the playlist</button>
                    <br />
                    <button onClick={() => {setIsEnabled(false)}}>Hide Details</button>
                </div>) :
                (
                    <div>
                        <button onClick={() => {setIsEnabled(true)}}>Show Details</button>
                    </div>
                )
            }
            
        </Section>
    )
}

const LogoutField = ( { username, handleLogout } ) => {
    return (
        <div>
            Howdy {username}, <button onClick={handleLogout}>Log Out</button>
        </div>
    )
}

const AddPlaylist = ({ handleAddition, playlistName, playlistCreator, playlistSongs, playlistLikes, setPlaylistName, setPlaylistCreator, setPlaylistSongs, setPlaylistLikes }) => {
    return (
        <div>
            <h3>Add Playlists</h3>
            <form onSubmit={handleAddition}>
                <div> Playlist Name: {""}
                    <input type="text" value={playlistName} onChange={(e) => setPlaylistName(e.target.value)}/>
                </div>
                <div> Creator: {""}
                    <input type="text" value={playlistCreator} onChange={(e) => setPlaylistCreator(e.target.value)}/>
                </div>
                <div> Number of Songs: {""}
                    <input type="text" value={playlistSongs} onChange={(e) => setPlaylistSongs(e.target.value)}/>
                </div>
                <div> Likes: {""}
                    <input type="text" value={playlistLikes} onChange={(e) => setPlaylistLikes(e.target.value)}/>
                </div>
                <button>Add Playlist</button>
            </form>
        </div>
    )
}

const PlaylistDisplay = ({ username, playlists, playlistName, playlistCreator, playlistSongs, playlistLikes, setPlaylistName, setPlaylistCreator, setPlaylistSongs, setPlaylistLikes, handleLogout, handleAddition, handleLike, handleRemove }) => {
    return (
        <div>
            <LogoutField username={username} handleLogout={handleLogout}/>
            <h3>Playlists</h3>
            {playlists.map((playlist) => (
                <Playlist key={playlist.id} playlist={playlist} handleLike={handleLike} handleRemove={handleRemove}/>
            ))}
            <AddPlaylist handleAddition={handleAddition} playlistName={playlistName} playlistCreator={playlistCreator} playlistSongs={playlistSongs} playlistLikes={playlistLikes} 
            setPlaylistName={setPlaylistName} setPlaylistCreator={setPlaylistCreator} setPlaylistSongs={setPlaylistSongs} setPlaylistLikes={setPlaylistLikes}/>
        </div>
    );
}

export default PlaylistDisplay;