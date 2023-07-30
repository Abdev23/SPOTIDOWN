
import React, { useState, useRef, useReducer } from 'react';

import { reducer, initialState, handleApiResponse } from './Handlers';
import './Card.css';


const Card = ({ accessToken, metadata }) => {

  const progressBarCircleRef = useRef(null);
  const progressBarValueRef = useRef(null);
  const downloadTapButtonRef = useRef(null);
  const downloadArtButtonRef = useRef(null);

  const [duration, setDuration] = useState(12000);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isClickable, setIsClickable] = useState(true);
  const [buttonState, dispatch] = useReducer(reducer, initialState);

  const CARD_DATA = {
    image_src: '',
    image_alt: '',
    image_width: null,
    image_height: null,
    card_type: '',
    title: '',
    artist: '',
    total_tracks: null,
    release_date: '',
    track_length: null,
    description: '',
  };
  
  if(metadata.type === 'album')
  {
    CARD_DATA.image_src = metadata.images?.[0]?.url || '';
    CARD_DATA.image_alt = 'Album Image';
    CARD_DATA.image_width = metadata.images?.[0]?.width || null;
    CARD_DATA.image_height = metadata.images?.[0]?.height || null;
    CARD_DATA.card_type = metadata.type === 'album' ? metadata.album_type : metadata.type;
    CARD_DATA.title = metadata.name || 'Unknown Title';
    CARD_DATA.artist = metadata.artists?.[0]?.name || 'Unknown Artist';
    CARD_DATA.total_tracks = metadata.total_tracks || null;
    CARD_DATA.release_date = metadata.release_date ? new Date(metadata.release_date).getFullYear() : '';
  }
  else if(metadata.type === 'track')
  {
    CARD_DATA.image_src = metadata.album?.images?.[0]?.url || '';
    CARD_DATA.image_alt = 'Track Image';
    CARD_DATA.image_width = metadata.album?.images?.[0]?.width || null;
    CARD_DATA.image_height = metadata.album?.images?.[0]?.height || null;
    CARD_DATA.card_type = metadata.type;
    CARD_DATA.title = metadata.name || 'Unknown Title';
    CARD_DATA.artist = metadata.artists?.[0]?.name || 'Unknown Artist';
    CARD_DATA.track_length = metadata.duration_ms ? new Date(metadata.duration_ms).toISOString().slice(15, 19) : null;
    CARD_DATA.release_date = metadata.album?.release_date ? new Date(metadata.album.release_date).getFullYear() : ''
  }
  else if(metadata.type === 'playlist')
  {
    CARD_DATA.image_src = metadata.images?.[0]?.url || '';
    CARD_DATA.image_alt = 'Playlist Image';
    CARD_DATA.image_width = metadata.images?.[0]?.width || null;
    CARD_DATA.image_height = metadata.images?.[0]?.height || null;
    CARD_DATA.card_type = metadata.type;
    CARD_DATA.title = metadata.name || 'Unknown Title';
    CARD_DATA.artist = metadata.owner?.display_name || 'Unknown Owner';
    CARD_DATA.total_tracks = metadata.tracks?.total || null;
    CARD_DATA.description = metadata.description || '';
  }
  else
  {
    CARD_DATA.ERROR = 'SOMETHING WENT WRONG NO TAP TO DISPLAY';
  }

  const searchParameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    }
  }

  // Animate the progress bar
  const animateProgressBar = (start, end, duration, url) => {
    setIsClickable(false);
    const progressBar = progressBarCircleRef.current;
    const progressValue = progressBarValueRef.current;

    const circumference = 2 * Math.PI * progressBar.getAttribute('r');

    let startTime;
    let current = start;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const increment = ((end - start) / duration) * progress;

      if (progress >= duration)
      {
        setIsDownloading(false);
        setIsClickable(true);
 
        if(url.includes('art')) dispatch({ type: 'DOWNLOAD_SUCCESS_TAP' });
        else dispatch({ type: 'DOWNLOAD_SUCCESS_ART' });
        setTimeout(() => {
          dispatch({ type: 'RESET_BUTTONS' });
        }, 3000);

        progressBar.style.strokeDasharray = `${(end / 100) * circumference}, ${circumference}`;
        progressValue.textContent = `${Math.round(end) || 0}%`;
      }
      else
      {
        current = start + increment;

        const currentProgressPercentage = Math.round((current.current / duration) * 100);
        const previousProgressPercentage = Math.round((current.current - increment) / duration) * 100;
  
        if (currentProgressPercentage !== previousProgressPercentage)
        {
          progressBar.style.strokeDasharray = `${(current / 100) * circumference}, ${circumference}`;
          progressValue.textContent = `${Math.round(current) || 0}%`;
        }
        requestAnimationFrame(animate);
      }
    };

    setIsDownloading(true);
    setIsClickable(false);
    requestAnimationFrame(animate);
  };
  
  // Fetch tracks
  const fetchTracks = async (url, searchParameters, trackExtractor) => {
    const response = await fetch(`${url}`, searchParameters);

    return handleApiResponse(response)
      .then((data) => {
          if (!data)
          {
            throw new Error(`Unknown ${url.includes('albums') ? 'album' : 'playlist'} id`);
          }

          data.items
            .filter((item) => item.track !== null)
            .map((item) => trackExtractor(item));

          if (data.next)
          {
            return fetchTracks(data.next, searchParameters, trackExtractor);
          }
      })
      .catch((error) => {
        setIsDownloading(false);
        setIsClickable(true);
        dispatch({ type: 'DOWNLOAD_FAILURE_TAP' });
        setTimeout(() => {
          dispatch({ type: 'RESET_BUTTONS' });
        }, 3000);
        console.error('Error:', error);
        throw new Error(`OPPS! FAILED TO FETCH ${url.includes('albums') ? 'ALBUM' : 'PLAYLIST'} TRACKS: ${error}`);
      });
  };

  // Handle post requests for TAP and ART
  const handlePostRequest = async (url, data) => {
    let postMsgKeyword = '';
    if (metadata.type === 'album') postMsgKeyword = 'Album';
    else if (metadata.type === 'track') postMsgKeyword = 'Track';
    else if (metadata.type === 'playlist') postMsgKeyword = 'Playlist';
    else postMsgKeyword = '';

    try
    {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( data ),
      });

      const responseData = await handleApiResponse(response);
      console.log('estimated time to run the tap animation:', responseData.dur);
      const dur = responseData.dur;
      animateProgressBar(0, 100, dur, url);
    }
    catch (error)
    {
      setIsDownloading(false);
      setIsClickable(true);
      if(url.includes('art')) dispatch({ type: 'DOWNLOAD_FAILURE_TAP' });
      else dispatch({ type: 'DOWNLOAD_FAILURE_ART' });
      setTimeout(() => {
        dispatch({ type: 'RESET_BUTTONS' });
      }, 3000);
      console.error('Error:', error);
      throw new Error(`OPPS! ${postMsgKeyword} Post Request failed: ${error}`);
    }
  };

  // Send the album/track/playlist TAP
  const POST_MUSIC_DATA = async () => {
    dispatch({ type: 'START_DOWNLOAD_TAP' });
    // console.log('TAP metadata: ', metadata);
    const TAP = [];
    setIsDownloading(true);
    setIsClickable(false);

    const handleAlbumTracks = async (offset, totalTracks) => {
    
      const albumTrackExtractor = (item) => {
        const albumTrack = {
          'href': item.href || '',
          'url': item.external_urls.spotify || '',
          'name': item.name || 'Unknown Title',
          'type': metadata.album_type || 'Unknown Album Type',
          'artists': item.artists?.map((artist) => artist.name) || ['Unknown Artist'],
          'duration': item.duration_ms || null,
          'image': metadata.images?[0].url : '',
          'release_date': metadata.release_date || '',
        };
        TAP.push(albumTrack);
      };
    
      const albumUrl = `https://api.spotify.com/v1/albums/${metadata.id}/tracks`;
      return fetchTracks(albumUrl, searchParameters, albumTrackExtractor);
    };
    
    const handlePlaylistTracks = (offset, totalTracks) => {
    
      const playlistTrackExtractor = (item) => {
        const playlistTrack = {
          'href': item.track.href || '',
          'url': item.track.external_urls.spotify || '',
          'name': item.track.name || 'Unknown Title',
          'type': item.track.type || 'Unknown Playlist Type',
          'artists': item.track.artists?.map((artist) => artist.name) || ['Unknown Artist'],
          'duration': item.track.duration_ms || null,
          'image': item.track.album.images?[0].url : '',
          'added_at': item.added_at || '',
        };
        TAP.push(playlistTrack);
      };
    
      const playlistUrl = `https://api.spotify.com/v1/playlists/${metadata.id}/tracks`;
      return fetchTracks(playlistUrl, searchParameters, playlistTrackExtractor);
    };

    console.log('%c sendind this to server-TAP: ', 'color: black; background-color: #26bf2a', TAP);

    try
    {
      if (metadata.type === 'album')
      {
        return handleAlbumTracks(0, metadata.total_tracks)
          .then(() => {
            handlePostRequest('/api/tap', { TAP });
        });
      }
      else if (metadata.type === 'track')
      {
        const track = {
          'href': metadata.href || '',
          'url': metadata.external_urls.spotify || '',
          'name': metadata.name || 'Unknown Title',
          'type': metadata.type || 'Unknow Track Type',
          'artists': metadata.artists?.map((artist) => artist.name) || ['Unknown Artist'],
          'duration': metadata.duration_ms || null,
          'image': metadata.album.images?[0].url : '',
          'release_date': metadata.album.release_date || '',
        };
        TAP.push(track);
        return handlePostRequest('/api/tap', { TAP });
      }
      else if (metadata.type === 'playlist')
      {
        return handlePlaylistTracks(0, metadata.tracks.total)
          .then(() => {
            handlePostRequest('/api/tap', { TAP });
        });
      }
    }
    catch (err)
    {
      setIsDownloading(false);
      setIsClickable(true);
      dispatch({ type: 'DOWNLOAD_FAILURE_TAP' });
      setTimeout(() => {
        dispatch({ type: 'RESET_BUTTONS' });
      }, 3000);
      console.error('Error:', err);
      throw new Error(`OPPS! TAP Post Request failed: ${err}`);
    }
  };

  // Send the album /track/playlist COVER/ART
  const POST_MUSIC_ART = async () => {
    // console.log('ART metadata: ', metadata);
    const ART_COVER = {};
    dispatch({ type: 'START_DOWNLOAD_ART' });
    setIsDownloading(true);
    setIsClickable(false);

    if(metadata.type === 'album')
    {
      ART_COVER.image = metadata.images?.[0]?.url || '';
      ART_COVER.width = metadata.images?.[0]?.width || null;
      ART_COVER.height = metadata.images?.[0]?.height || null;
    }
    else if(metadata.type === 'track')
    {
      ART_COVER.image = metadata.album?.images?.[0]?.url || '';
      ART_COVER.width = metadata.album?.images?.[0]?.width || null;
      ART_COVER.height = metadata.album?.images?.[0]?.height || null;
    }
    else if(metadata.type === 'playlist')
    {
      ART_COVER.image = metadata.images?.[0]?.url || '';
      ART_COVER.width = metadata.images?.[0]?.width || null;
      ART_COVER.height = metadata.images?.[0]?.height || null;
    }
    else
    {
      ART_COVER.ERROR = 'NO IMAGE TO DISPLAY';
      setIsDownloading(false);
    }

    console.log('%c sendind this to server-ART_COVER: ', 'color: black; background-color: #26bf2a', ART_COVER);

    try
    {
      return handlePostRequest('/api/art', { ART_COVER });
    }
    catch (err)
    {
      setIsDownloading(false);
      setIsClickable(true);
      dispatch({ type: 'DOWNLOAD_FAILURE_ART' });
      setTimeout(() => {
        dispatch({ type: 'RESET_BUTTONS' });
      }, 3000);
      console.error('Error:', err);
      throw new Error(`OPPS! ART Post Request failed: ${err}`);
    }
  };

  return (
    <div className="card">
      <div className='button-layout'>
        <a className={`button-b ${isClickable ? '' : 'clickable'}`}
           onClick={(e) => POST_MUSIC_DATA()}
           ref={downloadTapButtonRef}
           disabled={buttonState.downloadingArt}
        >
          {buttonState.tapIcon}&nbsp;{buttonState.tapStatus}
        </a>
        
        <a className={`button-b bordered ${isClickable ? '' : 'clickable'}`}
           onClick={(e) => POST_MUSIC_ART()}
           ref={downloadArtButtonRef}
           disabled={buttonState.downloadingArt}
        >
          {buttonState.artIcon}&nbsp;{buttonState.artStatus}
        </a>
      </div>

      <div className='content-layout'>
        <figure className={CARD_DATA.image_width === null || CARD_DATA.image_height === null ? 'smallImg' : ''}>
          <div className='image-wrapper'>
            {
            isDownloading && (
              <svg className="progress-bar" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.7" />
                    <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="glow" />
                    <feMerge>
                      <feMergeNode in="glow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#19b752" />
                    <stop offset="100%" stopColor="#636363" />
                  </linearGradient>
                </defs>
                <circle ref={progressBarCircleRef}
                        className="progress-bar-circle"
                        r="45"
                        cx="50%"
                        cy="50%"
                        fill="none"
                        stroke="var(--clr-primary-5)"
                        strokeWidth="8"
                        strokeDasharray="0, 283"
                        strokeLinecap="round"
                        filter="url(#glow)"
                />
                <text ref={progressBarValueRef}
                      className="progress-bar-value"
                      textAnchor="middle"
                      x="50%"
                      y="60%"
                      fill="var(--clr-primary-5)"
                      filter="url(#glow)"
                >
                  0%
                </text>
              </svg>
            )
            }
            <img src={CARD_DATA.image_src}
                 alt={CARD_DATA.image_alt}
                 draggable='false'
            />
          </div>
        </figure>

        <div className='content'>
          <div className='card-info-wrapper'>
            <h4 className='card-type'> {CARD_DATA.card_type} </h4>
            <h1 className='title'> {CARD_DATA.title} </h1>
            <h4 className='artist'> {CARD_DATA.artist} </h4>
            {
              metadata.type === 'album' ? (
                <>
                  <h4 className='content-bottom-one'>
                    {CARD_DATA.total_tracks} track{CARD_DATA.total_tracks > 1 ? 's' : ''}
                  </h4>
                  <h4 className='content-bottom-two'> &bull; {CARD_DATA.release_date} </h4>
                </>
              ) : metadata.type === 'track' ? (
                <>
                  <h4 className='content-bottom-one'> {CARD_DATA.track_length} </h4>
                  <h4 className='content-bottom-two'> &bull; {CARD_DATA.release_date} </h4>
                </>
              ) : metadata.type === 'playlist' ? (
                <>
                  <h4 className='content-bottom-one'>
                    {CARD_DATA.total_tracks} track{CARD_DATA.total_tracks > 1 ? 's' : ''}
                  </h4>
                  <h4 className='content-bottom-two'>{CARD_DATA.description && String.fromCharCode(8226) + ' ' + CARD_DATA.description} </h4>
                </>
              ) : (
                <>
                  <h4 className='content-bottom-one'></h4>
                  <h4 className='content-bottom-two'></h4>
                </>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;