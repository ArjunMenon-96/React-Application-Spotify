import React from 'react';
import '../App/App.css';
import logo from '../App/spo.png'

import Playlist from "../Playlist/playlist";
import SearchBar from "../SearchBar/searchbar";
import SearchResults from "../SearchResults/searchresults";
import Spotify from "../../utils/Spotify";

class App extends React.Component {
 constructor(props) {
   super(props);
   
   this.state={
    SearchResults:[],
    playlistName:"New Playlist",
    playlistTracks:[]
  };
  
  this.search=this.search.bind(this);
  this.addTrack=this.addTrack.bind(this);
  this.removeTrack=this.removeTrack.bind(this);
  this.updatePlaylistName=this.updatePlaylistName.bind(this);
  this.savePlaylist=this.savePlaylist.bind(this);
  this.removeTrackSearch=this.removeTrackSearch.bind(this);
  this.doThese=this.doThese.bind(this);
 }

search(term){
  Spotify.search(term).then(SearchResults =>{
    this.setState({SearchResults:SearchResults});
  })
}

addTrack(track){
  let tracks=this.state.playlistTracks;
  if(tracks.find(savedTrack => savedTrack.id === track.id)){
    return;
  }
  tracks.push(track);
  this.setState({playlistTracks:tracks})
}

removeTrack(track){
  let tracks = this.state.playlistTracks;
  let trackSearch=this.state.SearchResults;
  tracks=tracks.filter(currentTrack => currentTrack.id !== track.id);
  trackSearch.unshift(track);
  this.setState({playlistTracks:tracks})
}

removeTrackSearch(track){
  let tracks = this.state.SearchResults;
  tracks=tracks.filter(currentTrack=> currentTrack.id!==track.id);
  this.setState({SearchResults:tracks});
}

doThese(track){
  this.addTrack(track);
  this.removeTrackSearch(track);
}

updatePlaylistName(name){
this.setState({playlistName:name});
}

savePlaylist(){
  const trackUrls = this.state.playlistTracks.map(track => track.uri);
  Spotify.savePlaylist(this.state.playlistName, trackUrls).then(()=>{
    this.setState({
      playlistName :this.state.playlistName,
      playlistTracks:[]
    })
  })
}

render(){
  // console.log(this.state.playlistTracks);
  return(
<div>
      <h1>
      <img
            src={logo}
            style={{
              position: "absolute",
              left: 10,
              top: 10,
              width: "70px",
              height: "70px",
            }}
            alt="logo"
          />

        <a href="http://localhost:3000">Spotify</a>
      </h1>
      <div className="App">
        <SearchBar onSearch={this.search}></SearchBar>
        <div className="App-playlist">
          <SearchResults SearchResults={this.state.SearchResults} onAdd={this.doThese}></SearchResults>
        <Playlist playlistTracks={this.state.playlistTracks} onNameChange={this.updatePlaylistName} playlistName={this.state.playlistName} onRemove={this.removeTrack} onSave={this.savePlaylist}></Playlist>
        </div>
      </div>
</div>
  )
}
}

export default App;
