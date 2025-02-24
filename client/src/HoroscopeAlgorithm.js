import { useUserData } from "./UserDataContext";

const GenerateHoroscope = () => {
    const { longTermData, shortTermData } = useUserData();

    if (!longTermData || !shortTermData) return "Loading horoscope...";

    const shortTopArtists = shortTermData.topArtists
    const shortTopTracks = shortTermData.topTracks
    const longTopArtists = longTermData.topArtists
    const longTopTracks = longTermData.topTracks
    const userName = shortTermData.displayName

    console.log(longTopArtists)
    
    const genre = longTopArtists[0].genres[0] || "mystery";

    return `Hey ${userName}, your energy is flowing with the ${genre} vibes today.`;
};

export default GenerateHoroscope;
