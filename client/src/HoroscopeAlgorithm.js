import { useUserData } from "./UserDataContext";

const GenerateHoroscope = () => {
    const { longTermData, shortTermData } = useUserData();

    if (!longTermData || !shortTermData) return ["Loading horoscope..."];

    const shortTopArtists = shortTermData.topArtists
    const shortTopTracks = shortTermData.topTracks
    const longTopArtists = longTermData.topArtists
    const longTopTracks = longTermData.topTracks
    const userName = shortTermData.displayName

    const generateGenreHoroscope = () => {
        const genre = longTopArtists[0].genres[0] || "mystery";

        return `Hey ${userName}, your energy is flowing with the ${genre} vibes today.`;
    }
    
    return [generateGenreHoroscope()];
};

export default GenerateHoroscope;
