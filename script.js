const express = require('express');
const path = require('path');
const app = express();

// Sabhi files aur Images folder ko serve karne ke liye
app.use(express.static(__dirname));

// Routes - seedha file serve karega
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/services.html', (req, res) => res.sendFile(path.join(__dirname, 'services.html')));
app.get('/about.html', (req, res) => res.sendFile(path.join(__dirname, 'about.html')));
app.get('/contact.html', (req, res) => res.sendFile(path.join(__dirname, 'contact.html')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 EliteWood Works is Live on Port ${PORT}`));
