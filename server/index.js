import dotenv from 'dotenv'
dotenv.config();

import express from 'express';
import axios from 'axios';
import cors from 'cors';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL

app.use(cors());
app.use(express.json());
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to `true` if using HTTPS
}));

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

app.get('/', (req, res) => {
    res.redirect(`${FRONTEND_URL}/home`);
});

app.get('/login', (req, res) => {
    const scopes = 'user-top-read';
    res.redirect(
        `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${scopes}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`
    );
});

app.get('/callback', async (req, res) => {
    const code = req.query.code;
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

        req.session.accessToken = response.data.access_token; // Store token in session
        res.redirect(`${FRONTEND_URL}/dashboard`); // Redirect to front end
    } catch (error) {
        console.error('Error getting token:', error.response?.data || error.message);
        res.status(500).send('Authentication failed');
    }
});

app.get('/userdata', async (req, res) => {
    const accessToken = req.session.accessToken;
    const timeRange = req.query.time_range || "long_term";
    if (!accessToken) return res.status(401).send('Not authenticated');

    try {
        const [profileNameResponse, tracksResponse, artistsResponse, playlistResponse] = await Promise.all([
            axios.get('https://api.spotify.com/v1/me/', {
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
            axios.get('https://api.spotify.com/v1/me/top/tracks', {
                headers: { Authorization: `Bearer ${accessToken}` },
                params: { limit: 10, time_range: timeRange },
            }),
            axios.get('https://api.spotify.com/v1/me/top/artists?', {
                headers: { Authorization: `Bearer ${accessToken}` },
                params: { limit: 10, time_range: timeRange },
            }),
            axios.get('https://api.spotify.com/v1/me/playlists?', {
                headers: { Authorization: `Bearer ${accessToken}` }
            })
        ]);

        const topArtistData = artistsResponse.data.items.map(artist => ({
            name: artist.name,
            popularity: Math.round(artist.followers.total/30000000 * 100 * 100)/100,
            image: artist.images.length > 0 ? artist.images[0].url : null,
            genres: artist.genres,
            link: artist.external_urls.spotify
        }));

        const topTrackData = tracksResponse.data.items.map(track => ({
            name: track.name,   
            artists: track.artists.map(artist => artist.name),
            popularity: track.popularity,
            image: track.album.images.length > 0 ? track.album.images[0].url : null,
            link: track.external_urls.spotify 
        }));

        
        const playlistData = playlistResponse.data.items.map(playlist => ({
            name: playlist.name
        }));

        const userName = profileNameResponse.data.display_name;

        res.json({
            displayName: userName,
            topTracks: topTrackData,
            topArtists: topArtistData,
            playlists: playlistData
        });
    } catch (error) {
        console.error('Error fetching data:', error.response?.data || error.message);
        res.status(500).send('Failed to fetch user data');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.send('Logged out');
    });
});

// ---- SERVE FRONTEND IN PRODUCTION ----
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

// Handle client-side routing (e.g., React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running`);
});
