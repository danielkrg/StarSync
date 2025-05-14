import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from './Dashboard';
import Horoscope from './Horoscope';  
import AboutMe from "./AboutMe";
import Error from "./Error";
import { UserDataProvider } from '../Components/UserDataContext';
import { useState, useEffect } from 'react';
import Waves from '../assets/layered-waves.svg?react'

function Home() {
  const api = import.meta.env.VITE_API_BASE_URL;
  const messages = ['Spotify Stats', 'Your Top Tracks', 'Music Horoscope', 'Log in to Begin'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [phase, setPhase] = useState('typing');

  useEffect(() => {
    const currentMessage = messages[currentIndex];

    let timeout;

    if (phase === 'typing') {
      if (displayedText.length < currentMessage.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentMessage.slice(0, displayedText.length + 1));
        }, 100);
      } 
      else {
        // Typing done → pause before deleting
        setTimeout(() => setPhase('pausing'), 2500);
      }
    } 
    else if (phase === 'pausing') {
      // Just hold the message for a bit longer before deleting
      timeout = setTimeout(() => setPhase('deleting'), 2000);
    } 
    else if (phase === 'deleting') {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(currentMessage.slice(0, displayedText.length - 1));
        }, 50);
      } else {
        // Move to next message and start typing
        setCurrentIndex((prev) => (prev + 1) % messages.length);
        setPhase('typing');
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, phase, currentIndex]);

  const handleLogin = () => {
    localStorage.setItem('demoMode', 'false');
    window.location.href = `${api}/login`;
  };

  return (
    <div className="relative flex flex-col h-screen bg-gradient-to-t from-pink-950 from-50% to-indigo-950 overflow-hidden">
      <div className="absolute top-4 right-4 text-right z-50">
        <button
          onClick={() => window.location.href = "/aboutme"}
          className={`font-semibold text-pink-500 hover:text-green-500
          py-2 px-4 rounded-full cursor-pointer
          transition-all duration-300 ease-in-out`}
        >
          Recruiters Click Here
        </button>
      </div>

      <div className="flex flex-col items-center space-y-30 pt-50 flex-grow z-10">
        <h1
          className="font-bold text-5xl text-pink-100 leading-tight h-14"
        >
          {displayedText}
          <span className="animate-blinking-cursor">|</span>
        </h1>

        <button
          onClick={handleLogin}
          className="border-2 border-pink-600 hover:border-green-500 
            font-semibold text-pink-600 hover:text-green-500
            py-2 px-4 rounded-full cursor-pointer
            transition-all duration-300 ease-in-out
            hover:shadow-[0_0_10px_2px_rgba(29,185,84,0.6)]"
        >
          Login With Spotify
        </button>
      </div>

      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-0">
        <Waves className="w-full h-auto" />
      </div>
    </div>
  );
}


function App() {
  return (
    <UserDataProvider>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/horoscope" element={<Horoscope />} />
          <Route path="/aboutme" element={<AboutMe />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </Router>
    </UserDataProvider>
  );
}

export default App;
