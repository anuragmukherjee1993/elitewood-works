const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection string
mongoose.connect('mongodb://127.0.0.1:27017/elitewood_db')
    .then(() => console.log("🚀 BINGO: MongoDB se connection ban gaya!"))
    .catch(err => console.log("❌ Connection error:", err));

// --- 1. CONTACT FORM LOGIC ---
const InquirySchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Inquiry = mongoose.model('Inquiry', InquirySchema);

app.post('/api/contact', async (req, res) => {
    try {
        const newInquiry = new Inquiry(req.body);
        await newInquiry.save();
        console.log("📥 New Contact Inquiry Saved!");
        res.status(200).send({ message: 'Contact data saved successfully!' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// --- 2. GET A QUOTE LOGIC (Naya Add Kiya) ---
const QuoteSchema = new mongoose.Schema({
    furnitureType: String,
    date: { type: Date, default: Date.now }
});

const Quote = mongoose.model('Quote', QuoteSchema);

app.post('/api/quote', async (req, res) => {
    try {
        const newQuote = new Quote(req.body);
        await newQuote.save();
        console.log("🛋️ New Quote Request Saved!");
        res.status(200).send({ message: 'Quote data saved successfully!' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Server running on Port 5000
app.listen(5000, () => console.log('✅ Backend Server is running on http://localhost:5000'));