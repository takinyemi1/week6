import { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";

function App() {
  const [token, setToken] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [artist, setArtist] = useState(null);
  const [topSongs, setTopSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [sortSongs, setSortedSongs] = useState([]);
  
  const cid = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

  useEffect(() => {
    const fetchAPIToken = async () => { // fetch the API token
      try {
        const res = await axios.post('https://accounts.spotify.com/api/token', 
          new URLSearchParams({grant_type: 'client_credentials'}),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Basic ' + btoa(cid + ':' + client_secret) 
            }
          }
        );
        // const json = await res.json();
        console.log("API Response: ", res.data);
        setToken(res.data.access_token);
      } catch (e) {
        console.log("Error", e);
      }
    }
    fetchAPIToken();
  }, []);

  useEffect(() => {
    setSortedSongs(topSongs); // set the initial songs
  }, [topSongs]);

  // search for the artist
  const searchArtist = async () => {
    if (!searchInput || !token) return;
    try {
      const res = await axios.get('https://api.spotify.com/v1/search', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          q: searchInput, // artist name
          type: 'artist',
          limit: 1
        }
      });

      // if the artist is found
      const findArtist = res.data.artists.items[0];
      if (findArtist) {
        setArtist(findArtist);
        fetchAlbums(findArtist.id);
        fetchTopSongs(findArtist.id);
      } else { // default values
        setArtist(null);
        setAlbums([]);
      }
      // console.log("Artist Search Response: ", res.data);
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  // fetch albums using the artist ID
  const fetchAlbums = async (artistID) => {
    const res = await axios.get(`https://api.spotify.com/v1/artists/${artistID}/albums`, {
      headers: {
        Authorization: `Bearer ${token}`
      }, params: {
        include_groups: 'album',
        market: 'US',
        limit: 5
      }
    });
    setAlbums(res.data.items);
  };

  // fetch top songs
  const fetchTopSongs = async (artistID) => {
    try {
      const res = await axios.get(`https://api.spotify.com/v1/artists/${artistID}/top-tracks`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTopSongs(res.data.tracks.slice(0, 10)); // displays only top 5 songs
    } catch (e) {
      console.log("Error fetching top tracks: ", e);
    }
  };

  // format theduration time
  const formatDurationTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  // sort the songs
  const handleAlphabeticalSort = () => {
    const sorted = [...sortSongs].sort((a, b) => 
      a.name.localeCompare(b.name));
    setSortedSongs(sorted);
  };

  return (
    <div className='whole-page'>
      {/* side navigation bar */}
      <h1 style={{fontSize: "100px"}}>Musicality 🎶</h1>
      <div className='search'>
        <input
          type='text'
          placeholder='Search...'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <div className='filter-container'>
          <button 
            className='filter-btn'
            onClick={handleAlphabeticalSort}
          >
              Sort by Song Name
          </button>
        </div>

        {/* search button */}
        <button className='search-button' onClick={searchArtist}>🔎</button>
      </div>

      {/* artist name */}
      {artist && (
        <div className='artist-info'>
          <h1>{artist.name}</h1>
          {artist.images?.[0] && (
            <img className='artist-image' src={artist.images[0].url} alt={`${artist.name}`} />
          )}
        </div>
      )}
      <br></br>
      <br></br>

      <div className='dashboard-summary'>
        {/* popularity */}
        {artist && (
          <div className='artist-popularity'>
            <h4 className='track-title'>Popularity</h4>
            <h1>{artist.popularity}/100</h1>
          </div>
        )}

        {/* followers */}
        {artist && (
          <div className='artist-followers'>
            <h4 className='track-title'>Followers</h4>
            <h1>{artist.followers.total.toLocaleString()}</h1>
          </div>
        )}

        {/* genres */}
        {artist && (
          <div className='artist-genres'>
            <h4 className='track-title'>Genre(s)</h4>
            <h1>
              {artist.genres?.length > 0 ? artist.genres.join(", ") : "No genre information available for this artist."}
            </h1>
          </div>
        )}
      </div>

      <br />
      <br />
      <br />

      {sortSongs.length > 0 && (
          <div className='song-cards'>
          <h2 className='track-title'>Top Tracks</h2>

          {/* column headers */}
          <div className='track-rows-header'>
            <div className='track-columns-track'>Track</div>
            <div className='track-columns'>Album</div>
            <div className='track-columns'>Duration</div>
          </div>

          {/* songs */}
          {sortSongs.map((song) => (
            <div className='track-rows' key={song.id}>
              {/* tracks */}
              <div className='track-column track-info'>
                {song.album?.images?.[0] && (
                  <img
                    src={song.album.images[0].url}
                    alt={song.name}
                    width="50%"
                    height="100%"
                    style={{borderRadius: "5px"}}
                  />
                )}
                <span>{song.name}</span>
              </div>

              {/* album name */}
              <div className='track-columns'>{song.album.name}</div>

              {/* du5ration */}
              <div className='track-columns'>{formatDurationTime(song.duration_ms)}</div>
            </div>
          ))}
        </div>
      )}

      {/* albums */}
      {/* {albums.length > 0 && (
        <div className='albums'>
          <h3>Albums</h3>
          <ul>
            {albums.map((albums) => (
              <li key={albums.id}>
                <p>{albums.name}</p>
                {albums.images?.[0] && (
                  <img src={albums.images[0].url} alt={albums.name} width="100%" />
                )}
              </li>
            ))}
          </ul>
        </div>
      )} */}
      {/* {token ? <p>Access Token: {token}</p> : <p>Loading Token...</p>} */}
    </div>
  );
}

export default App
