import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from './Dashboard';
import Horoscope from "./Horoscope";
import { UserDataProvider } from "./UserDataContext";

function Home() {
  const handleLogin = () => {
    window.location.href = "http://localhost:5001/login"; // Redirect to backend
  };

  return (
  <div className="flex justify-center items-center h-screen">
    <div className="flex flex-col items-center space-y-30">
      <h1 
        className="animate-fadeInOut text-5xl text-white font-bold"
      >
        Spotify Stats
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
