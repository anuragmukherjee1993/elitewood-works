const express = require('express');
const path = require('path');
const app = express();

// Ye line Render ko batayegi ki CSS aur Images wahi hain jahan ye file hai
app.use(express.static(__dirname));

// HTML pages serve karne ke liye routing
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/services.html', (req, res) => res.sendFile(path.join(__dirname, 'services.html')));
app.get('/about.html', (req, res) => res.sendFile(path.join(__dirname, 'about.html')));
app.get('/contact.html', (req, res) => res.sendFile(path.join(__dirname, 'contact.html')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('🚀 Server is Live!'));
