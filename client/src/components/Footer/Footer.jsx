
import React from 'react';
import { FaSpotify } from 'react-icons/fa';

import { links, socials } from './Data';
import './Footer.css';


const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-magic first'>
        <div className='footer-magic-blob'>
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
                          values='M801 575.5q-150 75.5-225.5 178T349 829q-151-27-118-178t49-253q16-102 118-124.5t217-13Q730 270 840.5 385T801 575.5Z;
                                  M896 675q-46 175-221 114.5T403.5 711Q307 693 281 596.5t3.5-189.5Q314 314 407 229.5t183 3Q680 320 811 410t85 265Z;
                                  M772.5 634.5Q769 769 634.5 823T422 766.5Q344 656 203 578t-54.5-210.5Q235 235 367.5 176t272-7q139.5 52 138 191.5t-5 274Z;
                                  M790 653q16 153-137 172t-315 9q-162-10-195-172t66-258q99-96 195-122t246-54q150-28 137 122t3 303Z;
                                  M727 581q-65 81-146 133.5T331.5 802q-168.5 35-177-133.5t63-274Q289 289 394.5 260T636 229.5Q772 228 782 364t-55 217Z;
                                  M801 575.5q-150 75.5-225.5 178T349 829q-151-27-118-178t49-253q16-102 118-124.5t217-13Q730 270 840.5 385T801 575.5Z'
                >
                </animate>
              </path>
            </g>
          </svg>
        </div>
        <div className='footer-magic-blob'>
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
                          values='M801 575.5q-150 75.5-225.5 178T349 829q-151-27-118-178t49-253q16-102 118-124.5t217-13Q730 270 840.5 385T801 575.5Z;
                                  M896 675q-46 175-221 114.5T403.5 711Q307 693 281 596.5t3.5-189.5Q314 314 407 229.5t183 3Q680 320 811 410t85 265Z;
                                  M772.5 634.5Q769 769 634.5 823T422 766.5Q344 656 203 578t-54.5-210.5Q235 235 367.5 176t272-7q139.5 52 138 191.5t-5 274Z;
                                  M790 653q16 153-137 172t-315 9q-162-10-195-172t66-258q99-96 195-122t246-54q150-28 137 122t3 303Z;
                                  M727 581q-65 81-146 133.5T331.5 802q-168.5 35-177-133.5t63-274Q289 289 394.5 260T636 229.5Q772 228 782 364t-55 217Z;
                                  M801 575.5q-150 75.5-225.5 178T349 829q-151-27-118-178t49-253q16-102 118-124.5t217-13Q730 270 840.5 385T801 575.5Z'
                >
                </animate>
              </path>
            </g>
          </svg>
        </div>
      </div>

      <div className='footer-magic second'>
        <div className='footer-magic-blob'>
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
                          values='M910.5 644q-67.5 144-198 233t-247-13Q349 762 201.5 712T75 507.5Q96 353 190 240t229-81q135 32 267 53t212 154.5Q978 500 910.5 644Z;
                                  M818.5 627.5Q804 755 681 793.5t-276.5 88q-153.5 49.5-259-82t-40-275.5Q171 380 238 271t200-141q133-32 248.5 42t131 201q15.5 127 1 254.5Z;
                                  M837.5 616q-61.5 116-172 156.5t-220 26.5Q336 785 186 727t-76.5-200Q183 385 238 263.5T425.5 157q132.5 15 225 77T821 398q78 102 16.5 218Z;
                                  M813.5 597Q732 694 658 834.5T421.5 946q-162.5-29-217-174t-87-284Q85 349 184 236.5t246.5-145q147.5-32.5 255 65T844 377q51 123-30.5 220Z;
                                  M782.5 605.5Q752 711 665 827t-230.5 75Q291 861 188 756t-34-231q69-126 128-213.5T453 177q112-47 270-21.5t124 185q-34 159.5-64.5 265Z;
                                  M910.5 644q-67.5 144-198 233t-247-13Q349 762 201.5 712T75 507.5Q96 353 190 240t229-81q135 32 267 53t212 154.5Q978 500 910.5 644Z;'
                >
                </animate>
              </path>
            </g>
          </svg>
        </div>
        <div className='footer-magic-blob'>
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
                          values='M910.5 644q-67.5 144-198 233t-247-13Q349 762 201.5 712T75 507.5Q96 353 190 240t229-81q135 32 267 53t212 154.5Q978 500 910.5 644Z;
                                  M818.5 627.5Q804 755 681 793.5t-276.5 88q-153.5 49.5-259-82t-40-275.5Q171 380 238 271t200-141q133-32 248.5 42t131 201q15.5 127 1 254.5Z;
                                  M837.5 616q-61.5 116-172 156.5t-220 26.5Q336 785 186 727t-76.5-200Q183 385 238 263.5T425.5 157q132.5 15 225 77T821 398q78 102 16.5 218Z;
                                  M813.5 597Q732 694 658 834.5T421.5 946q-162.5-29-217-174t-87-284Q85 349 184 236.5t246.5-145q147.5-32.5 255 65T844 377q51 123-30.5 220Z;
                                  M782.5 605.5Q752 711 665 827t-230.5 75Q291 861 188 756t-34-231q69-126 128-213.5T453 177q112-47 270-21.5t124 185q-34 159.5-64.5 265Z;
                                  M910.5 644q-67.5 144-198 233t-247-13Q349 762 201.5 712T75 507.5Q96 353 190 240t229-81q135 32 267 53t212 154.5Q978 500 910.5 644Z;'
                >
                </animate>
              </path>
            </g>
          </svg>
        </div>
      </div>

      <div className='footer-socials'>
      {
        socials.map((socialIcon) => {
          const {id, url, icon, className} = socialIcon;
          return (
            <a key={id}
               href={url}
               target='_blank'
               className={`fa fa-${className}`}
            >
              {icon}
            </a>
          );
        })
      }
      </div>

      <ul className='footer-links'>
      {
        links.map((link) => {
          const {id, url, text} = link;
          return (
            <li key = {id}>
              <a href = {url}> {text} </a>
            </li>
          );
        })
      }
      </ul>

      <p className='footer-copyright'>
        <a href='/'> <FaSpotify /> SPOTIDOWN.com </a> &nbsp;&copy;&nbsp; 2023 All Rights Reserved.
      </p>
    </div>
  );
}

export default Footer;