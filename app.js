const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Импорт dotenv

const app = express();
const PORT = process.env.PORT || 3000; // Используйте PORT из .env, если он не определен, используйте 3000

app.use(cors());
app.use(express.json());

let players = [];
function getTopPlayers(players) {
    players.sort((a, b) => b.coins - a.coins);
    return players.slice(0, 20);
}

app.get('/test', (req, res) => {
    res.end();
});

app.get('/list', (req, res) => {
    const topPlayers = getTopPlayers(players);
    res.json(topPlayers);
});

app.post('/list', (req, res) => {
    players.push(req.body);
    res.end();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://${process.env.HOST}:${PORT}`);
});