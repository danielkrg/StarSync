import { useUserData } from "./UserDataContext";
import {opposingTransitionsArray, agreeingTransitionsArray, unpopularArray, popularArray, similarArray, notSimilarArray, options, happyArray, balancedArray, introspectiveArray} from "./HoroscopeArrays";
import Sentiment from 'sentiment';

const GenerateHoroscope = () => {
    const { longTermData, shortTermData } = useUserData();

    const sentiment = new Sentiment();

    const data = initializeVariables(longTermData, shortTermData);

    const generatePopularityHoroscope = () => {
        if (!data) {
            return
        }
        if (!data.popularity) {
            return 'It seems as though you have beat our algorithm, you are an enigma.'
        }

        const minPopularity = Math.min(...data.popularity)
        const maxPopularity = Math.max(...data.popularity)
        const avgPopularity = data.popularity.reduce((a, b) => a + b, 0) / data.popularity.length

        let response = ""

        let i = Math.floor(Math.random() * unpopularArray.length);
        let j = Math.floor(Math.random() * unpopularArray.length);
        let l = Math.floor(Math.random() * opposingTransitionsArray.length);

        while (i === j) {
            j = Math.floor(Math.random() * unpopularArray.length);
        }

        if (avgPopularity < 50) {
            response += unpopularArray[i] + " " + unpopularArray[j]

            if (maxPopularity >= avgPopularity * 1.6 || maxPopularity >= minPopularity * 2.5) {
                i = Math.floor(Math.random() * popularArray.length);
                response += " " + opposingTransitionsArray[l] + popularArray[i].toLowerCase();
            }
        }
        else {
            response += popularArray[i] + " " + popularArray[j]

            if (maxPopularity >= avgPopularity * 1.6 || maxPopularity >= minPopularity * 2.5) {
                i = Math.floor(Math.random() * unpopularArray.length);
                response += " " + opposingTransitionsArray[l] + unpopularArray[i].toLowerCase();
            }
        }

        return response
    }

    const generateSimilarityHoroscope = () => {
        if (!data) {
            return
        }
        if (!data.shortTrackNames && !data.longTrackNames) {
            return 'Your energy is something unique, a facinating array of complexity.'
        }
        
        let numSame = 0
        let response = ""
        let i = Math.floor(Math.random() * similarArray.length);
        let j = Math.floor(Math.random() * similarArray.length);
        while(j === i) {
            j = Math.floor(Math.random() * similarArray.length);
        }

        data.shortTrackNames.forEach((track) => {
            if (data.longTrackNames.includes(track)) {
                numSame += 1;
            }
        });

        data.shortArtistNames.forEach((artist) => {
            if (data.longArtistNames.includes(artist)) {
                numSame += 1;
            }
        });

        if (numSame >= 6) {
            response += similarArray[i] + " " + similarArray[j]
        }
        else {
            response += notSimilarArray[i] + " " + notSimilarArray[j]
        }

        return response
    }

    const generatePlaylistHoroscope = () => {
        if (!data) {
            return
        }
        if (!data.playlists) {
            return 'Protect your spirit against those who may be wanting to harm.'
        }
        
        let scores = [];

        let response = "";

        data.playlists.forEach((playlist) => {
            var sentimentScore = sentiment.analyze(playlist, options).score;
            scores.push(sentimentScore);
        });

        let minScore = Math.min(scores);
        let maxScore = Math.max(scores);
        let numZeros = scores.reduce((total, x) => total + (x === 0), 0);
        let avgScore = scores.reduce((a, b) => a + b, 0) / (scores.length - numZeros);

        let i = Math.floor(Math.random() * happyArray.length);
        let j = Math.floor(Math.random() * happyArray.length);
        let l = Math.floor(Math.random() * agreeingTransitionsArray.length);

        while (i === j) {
            j = Math.floor(Math.random() * happyArray.length);
        }

        if (avgScore >= 3) {
            response += happyArray[i] + " " + happyArray[j]
            
            if (minScore <= -5) {
                i = Math.floor(Math.random() * introspectiveArray.length);

                response += " " + agreeingTransitionsArray[l] + introspectiveArray[i].toLowerCase();
            }
        }
        else if (avgScore <= -2) {
            response += introspectiveArray[i] + " " + introspectiveArray[j]
            
            if (maxScore >= 5) {
                i = Math.floor(Math.random() * happyArray.length);

                response += " " + agreeingTransitionsArray[l] + happyArray[i].toLowerCase();
            }
        }
        else {
            response += balancedArray[i] + " " + balancedArray[j]
            
            if (minScore <= -5) {
                i = Math.floor(Math.random() * introspectiveArray.length);

                response += " " + agreeingTransitionsArray[l] + introspectiveArray[i].toLowerCase();
            }
            else if (maxScore >= 5) {
                i = Math.floor(Math.random() * happyArray.length);

                response += " " + agreeingTransitionsArray[l] + happyArray[i].toLowerCase();
            }
        }

        return response
    }

    
    return [generatePopularityHoroscope(), generateSimilarityHoroscope(), generatePlaylistHoroscope()];
};

function initializeVariables(longTermData, shortTermData) {
    if (!shortTermData || !longTermData) {
        return
    }

    return {
        shortTopArtists: shortTermData.topArtists,
        shortTopAlbums: shortTermData.topAlbums,
        shortTopTracks: shortTermData.topTracks,
        longTopArtists: longTermData.topArtists,
        longTopAlbums: longTermData.topAlbums,
        longTopTracks: longTermData.topTracks,
        userName: shortTermData.displayName,
        playlists: [...shortTermData.playlists?.map(playlist => playlist.name) || []],

        allGenres: [
            ...longTermData.topArtists?.map(artist => artist.genres || []),
            ...shortTermData.topArtists?.map(artist => artist.genres || [])
        ],
        popularity: [
            ...(longTermData.topTracks?.map(track => track.popularity) || []),
            ...(shortTermData.topTracks?.map(track => track.popularity) || []),
            ...(longTermData.topAlbums? Object.values(longTermData.topAlbums).map(album => album.popularity) : []),
            ...(shortTermData.topAlbums? Object.values(shortTermData.topAlbums).map(album => album.popularity) : [])
        ],

        shortTrackNames: [...shortTermData.topTracks?.map(track => track.name) || []],
        longTrackNames: [...longTermData.topTracks?.map(track => track.name) || []],
        shortArtistNames: [...shortTermData.topArtists?.map(artist => artist.name) || []],
        longArtistNames: [...longTermData.topArtists?.map(artist => artist.name) || []]
    }
} 

export default GenerateHoroscope;
