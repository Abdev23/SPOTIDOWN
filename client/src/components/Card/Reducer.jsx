
import {
  MdDownload,
  MdAlbum,
  MdDownloading,
  MdOutlineDownloadDone,
  MdFileDownloadOff,
  MdPlayCircleFilled
} from 'react-icons/md';


// Handle downloadIcon-text button
export const downloadReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DOWNLOADING':
      return { ...state, isDownloading: true, status: 'Downloading...', icon: <MdDownloading /> };
    case 'SET_DOWNLOADED':
      return { ...state, isDownloading: false, status: 'Downloaded', icon: <MdOutlineDownloadDone /> };
    case 'SET_FAILED':
      return { ...state, isDownloading: false, status: 'Failed', icon: <MdFileDownloadOff /> };
    case 'SET_CLICKABLE':
      return { ...state, isClickable: action.isClickable };
    default:
      return state;
  }
};