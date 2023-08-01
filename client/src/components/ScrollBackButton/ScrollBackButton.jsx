
import React, { useState, useEffect } from 'react';
import { MdArrowUpward } from 'react-icons/md';

import './ScrollBackButton.css';


const ScrollBackButton = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) setShowButton(true);
    else setShowButton(false);
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
        <button className='scroll-back-button'
                onClick={handleButtonClick}
        >
          <MdArrowUpward />
        </button>
      )
    }
    </div>
  );
};


export default ScrollBackButton;