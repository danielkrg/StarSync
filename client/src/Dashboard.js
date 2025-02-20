import { useUserData } from "./UserDataContext";

function Dashboard() {
    const { longTermData, shortTermData } = useUserData();

    if (!longTermData || !shortTermData) return <h1>Loading Data...</h1>;

    return (
        <div>
            <h1>Hello, {longTermData.displayName}</h1>
            <h1>Your Top 10 Tracks</h1>
            <ul>
                {longTermData.topTracks?.map((track, index) => (
                    <li key={index}>{track.name} by {track.artists[0]}</li>
                ))}
            </ul>

            <h1>Your Top 10 Artists</h1>
            <ul>
                {longTermData.topArtists?.map((artist, index) => (
                    <li key={index}>{artist.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;
