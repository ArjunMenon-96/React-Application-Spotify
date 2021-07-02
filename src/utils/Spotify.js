const clientID = "1262d3a6e77d4ac59963e27387f95ad0";
const redirectUrl="http:%2F%2Flocalhost:3000%2F"

let accessToken;

const Spotify={
    getAccessToken(){
        if(accessToken){
            return accessToken;
        }
        const accessTokenMatch=window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch=window.location.href.match(/expires_in=([^&]*)/);
        if(accessTokenMatch && expiresInMatch){
            accessToken=accessTokenMatch[1];
            const expiresIn=Number(expiresInMatch[1]);
            window.setTimeout(()=>(accessToken=""),expiresIn * 1000);
            window.history.pushState("Access Token",null,"/");
            return accessToken;
        }else{
            const accessUrl=`https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
            window.location=accessUrl;
        }
    },
    search(term){
        const accessToken=Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        })
        .then(response=>{
            return response.json();
        })
        // .then(jsonResponse=>{
        //     return jsonResponse.json();
        // })
        .then(jsonResponse=>{
            if(!jsonResponse.tracks){
                return[];
            }
            return jsonResponse.tracks.items.map(track=>({
                id:track.id,
                name:track.name,
                artist:track.artists[0].name,
                album:track.album.name,
                uri:track.uri
            }))
        })
    },

    savePlaylist(name, trackUrls){
        if(!name || !trackUrls.length){
            return;
        }

        const accessToken=Spotify.getAccessToken();
        const headers={Authorization:`Bearer ${accessToken}`};
        let user_id;
        
        return fetch("https://api.spotify.com/v1/me",{headers:headers})
        .then(response=> response.json())
        .then(jsonResponse=>{
            user_id=jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`,{
                headers:headers,
                method:"POST",
                body:JSON.stringify({name:name})
            })
        .then(response=>response.json())
        .then(jsonResponse=>{
                const playlistId=jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists/${playlistId}/tracks`,
                    {
                        headers:headers,
                        method:"POST",
                        body:JSON.stringify({uris:trackUrls})
                    }
                )});
        });
    }
};

export default Spotify;