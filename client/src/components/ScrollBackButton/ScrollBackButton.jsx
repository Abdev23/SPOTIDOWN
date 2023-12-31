
import React, { useState, useEffect, useRef } from 'react';
import { MdArrowUpward } from 'react-icons/md';

import './ScrollBackButton.css';


const ScrollBackButton = () => {
  const [showButton, setShowButton] = useState(false);
  const [fixed, setFixed] = useState(false);
  const scrollBackBtnRef = useRef(null);

  const handleScroll = () => {
    if (window.scrollY > 300)
    {
      setShowButton(true);
    }
    else
    {
      setShowButton(false);
    }

    /* if (scrollBackBtnRef.current)
    {
      const footer = document.querySelector('.footer');
      const footStartPos = footer.getBoundingClientRect().y;
      const windowHeight = window.innerHeight;
      const btnMarginBottom = parseInt(window.getComputedStyle(scrollBackBtnRef.current).getPropertyValue('bottom'));

      if (windowHeight > footStartPos)
      {
        const overlap = (windowHeight - footStartPos) + btnMarginBottom;
        console.log('overlapping: ', overlap);

        scrollBackBtnRef.current.style.bottom = `${overlap}px`;
        setFixed(true);
      }
      else
      {
        scrollBackBtnRef.current.style.bottom = '';
        setFixed(false);
      }
    } */
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
                ref={scrollBackBtnRef}
        >
          <MdArrowUpward />
          <span className='ping'></span>
        </button>
      )
    }
    </div>
  );
};


export default ScrollBackButton;