import React from 'react';
import "./tracklist.css"
import Track from "../Track/track"

class tracklist extends React.Component {
    render() {
        return (
            <div className="TrackList">
                {this.props.tracks && this.props.tracks.map(track => {
                    return(
                        <Track 
                        track={track}
                        key={track.id}
                        onAdd={this.props.onAdd}
                        isRemoval={this.props.isRemoval}
                        onRemove={this.props.onRemove}></Track>
                    )
                })}
            </div>
        );
    }
}

export default tracklist;