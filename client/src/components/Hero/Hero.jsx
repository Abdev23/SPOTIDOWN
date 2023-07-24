
import React, { useEffect } from 'react';
import { GiPolarStar } from 'react-icons/gi';

import pic1 from '../../assets/pic1.svg';
import './Hero.css';


const Hero = () => {
  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const animate = (star) => {
    star.style.setProperty('--star-left', `${rand(-10, 100)}%`);
    star.style.setProperty('--star-top', `${rand(-40, 80)}%`);

    star.style.animation = 'none';
    star.offsetHeight;
    star.style.animation = '';
  }

  useEffect(() => {
   let index = 0;
    const interval = 1500;
    const stars = document.getElementsByClassName('magic-star');

    const intervalId = setInterval(() => {
      animate(stars[index % stars.length]);
      index++;
    }, interval / 3);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className='hero'>
      <div className='hero-center'>
        <div className='hero-title'>
          <span className='magic'>
            <div className='magic-blob'>
              <svg id='blob-svg'
                   viewBox='0 0 1000 1000'
                   xmlns='http://www.w3.org/2000/svg'>
                <defs>
                  <linearGradient id='b' gradientTransform='rotate(270 .5 .5)'>
                    <stop offset='0%' stopColor='#19b752'/>
                    <stop offset='100%' stopColor='#636363'/>
                  </linearGradient>
                </defs>
                
                <g clipPath='url(#a)'>
                  <path fill='url(#b)'>
                    <animate attributeName='d'
                             dur='10000ms'
                             repeatCount='indefinite'
                             values='M760.5 585.5q-89.5 85.5-175 211t-195 24Q281 719 206 609.5T191.5 376Q252 252 376 195.5T607.5 212q107.5 73 175 180.5t-22 193Z;
                                     M754.5 602.5Q705 705 602.5 823T362 858.5Q224 776 158 638t61-215q127-77 204-197t155-1q78 119 152 197t24.5 180.5Z;
                                     M872.5 628Q756 756 628 846t-212.5-43.5q-84.5-133.5-220-218T114 334q54-166 220-106.5T586.5 307Q673 327 831 413.5T872.5 628Z;
                                     M711 601q-9 101-110 112.5T333.5 779Q167 833 95.5 666.5T167 405q143-95 238-158t200-10q105 53 110 158t-4 206Z;
                                     M733.5 589Q678 678 589 825t-175.5-2.5q-86.5-149.5-199-236T188 387q86-113 199-112t278-52q165-53 144.5 112t-76 254Z;
                                     M760.5 585.5q-89.5 85.5-175 211t-195 24Q281 719 206 609.5T191.5 376Q252 252 376 195.5T607.5 212q107.5 73 175 180.5t-22 193Z'
                    >
                    </animate>
                  </path>
                </g>
              </svg>
            </div>
            <div className='magic-blob'>
              <svg id='blob-svg'
                   viewBox='0 0 1000 1000'
                   xmlns='http://www.w3.org/2000/svg'>
                <defs>
                  <linearGradient id='b' gradientTransform='rotate(270 .5 .5)'>
                    <stop offset='0%' stopColor='#19b752'/>
                    <stop offset='100%' stopColor='#636363'/>
                  </linearGradient>
                </defs>
                
                <g clipPath='url(#a)'>
                  <path fill='url(#b)'>
                    <animate attributeName='d'
                             dur='10000ms'
                             repeatCount='indefinite'
                             values='M760.5 585.5q-89.5 85.5-175 211t-195 24Q281 719 206 609.5T191.5 376Q252 252 376 195.5T607.5 212q107.5 73 175 180.5t-22 193Z;
                                     M754.5 602.5Q705 705 602.5 823T362 858.5Q224 776 158 638t61-215q127-77 204-197t155-1q78 119 152 197t24.5 180.5Z;
                                     M872.5 628Q756 756 628 846t-212.5-43.5q-84.5-133.5-220-218T114 334q54-166 220-106.5T586.5 307Q673 327 831 413.5T872.5 628Z;
                                     M711 601q-9 101-110 112.5T333.5 779Q167 833 95.5 666.5T167 405q143-95 238-158t200-10q105 53 110 158t-4 206Z;
                                     M733.5 589Q678 678 589 825t-175.5-2.5q-86.5-149.5-199-236T188 387q86-113 199-112t278-52q165-53 144.5 112t-76 254Z;
                                     M760.5 585.5q-89.5 85.5-175 211t-195 24Q281 719 206 609.5T191.5 376Q252 252 376 195.5T607.5 212q107.5 73 175 180.5t-22 193Z'
                    >
                    </animate>
                  </path>
                </g>
              </svg>
            </div>
            <span className='magic-star'>
              <GiPolarStar/>
            </span>
            <span className='magic-star'>
              <GiPolarStar/>
            </span>
            <span className='magic-star'>
              <GiPolarStar/>
            </span>

            <h1 className='magic-text'>SPOTIDOWN</h1>
          </span>
          <p>
            Know what you want to listen to?
          </p>
          <p>
            Just search by keywords or past the Copy link
            and Download tracks, albums and playlists from Spotify instantly.
          </p>
        </div>

        <div className='img-container'>
          <img src={pic1}
               className='img'
               alt='music image'
               draggable='false'
          />
        </div>
      </div>
    </section>
  );
};


export default Hero;