import React from 'react';
import "./searchbar.css"

class searchbar extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            term:""
        };

        this.handleTermChange=this.handleTermChange.bind(this);
        this.search=this.search.bind(this);
        this.handleEnter=this.handleEnter.bind(this);
    }
    
   handleTermChange(event){
       this.setState({term: event.target.value});
   }

   search(){
       this.props.onSearch(this.state.term);
   }

   handleEnter(event){
       if(event.keyCode === 13){
           this.search();
       }
   }
   
   render() {
    return (
        <div className="SearchBar">

            <link rel="stylesheet"
          href=
"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

            <input placeholder="Artists, songs, or podcasts" onChange={this.handleTermChange} onKeyUp={this.handleEnter}></input>
            <button className="SearchButton" onClick={this.search}><i class="fa fa-search"></i></button>
        </div>
    );
}
}

export default searchbar;