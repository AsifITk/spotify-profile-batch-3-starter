const CLIENT_ID = "e5f96b95f0c94cc1873b1f36b6e4d1b1";
const REDIRECT_URI = "http://localhost:3001";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
function App() {
  return (
    <div>
      <h1>Spotify</h1>
      <a
        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
      >
        Login to Spotify
      </a>
    </div>
  );
}

export default App;
