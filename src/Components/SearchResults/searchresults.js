import React from 'react';
import "./searchresults.css"
import TrackList from "../TrackList/tracklist"

class SearchResults extends React.Component {
    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                
                <TrackList tracks={this.props.SearchResults} onAdd={this.props.onAdd}></TrackList>

            </div>
        );
    }
}

export default SearchResults;