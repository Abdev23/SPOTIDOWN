
import React from 'react';
import { 
  FaInstagram, 
  FaFacebookF, 
  FaYoutube,
  FaTwitter
} from 'react-icons/fa';


export const links = [
  {
    id: 1,
    url: '/',
    text: 'home',
  },
  {
    id: 2,
    url: '/about-us',
    text: 'About Us',
  },
  {
    id: 3,
    url: '/services',
    text: 'Services',
  },
  {
    id: 4,
    url: '/contact-us',
    text: 'Contact Us',
  }
];

export const socials = [
  {
    id: 1,
    url: 'https://www.facebook.com/',
    icon: <FaFacebookF />,
  },
  {
    id: 2,
    url: 'https://www.twitter.com',
    icon: <FaTwitter />,
  },
  {
    id: 3,
    url: 'https://www.instagram.com/',
    icon: <FaInstagram />,
  },
  {
    id: 4,
    url: 'https://www.youtube.com/',
    icon: <FaYoutube />,
  },
];
