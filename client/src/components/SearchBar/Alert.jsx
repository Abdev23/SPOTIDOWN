
import React, { useEffect } from 'react';
import {
  RiCloseCircleFill,
  RiCheckboxCircleFill
} from 'react-icons/ri';

import "./SearchBar.css";


const Alert = ({ icon, show, type, msg, removeAlert, list }) => {

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]);

  // console.log(icon);
  return (
    <p className={`alert alert-${type}`}>
      {
        icon && <RiCheckboxCircleFill /> || <RiCloseCircleFill />
      }
      &nbsp; {msg}
    </p>
  );
};

export default Alert;

