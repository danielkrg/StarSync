import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from './Dashboard';
import Horoscope from "./Horoscope";
import { UserDataProvider } from "./UserDataContext";

function Home() {
  const handleLogin = () => {
    window.location.href = "http://localhost:5001/login"; // Redirect to backend
  };

  return (
    <div>
      <h1>Spotify Stats</h1>
      <button onClick={handleLogin}>Login with Spotify</button>
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
