
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
        <button className="scroll-back-button"
                onClick={scrollToTop}
        >
          <MdArrowUpward />
        </button>
      )
    }
    </div>
  );
};


export default ScrollBackButton;