
import React, { useState, useRef, useEffect } from "react";
import {
  FaBars,
  FaSpotify
} from "react-icons/fa";

import { links, socials } from "./Data";
import "./NavBar.css";


const NavBar = () => {

  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    }
    else {
      linksContainerRef.current.style.height = '0px';
    }
  }, [showLinks]);

  return (
    <nav className='navbar'>
      <div className = 'nav-center'>
        <div className = 'nav-header'>
          <div className='nav-header-title'>
            <a href="/">
              <FaSpotify className='nav-header-logo'/>
              &nbsp; SPOTIDOWN
            </a>
          </div>

          <button className = 'nav-toggle'
                  onClick = { () => setShowLinks(!showLinks) }
          >
            <FaBars />
          </button>
        </div>
        
        <div className = 'links-container' ref = {linksContainerRef}>
          <ul className = 'links' ref = {linksRef}>
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
        </div>

        <ul className = 'social-icons'>
          {
            socials.map((socialIcon) => {
              const {id, url, icon} = socialIcon;
              return (
                <li key = {id}>
                  <a href = {url}> {icon} </a>
                </li>
              );
            })
          }
        </ul>
      </div>
    </nav>
  );
}


export default NavBar;
