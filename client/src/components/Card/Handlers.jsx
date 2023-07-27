
import {
  MdDownload,
  MdAlbum,
  MdDownloading,
  MdOutlineDownloadDone,
  MdFileDownloadOff
} from 'react-icons/md';


// Handle TAP downloadIcon/text button
export const downloadTAPReducer = (state, action) => {
  switch (action.type) {
    case 'DOWNLOAD_START':
      return { ...state, downloading: true, status: 'Downloading...', icon: <MdDownloading /> };
    case 'DOWNLOAD_SUCCESS':
      return { ...state, downloading: false, status: 'Downloaded', icon: <MdOutlineDownloadDone /> };
    case 'DOWNLOAD_FAILED':
      return { ...state, downloading: false, status: 'Failed', icon: <MdFileDownloadOff /> };
    case 'DOWNLOAD_RESET':
      return { ...state, downloading: false, status: 'Download', icon: <MdDownload /> };
    default:
      return state;
  }
};

// Handle ART downloadIcon/text button
export const downloadARTReducer = (state, action) => {
  switch (action.type) {
    case 'DOWNLOAD_START':
      return { ...state, downloading: true, status: 'Downloading...', icon: <MdDownloading /> };
    case 'DOWNLOAD_SUCCESS':
      return { ...state, downloading: false, status: 'Downloaded', icon: <MdOutlineDownloadDone /> };
    case 'DOWNLOAD_FAILED':
      return { ...state, downloading: false, status: 'Failed', icon: <MdFileDownloadOff /> };
    case 'DOWNLOAD_RESET':
      return { ...state, downloading: false, status: 'Download', icon: <MdAlbum /> };
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