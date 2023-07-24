
import React, { useState, useEffect } from 'react';
import { MdOutlineCloudOff } from 'react-icons/md';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import AboutUs from './pages/AboutUs/AboutUs';
import Services from './pages/Services/Services';
import ContactUs from './pages/ContactUs/ContactUs';
import Terms from './pages/Terms/Terms';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import Disclaimer from './pages/Disclaimer/Disclaimer';
import './App.css';


const Layout = () => {
  return (
    <div className='app'>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/about-us',
        element: <AboutUs />
      },
      {
        path: '/Services',
        element: <Services />
      },
      {
        path: '/contact-us',
        element: <ContactUs />
      },
      {
        path: '/terms',
        element: <Terms />
      },
      {
        path: '/privacy-policy',
        element: <PrivacyPolicy />
      },
      {
        path: '/disclaimer',
        element: <Disclaimer />
      }
    ]
  }
]);


function App() {
  const [online, setOnline] = useState(navigator.onLine);
  const [offline, setOffline] = useState(false);
  const [offlineText, setOfflineText] = useState(false);

  useEffect(() => {
    function checkOnlineStatus() {
      setOnline(navigator.onLine);
    }

    checkOnlineStatus();
    window.addEventListener('online', checkOnlineStatus);
    window.addEventListener('offline', checkOnlineStatus);

    return () => {
      window.removeEventListener('online', checkOnlineStatus);
      window.removeEventListener('offline', checkOnlineStatus);
    };
  }, []);

  useEffect(() => {
    let timer;

    if (!online)
    {
      console.log('youreeeeeee offline');
      timer = setTimeout(() => {
        setOffline(true);
        setTimeout(() => {
          setOfflineText(true);
        }, 2000);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [online]);

  return (
    <>
      <RouterProvider router={router} />
      {
      !online && (
        <div className={`offline-indicator ${offline ? 'show' : ''}`}>
          <span className={`offline-icon ${offline ? 'show' : ''}`}>
            <MdOutlineCloudOff/> 
            {
              offlineText && <span className={`offline-icon-message ${offlineText ? 'show' : ''}`}>
                                {'  '} You're offline
                             </span>
            }
          </span>
          <span className="offline-text"> Please check your internet connection. </span>
        </div>
      )
      }
      <style>
      {
        `
          .app {
            opacity: ${online ? '1' : '0.2'};
            pointer-events: ${online ? 'auto' : 'none'};
            user-select: ${online ? 'auto' : 'none'};
          }
        `
      }
      </style>
    </>
  )
}


export default App;