//import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import axios from "axios";
import Dashboard from './Dashboard';

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

// function UserData() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5001/userdata", { withCredentials: true }) // Fetch from backend
//       .then((response) => setData(response.data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   return (
//     <div>
//       <h1>Your Top Tracks & Artists</h1>
//       {data ? (
//         <>
//           <h2>Top Tracks</h2>
//           <ol>
//             {data.topTracks.map((track, index) => (
//               <li key={index}>
//                 {track.name} by {track.artists[0].name}
//               </li>
//             ))}
//           </ol>

//           <h2>Top Artists</h2>
//           <ol>
//             {data.topArtists.map((artist, index) => (
//               <li key={index}>{artist.name}</li>
//             ))}
//           </ol>
//         </>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
