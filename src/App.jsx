import { useEffect, useState } from "react";
import axios from "axios";
// {AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}
const CLIENT_ID = "e5f96b95f0c94cc1873b1f36b6e4d1b1";
const REDIRECT_URI = "http://localhost:3000";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPE =
  "ugc-image-upload user-follow-read playlist-read-private user-top-read playlist-read-collaborative user-follow-read";
function App() {
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [token, setToken] = useState(
    "BQADMtqNKHEmlWQ6JIdSAs6LkBqzUDdJQ2_hN0usQl4a--WWpQ8qcvGMcUC6c9R57_YTtbUdVOTzNr777x8WxSNPSzPvNjoCBM0Oa2T0SyX-sVrKM3mLt7BDSJQpAoeiha3iqp1JsD5eURhn43dX3PUi5DEzET-ikXip91vX-jdtSm4VVG4luoZgISrl_B3LnWYXEa_njzR5wln3AWZw-AUMn7bU5ozB"
  );

  //!get user data from spotifyhttps://api.spotify.com/v1/browse/featured-playlists
  // https://api.spotify.com/v1/me
  // https://api.spotify.com/v1/me/playlists
  // https://api.spotify.com/v1/me/top/artists  !! no data
  // https://api.spotify.com/v1/me/top/tracks  !!no data
  // https://api.spotify.com/v1/browse/featured-playlists
  const user_account = async () => {
    const user = await axios
      .get("https://api.spotify.com/v1/me", {
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
    console.log(user);
    setArtists(user.data.items);
    console.log(artists);

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
    user_account();
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
      <button>clickme</button>

      <div></div>
    </div>
  );
}

export default App;
