const express = require('express');
const path = require('path');
const app = express();

// Render ko batao ki saari files 'api' folder mein hain
app.use(express.static(__dirname));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/services', (req, res) => res.sendFile(path.join(__dirname, 'services.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'about.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'contact.html')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('✅ Server is back online!'));
