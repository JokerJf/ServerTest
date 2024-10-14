const express = require('express');
const cors = require('cors');
const fs = require('fs'); // Импортируем модуль fs
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

let players = [];

// Функция для загрузки игроков из файла
function loadPlayers() {
    try {
        const data = fs.readFileSync('save.json', 'utf8');
        data.length != 0 ? players = JSON.parse(data) : []
        // players = JSON.parse(data);
        // console.log(data);
    } catch (err) {
        console.error('Error reading save.json:', err);
    }
}

// Функция для сохранения игроков в файл
function savePlayers(pls) {
    try {
        fs.writeFileSync('save.json', JSON.stringify(pls, null, 2));
    } catch (err) {
        console.error('Error writing to save.json:', err);
    }
}

function getTopPlayers(players) {
    players.sort((a, b) => b.coins - a.coins);
    return players.slice(0, 20);
}

// Загрузить игроков при старте сервера
loadPlayers();

app.get('/test', (req, res) => {
    res.end();
});

app.get('/list', (req, res) => {
    const topPlayers = getTopPlayers(players);
    savePlayers(topPlayers); // Сохраняем игроков после добавления нового
    res.json(topPlayers);
});

app.post('/list', (req, res) => {
    players.push(req.body);
    savePlayers(players); // Сохраняем игроков после добавления нового
    res.end();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://${process.env.HOST}:${PORT}`);
});