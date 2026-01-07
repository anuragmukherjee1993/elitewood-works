const express = require('express');
const path = require('path');
const app = express();

// Static files (CSS, Images, JS) serve karne ke liye
app.use(express.static(__dirname));

// Saare HTML pages ko serve karne ke liye logic
app.get('/:page', (req, res, next) => {
    const page = req.params.page;
    if (page.endsWith('.html')) {
        res.sendFile(path.join(__dirname, page));
    } else {
        next();
    }
});

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
