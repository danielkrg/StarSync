import { useUserData } from "./UserDataContext";

function Dashboard() {
    const { longTermData, shortTermData } = useUserData();

    if (!longTermData || !shortTermData) {
        return "There seems to be an issue finding any data..."
    }

    return (
        <div>
            <h1>Hello {shortTermData.displayName}</h1>
            <h1>Your Top 10 Tracks Of All Time:</h1>
            {longTermData.topTracks && longTermData.topTracks.length > 0 ? (
                <ul>
                    {longTermData.topTracks?.map((track, index) => (
                        <li key={index}>{track.name} by {track.artists[0]}</li>
                    ))}
                </ul>
            ) : (
                <p>You don't have any long term top track data yet</p>
            )}

            <h1>Your Top 10 Artists Of All Time:</h1>
            {longTermData.topArtists && longTermData.topArtists.length > 0 ? (
                <ul>
                    {longTermData.topArtists?.map((artist) => (
                        <li key={artist}>{artist.name} </li>
                    ))}
                </ul>
            ) : (
                <p>You don't have any long term top artist data yet</p>
            )}

            <h1>Your Top 10 Tracks Lately:</h1>
            {shortTermData.topTracks && shortTermData.topTracks.length > 0 ? (
                <ul>
                    {shortTermData.topTracks?.map((track, index) => (
                        <li key={index}>{track.name} by {track.artists[0]}</li>
                    ))}
                </ul>
            ) : (
                <p>You don't have any short term top track data yet</p>
            )}

            <h1>Your Top 10 Artists Lately:</h1>
            {shortTermData.topArtists && shortTermData.topArtists.length > 0 ? (
                <ul>
                    {shortTermData.topArtists?.map((artist) => (
                        <li key={artist}>{artist.name} </li>
                    ))}
                </ul>
            ) : (
                <p>You don't have any short term top artist data yet</p>
            )}
        </div>
    );
}

export default Dashboard;
