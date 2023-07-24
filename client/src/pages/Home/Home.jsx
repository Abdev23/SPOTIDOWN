
import React from 'react';

import Hero from '../../components/Hero/Hero';
import SearchBar from '../../components/SearchBar/SearchBar';
import Instructions from '../../components/Instructions/Instructions';
import FaqAccordion from '../../components/FaqAccordion/FaqAccordion';
import './Home.css';


const Home = () => {

  return (
    <div className='home'>
      <Hero />
      <SearchBar />
      <Instructions />
      <FaqAccordion />
    </div>
  )
}


export default Home;