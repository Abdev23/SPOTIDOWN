
import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube
} from 'react-icons/fa';


export const links = [
  {
    id: 1,
    url: '/about-us',
    text: 'About Us',
  },
  {
    id: 2,
    url: '/services',
    text: 'Services',
  },
  {
    id: 3,
    url: '/contact-us',
    text: 'Contact Us',
  },
  {
    id: 4,
    url: '/terms',
    text: 'Terms',
  },
  {
    id: 5,
    url: '/privacy-policy',
    text: 'Privacy Policy',
  },
  {
    id: 6,
    url: '/disclaimer',
    text: 'Disclaimer',
  }
];

export const socials = [
  {
    id: 1,
    url: 'https://www.facebook.com',
    icon: <FaFacebookF />,
    className: 'facebook'
  },
  {
    id: 2,
    url: 'https://www.twitter.com',
    icon: <FaTwitter />,
    className: 'twitter'
  },
  {
    id: 3,
    url: 'https://www.instagram.com',
    icon: <FaInstagram />,
    className: 'instagram'
  },
  {
    id: 4,
    url: 'https://www.youtube.com',
    icon: <FaYoutube />,
    className: 'youtube'
  },
];
