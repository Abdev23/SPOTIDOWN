
import {
  MdDownload,
  MdAlbum,
  MdDownloading,
  MdOutlineDownloadDone,
  MdFileDownloadOff
} from 'react-icons/md';


// Handle TAP/ART Icon-text buttons
export let initialState = {
  downloadingTap: false,
  downloadingArt: false,
  tapStatus: 'Download',
  artStatus: 'Art',
  tapIcon: <MdDownload />,
  artIcon: <MdAlbum />
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'START_DOWNLOAD_TAP':
      return {
        ...state,
        downloadingTap: true,
        tapStatus: 'Downloading...',
        tapIcon: <MdDownloading />,
      };
    case 'START_DOWNLOAD_ART':
      return {
        ...state,
        downloadingArt: true,
        artStatus: 'Downloading...',
        artIcon: <MdDownloading />,
      };
    case 'DOWNLOAD_SUCCESS_TAP':
      return {
        ...state,
        downloadingArt: false,
        artStatus: 'Downloaded',
        artIcon: <MdOutlineDownloadDone />,
      };
    case 'DOWNLOAD_SUCCESS_ART':
      return {
        ...state,
        downloadingTap: false,
        tapStatus: 'Downloaded',
        tapIcon: <MdOutlineDownloadDone />,
      };
    case 'DOWNLOAD_FAILURE_TAP':
      return {
        ...state,
        downloadingArt: false,
        artStatus: 'Failed',
        artIcon: <MdFileDownloadOff />,
      };
    case 'DOWNLOAD_FAILURE_ART':
      return {
        ...state,
        downloadingTap: false,
        tapStatus: 'Failed',
        tapIcon: <MdFileDownloadOff />,
      };
    case 'RESET_BUTTONS':
      return initialState;
    default:
      return state;
  }
};

  // Handle API error responses
export const handleApiResponse = async (response) => {
  if (!response.ok)
  {
    throw new Error('Network response was not ok');
  }

  try
  {
    return await response.json();
  }
  catch (error)
  {
    console.error('Error parsing JSON response:', error);
    throw new Error('Invalid JSON response from the server');
  }
};