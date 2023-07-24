
import React from 'react';

import FaqAccordionItem from './FaqAccordionItem';
import faqs from './Data';
import './FaqAccordion.css';


const FaqAccordion = () => {

  return (
    <div className='faq-accordion'>
      <div className='faq-accordion-title'>
        <h2> FAQs </h2>
        <div className='faq-accordion-title-underline'></div>
      </div>

      {
        faqs.map((faq, i) => {
          const {question, answer} = faq;
          return (
            <FaqAccordionItem key={i} question={question} answer={answer}/>
          );
        })
      }
    </div>
  );
}


export default FaqAccordion;