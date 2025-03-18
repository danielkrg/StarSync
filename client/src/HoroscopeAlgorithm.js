import { useUserData } from "./UserDataContext";
import {transitions, unpopularArray, popularArray} from "./HoroscopeArrays";

const GenerateHoroscope = () => {
    const { longTermData, shortTermData } = useUserData();

    if (!longTermData || !shortTermData) return ["Loading horoscope..."];

    const shortTopArtists = shortTermData.topArtists
    const shortTopAlbums = shortTermData.topAlbums
    const shortTopTracks = shortTermData.topTracks
    const longTopArtists = longTermData.topArtists
    const longTopAlbums = longTermData.topAlbums
    const longTopTracks = longTermData.topTracks
    const userName = shortTermData.displayName
    const playlists = shortTermData.playlists

    const allGenres = [
        ... longTopArtists.map(artist => artist.genres),
        ... shortTopArtists.map(artist => artist.genres)
    ]
    const popularity = [
        ...(longTopTracks?.map(track => track.popularity) || []),
        ...(shortTopTracks?.map(track => track.popularity) || []),
        ...(longTopAlbums ? Object.values(longTopAlbums).map(album => album.popularity) : []),
        ...(shortTopAlbums ? Object.values(shortTopAlbums).map(album => album.popularity) : [])
    ];

    const generatePopularityHoroscope = () => {
        const minPopularity = Math.min(...popularity)
        const maxPopularity = Math.max(...popularity)
        const avgPopularity = popularity.reduce((a, b) => a + b) / popularity.length

        let response = ""

        let i = Math.floor(Math.random() * unpopularArray.length);
        let j = Math.floor(Math.random() * unpopularArray.length);
        while(j === i) {
            j = Math.floor(Math.random() * unpopularArray.length);
        }
        let l = Math.floor(Math.random() * transitions.length);

        if (avgPopularity < 50) {
            response += unpopularArray[i] + " " + unpopularArray[j]
            if (maxPopularity >= avgPopularity * 1.6 || maxPopularity >= minPopularity * 2.5) {
                response += " " + transitions[l] + popularArray[i].toLowerCase()
            }
        }
        else {
            response += popularArray[i] + " " + popularArray[j]
            if (minPopularity <= avgPopularity * 0.6 || maxPopularity >= minPopularity * 2.5) {
                response +=  " " + transitions[l] + unpopularArray[i].toLowerCase()
            }
        }

        return response
    }
    
    return [generatePopularityHoroscope()];
};

export default GenerateHoroscope;
