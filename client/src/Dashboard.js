import { useUserData } from "./UserDataContext";

function Dashboard() {
    const userData = useUserData();

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
