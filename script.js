const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 1. Static Files Middleware (Sabse pehle rakho)
// Isse CSS, Images aur JS files automatically mil jayengi
app.use(express.static(__dirname));

// 2. MongoDB Atlas Connection
const mongoURI = 'mongodb+srv://admin:EliteWood2026@cluster0.sr86mps.mongodb.net/?appName=Cluster0';
mongoose.connect(mongoURI)
    .then(() => console.log("🚀 BINGO: MongoDB Atlas connected!"))
    .catch(err => console.log("❌ Connection error:", err));

// --- CONTACT FORM LOGIC ---
const InquirySchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Inquiry = mongoose.model('Inquiry', InquirySchema);

// API Route for Form Submission
app.post('/api/contact', async (req, res) => {
    try {
        const newInquiry = new Inquiry(req.body);
        await newInquiry.save();
        res.status(200).send({ message: 'Success! Inquiry saved.' });
    } catch (err) {
        console.error("Form Error:", err);
        res.status(500).send({ error: 'Failed to save inquiry' });
    }
});

// 3. Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 4. Catch-all route (Optional but helpful for single page feel)
// Agar koi galat URL daale toh home par bhej de
app.get('*', (req, res, next) => {
    if (req.url.startsWith('/api')) return next(); // API routes ko disturb na kare
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Port configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
