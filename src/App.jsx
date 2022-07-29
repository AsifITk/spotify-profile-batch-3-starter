import { useEffect, useState } from "react";
import axios from "axios";

const CLIENT_ID = "e5f96b95f0c94cc1873b1f36b6e4d1b1";
const REDIRECT_URI = "http://localhost:3001";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
function App() {
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [token, setToken] = useState("");

  //!get user data from spotify
  // https://api.spotify.com/v1/me
  const user_account = async (access_token) => {
    const user = await axios
      .get("https://api.spotify.com/v1/browse/featured-playlists", {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      })
      .then((response) => {
        // Return the full details of the user.
        return response;
      })
      .catch((err) => {
        console.log("error");
      });
    console.log(user);
    return user;
  };

  //!get artists
  const searchArtists = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    });
    console.log(data);
    setArtists(data.artists.items);
  };

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
    console.log(token);
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
        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
      >
        Login to Spotify
      </a>
      <form onSubmit={searchArtists}>
        <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
        <button type={"submit"}>Search</button>
      </form>

      <div>{JSON.stringify(user_account(token))}</div>
    </div>
  );
}

export default App;
