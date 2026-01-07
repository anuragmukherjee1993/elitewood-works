const express = require('express');
const path = require('path');
const app = express();

// Kyunki script.js khud 'api' folder mein hai, hum '.' use karenge
app.use(express.static(__dirname));

// Routes - seedha file name use karo kyunki script wahi baithi hai jahan html files hain
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/services', (req, res) => res.sendFile(path.join(__dirname, 'services.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'about.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'contact.html')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 EliteWood Server Live on Port ${PORT}`));
