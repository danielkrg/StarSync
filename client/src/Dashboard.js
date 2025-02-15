import React, { useEffect, useState } from 'react';

function Dashboard() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5001/userdata', { credentials: 'include' }) // Include session cookie
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch data");
                return res.json();
            })
            .then((data) => setUserData(data))
            .catch((err) => setError(err.message));
    }, []);

    if (error) return <h1>Error: {error}</h1>;
    if (!userData) return <h1>Loading Data...</h1>;

    return (
        <div>
            <h1>Your Top 5 Tracks</h1>
            <ul>
                {userData.topTracks?.map((track, index) => (
                    <li key={index}>{track.name} by {track.artists[0].name}</li>
                ))}
            </ul>

            <h1>Your Top 5 Artists</h1>
            <ul>
                {userData.topArtists?.map((artist, index) => (
                    <li key={index}>{artist.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;
