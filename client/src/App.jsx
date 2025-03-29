import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from './Dashboard';
import Horoscope from './Horoscope';
import { UserDataProvider } from './UserDataContext';
import { useState, useEffect } from 'react';
import Waves from './assets/layered-waves.svg?react'

function Home() {
  const messages = ['Spotify Stats', 'Your Top Tracks', 'Music Horoscope', 'Log in to Begin'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [phase, setPhase] = useState('typing'); // 'typing', 'pausing', 'deleting'

  useEffect(() => {
    const currentMessage = messages[currentIndex];

    let timeout;

    if (phase === 'typing') {
      if (displayedText.length < currentMessage.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentMessage.slice(0, displayedText.length + 1));
        }, 100);
      } else {
        // Typing done → pause before deleting
        setTimeout(() => setPhase('pausing'), 2500);
      }
    } else if (phase === 'pausing') {
      // Just hold the message for a bit longer before deleting
      timeout = setTimeout(() => setPhase('deleting'), 2000);
    } else if (phase === 'deleting') {
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
    window.location.href = "http://localhost:5001/login";
  };

  return (
    <div className="relative flex flex-col h-screen bg-gradient-to-t from-pink-950 from-50% to-indigo-950 overflow-hidden">
      <div className="flex flex-col items-center space-y-30 pt-50 flex-grow">
        <h1
          className="animate-blink overflow-hidden whitespace-nowrap 
          border-r-4 border-r-white 
          font-bold text-5xl text-pink-100 leading-tight h-14"
        >
          {displayedText}
        </h1>

        <button
          onClick={handleLogin}
          className="border-2 border-pink-600 hover:border-green-500 
            font-semibold text-pink-600 hover:text-green-500
            py-2 px-4 rounded-full 
            transition-all duration-300 ease-in-out"
        >
          Login with Spotify
        </button>
      </div>

      <div className="absolute bottom-0 left-0 w-full pointer-events-none">
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
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/horoscope" element={<Horoscope />} />
        </Routes>
      </Router>
    </UserDataProvider>
  );
}

export default App;
