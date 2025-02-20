require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
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
    res.send('Spotify Horoscope Backend is running!');
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
        res.redirect('http://localhost:3000/dashboard'); // Redirect to front end
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
        const [profileNameResponse, tracksResponse, artistsResponse] = await Promise.all([
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
            })
        ]);

        const topArtistData = artistsResponse.data.items.map(artist => ({
            name: artist.name,
            numFollowers: artist.followers.total,
            genres: artist.genres
        }));

        const topTrackData = tracksResponse.data.items.map(track => ({
            name: track.name,   
            artists: track.artists.map(artist => artist.name), 
            popularity: track.popularity
        }));

        const userName = profileNameResponse.data.display_name;

        res.json({
            displayName: userName,
            topTracks: topTrackData,
            topArtists: topArtistData
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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
