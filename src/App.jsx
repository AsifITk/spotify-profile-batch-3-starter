import { useEffect, useState } from "react";
import axios from "axios";
// {AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}
const CLIENT_ID = "e5f96b95f0c94cc1873b1f36b6e4d1b1";
const REDIRECT_URI = "http://localhost:3000";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPE =
  "ugc-image-upload user-follow-read playlist-read-private user-top-read playlist-read-collaborative user-follow-read user-read-recently-played";
function App() {
  const [searchKey, setSearchKey] = useState("");
  let [user, setUser] = useState(null);
  let [playlists, setPlaylists] = useState([]);
  let [topArtists, setTopArtists] = useState([]);
  let [topTracks, setTopTracks] = useState([]);
  let [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  let [recentlyPlayed, setRecentlyPlayed] = useState([]);

  const [artists, setArtists] = useState([]);
  const [token, setToken] = useState("");

  //!get user data from spotifyhttps://api.spotify.com/v1/browse/featured-playlists
  // https://api.spotify.com/v1/me
  // https://api.spotify.com/v1/me/playlists
  // https://api.spotify.com/v1/me/top/artists  !! no data
  // https://api.spotify.com/v1/me/top/tracks  !!no data
  // https://api.spotify.com/v1/browse/featured-playlists
  // https://api.spotify.com/v1/me/player/recently-played
  const user_account = async (token) => {
    const recentyData = await axios
      .get("https://api.spotify.com/v1/me/player/recently-played", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Return the full details of the user.
        console.log(response);
        return response;
      })

      .catch((err) => {
        console.log("error");
      });
    setRecentlyPlayed(recentyData.data);
    const playlistData = await axios
      .get("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Return the full details of the user.
        console.log(response);
        return response;
      })

      .catch((err) => {
        console.log("error");
      });
    setPlaylists(playlistData.data.data);
    const topArtistsData = await axios
      .get("https://api.spotify.com/v1/me/top/artists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Return the full details of the user.
        console.log(response);
        return response;
      })

      .catch((err) => {
        console.log("error");
      });
    setTopArtists(topArtistsData.data);
    const topTrackData = await axios
      .get("https://api.spotify.com/v1/me/top/tracks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Return the full details of the user.
        console.log(response);
        return response;
      })

      .catch((err) => {
        console.log("error");
      });
    setTopTracks(topTrackData.data);
    const user = await axios
      .get("https://api.spotify.com/v1/me/player/recently-played", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Return the full details of the user.
        console.log(response);
        return response;
      })

      .catch((err) => {
        console.log("error");
      });
    setArtists(user.data);
    const featuredData = await axios
      .get("https://api.spotify.com/v1/me/player/recently-played", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Return the full details of the user.
        console.log(response);
        return response;
      })

      .catch((err) => {
        console.log("error");
      });
    setFeaturedPlaylists(featuredData.data);

    return user;
  };

  //!get artists
  // const searchArtists = (e) => {
  //   e.preventDefault();
  //   const { data } = axios.get("https://api.spotify.com/v1/me", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     // ,
  //     // params: {
  //     //   q: searchKey,
  //     //   type: "artist",
  //     // },
  //   });
  //   console.log(data);
  //   // setArtists(data.artists.items);
  // };

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
    user_account(token);
  }, []);

  const renderArtists = () => {
    return artists.map((artist) => (
      <div key={artist.id}>
        {artist.images.length ? (
          <img width={"100%"} src={artist.images[0].url} alt="" />
        ) : (
          <div>No Image</div>
        )}
        {artist.name}
      </div>
    ));
  };
  return (
    <div>
      <h1>Spotify</h1>
      <a
        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
      >
        Login to Spotify
      </a>
      <form>
        <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
        <button type={"submit"}>Search</button>
      </form>
      <button
        onClick={(e) => {
          user_account();
        }}
      >
        click
      </button>

      <h1>Artists</h1>
      <div>{JSON.stringify(artists)}</div>
      <h1>Playlists</h1>
      <div>{JSON.stringify(playlists)}</div>
      <h1>topArtists</h1>
      <div>{JSON.stringify(topArtists)}</div>
      <h1>topTracks</h1>
      <div>{JSON.stringify(topTracks)}</div>
      <h1>featuredPlaylists</h1>
      <div>{JSON.stringify(featuredPlaylists)}</div>
      <h1>recentlyPlayed</h1>
      <div>{JSON.stringify(recentlyPlayed)}</div>
    </div>
  );
}

export default App;
