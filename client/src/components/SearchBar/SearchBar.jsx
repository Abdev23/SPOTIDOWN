
import React, { useState, useEffect } from 'react';

import Alert from './Alert';
import Card from '../Card/Card';
import NotFound from '../NotFound/NotFound';
import SearchLoading from './SearchLoading';
import './SearchBar.css';


// store input in localStorage
const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list)
  {
    return (list = JSON.parse(localStorage.getItem('list')));
  }
  else
  {
    return [];
  }
};

const SearchBar = () => {
  const [loading, setLoading] = useState(false);
  const [searchLimit, setSearchLimit] = useState(1);
  const [accessToken, setAccessToken] = useState('');
  
  const [musicMetadata, setMusicMetadata] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const [keySearch, setKeySearch] = useState('');
  const [exist, setExist] = useState(false);
  const [list, setList] = useState(getLocalStorage());
  const [alert, setAlert] = useState({ icon: false,show: false, msg: '', type: '' });

  // API access Token
  useEffect( () => {
    const authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id='
            + import.meta.env.VITE_CLIENT_ID
            + '&client_secret='
            + import.meta.env.VITE_CLIENT_SECRET
    }

    const Connect = async () => {
      try
      {
        const response = await fetch(
          'https://accounts.spotify.com/api/token',
          authParameters
        );
        const data = await response.json();
        console.log(data.accessToken);
        setAccessToken(data.access_token);
      }
      catch (err)
      {
        console.error('OPPS! API CONNECTION ERROR: ', err);
      }
    }
    Connect();
  }, []);


  // Search
  const Search = async () => {
    // Get request using search to get the Artist ID
    const searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }

    setLoading(true);

    //  check if keySearch is link or keyword
    if(keySearch.includes('https://open.spotify.com/'))
    {
      // console.log('LINK');

      //    if keySearch is link
      //      get Sub url from link
      //      detect if its track, album, playlist
      //      get the ID from link
      //      apply same process below

      //    if keySearch is nothing OR empty OR falsy link
      //      alert danger.



    }
    else
    {
      // console.log('KEYWORD');

      const queryData = await fetch(
        'https://api.spotify.com/v1/search?q='
        + keySearch
        + '&type=album,artist,playlist,track&limit='
        + searchLimit,
        searchParameters
      )
      .then(response => response.json())
      .then(data => {
        if(data)
        {
          // console.log('RAW MUSIC METADATA: ', data);
          setLoading(false);
          setExist(true);

          setAlbums([...data.albums.items]);
          setTracks([...data.tracks.items]);
          setPlaylists([...data.playlists.items]);

          let tmp = [
            ...data.albums.items,
            ...data.tracks.items
          ].sort((a, b) => {
              const dateA = new Date(a.release_date || a.album.release_date);
              const dateB = new Date(b.release_date || b.album.release_date);
              return dateB - dateA;
            }
          );

          setMusicMetadata([
            ...tmp,
            ...data.playlists.items
          ]);

          return data;
        }
        else
        {
          setLoading(false);
          setExist(false);
          console.log('didnt get the music metadata');
          throw new Error('didnt get the music metadata');
          // return 'didnt get the data metadata';
        }
      })
      .catch(err => {
        setLoading(false);    // hmmm fix if internet connexion is lost
                              // also fix declaration text message and color
        console.error('OPPS! UNKNOWN METADATA: ', err);
        throw new Error('OPPS! UNKNOWN METADATA: ', err);
      });
    }
  }

  const showAlert = (icon = false, show = false, type = '', msg = '') => {
    setAlert({ icon, show, type, msg });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!keySearch)
    {
      showAlert(false, true, 'danger', 'Provide valid link or keyword');
      setKeySearch('');
    }
    else if(keySearch && !musicMetadata)
    {
      // console.log('invalid link or keyword');
      showAlert(false, true, 'danger', 'Invalid link or keyword');
      setKeySearch('');
    }
    else
    {
      // console.log('founded some music for you');
      showAlert(true, true, 'success', 'Founded some music for you');
      const newItem = { id: new Date().getTime().toString(), title: keySearch };

      // setList([...list, newItem]);
      setKeySearch('');
    }
  
  }

  useEffect( () => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  //----------------------------------------------------------------
  // console.log('FORMATED MUSIC METADATA: ', musicMetadata);


  return (
    <section className='section-center'>
      <form className='grocery-form'
            onSubmit={handleSubmit}
      >
        {
          alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />
        }
        <h3> Enter Link or Keyword </h3>
        <div className='form-control'>
          <input className='grocery'
                 type='text'
                 placeholder='https://open.spotify.com/track/....'
                 value={keySearch}
                 onKeyPress={ event => {
                    if(event.key == 'Enter')
                    {
                      Search();
                      event.target.blur();
                      event.target.value = '';
                    }
                  }
                 }
                 onChange={ e =>
                    setKeySearch(e.target.value)
                 }
          />
          <button type='submit'
                  className='submit-btn'
                  onClick={Search}
          >
            Search
          </button>
        </div>
      </form>

      <main>
      {
        loading && <SearchLoading />
      }
      </main>
      
      <div className='cards-container'>
      {
        musicMetadata && musicMetadata.map( (metadata, i) => {
                            return (
                              <Card key={i}
                                    accessToken={accessToken}
                                    metadata={metadata}
                                    albums={albums}
                                    tracks={tracks}
                                    playlists={playlists}
                              />
                            );
                          }
                          )
                      || <NotFound />
      }
      </div>
    </section>
  );
}


export default SearchBar;