
import React, { useState, useEffect, useRef } from 'react';
import { MdArrowUpward } from 'react-icons/md';

import './ScrollBackButton.css';


const ScrollBackButton = () => {
  const [showButton, setShowButton] = useState(false);
  const [fixed, setFixed] = useState(false);
  const mybutton = useRef(null);

  const handleScroll = () => {
    if (window.scrollY > 300)
    {
      setShowButton(true);
    }
    else
    {
      setShowButton(false);
    }

    /* const windowHeight = window.innerHeight;
    const pageHeight = document.body.scrollHeight;
    const scrollPosition = window.scrollY;
    const remainingDistance = pageHeight - scrollPosition - windowHeight;
    const thresholdDistance = 200;
    
    const footer = document.querySelector('.footer');
    const footerHeight = footer.offsetHeight;
    // console.log( 'page height: ', pageHeight, 'footer height: ', footerHeight, 'REMIANING DISTANE: ', remainingDistance);

    if (remainingDistance === footerHeight)
    {
      console.log('OVERLAPING !!');
      setFixed(true);
    }
    else
    {
      setFixed(false);
    } */

    if (mybutton.current)
    {
      const btnMarginBottom = parseInt(window.getComputedStyle(mybutton.current).getPropertyValue('bottom'));
      let footer = document.querySelector('.footer');
      const footStartPos = footer.getBoundingClientRect().y;

      if (window.innerHeight > footStartPos)
      {
        mybutton.current.style.bottom = `${(window.innerHeight - footStartPos) + btnMarginBottom}px`;
        setFixed(true);
      }
      else
      {
        mybutton.current.style.bottom = '';
        setFixed(false);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleButtonClick = (e) => {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    e.currentTarget.appendChild(ripple);

    const x = e.clientX - e.currentTarget.offsetLeft;
    const y = e.clientY - e.currentTarget.offsetTop;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    setTimeout(() => {
      ripple.remove();
    }, 300);

    scrollToTop();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
    {
      showButton && (
        <button className={`scroll-back-button ${fixed ? 'fixed' : ''}`}
                onClick={handleButtonClick}
                ref={mybutton}
        >
          <MdArrowUpward />
        </button>
      )
    }
    </div>
  );
};


export default ScrollBackButton;