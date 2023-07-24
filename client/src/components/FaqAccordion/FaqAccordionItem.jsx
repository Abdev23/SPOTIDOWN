
import React, { useState, useRef } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

import './FaqAccordion.css';


const FaqAccordionItem = ({question, answer}) => {
  const [isOpen, setIsOpen] = useState(false);
  const answerRef = useRef();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`accordion-item ${isOpen ? 'active' : ''}`}>
      <button className={`accordion-question ${isOpen ? 'selected' : ''}`}
              onClick={handleToggle}
      >
        { question }
        <span className='accordion-control'>
        {
          <MdKeyboardArrowDown className='down'/>
        }
        </span>
      </button>

      <div className='accordion-answer'>
        {answer}
      </div>
    </div>
  );
}

// change her
export default FaqAccordionItem;