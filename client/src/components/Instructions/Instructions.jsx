
import React from 'react';

import Data from './Data';
import './Instructions.css';


const Instructions = () => {

  return (
    <section className='instructions'>
      <div className='instructions-title'>
        <h2>Instructions</h2>
        <div className='title-underline'></div>
      </div>

      <div className='instructions-center'>
      {
        Data.map((instr, i) => {
          // console.log(instr);
          const {image, title} = instr;

          return (
            <div className='instruction'
                 key={i}
            >
              <img src={image}
                   alt={`instruction-1${i}`}
                   className='img'
                   draggable='false'
              />
              <h5> {title} </h5>
            </div>
          );
        })
      }
      </div>
    </section>
  );
};


export default Instructions;
