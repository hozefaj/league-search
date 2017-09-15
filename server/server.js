const dotenv = require('dotenv').config(); // Requires the environment variables
const express = require('express');
const request = require('request');
const app = express(); // Initialize the server
const RIOT_API_KEY = process.env.RIOT_API_KEY; // API KEY
const port = process.env.PORT || 3001; // Set the port to 3001

app.listen(port);

app.get('/api/:summoner', (req, res) => {
    const { summoner } = req.params;
    const url = `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${summoner}?api_key=${RIOT_API_KEY}`;

    request(url, (error, response, body) => {
        var obj = JSON.parse(body);
        const url2 = `https://na1.api.riotgames.com/lol/spectator/v3/active-games/by-summoner/${obj.id}?api_key=${RIOT_API_KEY}`;
        request(url2, (error, response, body) => {
            res.send(body);
        })
    });
});
console.log(`express app listening on port ${port}`);