import React from 'react';
import "./playlist.css"
import TrackList from "../TrackList/tracklist"

class playlist extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event){
        this.props.onNameChange(event.target.value);
    }
    
    render() {
        // console.log(this.props.playlistTracks);
        return (
            <div className="Playlist">
                <input onChange={this.handleNameChange} placeholder="Enter Playlist Name" defaultValue=''></input>
                <TrackList tracks={this.props.playlistTracks}
                isRemoval={true}
                onRemove={this.props.onRemove}></TrackList>
                <button className="Playlist-save" onClick={this.props.onSave}>Save to Spotify</button>
            </div>
            
        );
    }
}

export default playlist;