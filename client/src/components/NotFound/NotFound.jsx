
import React from "react";
import { TiWarningOutline } from "react-icons/ti";

import "./NotFound.css";


const NotFound = () => {


  return (
    <div className='not-found-card'
          style={{ height: '4rem' }}
    >
      <div className='not-found-card-body'>
        <h1>
          <TiWarningOutline /> OPPS! Not Found
        </h1>
      </div>
    </div>
  );
}


export default NotFound;