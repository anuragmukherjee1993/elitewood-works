const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Static files ke liye
app.use(express.static(__dirname));

// 2. MongoDB Atlas Connection
mongoose.connect('mongodb+srv://admin:EliteWood2026@cluster0.sr86mps.mongodb.net/?appName=Cluster0')
    .then(() => console.log("🚀 BINGO: MongoDB Atlas connected!"))
    .catch(err => console.log("❌ Connection error:", err));

// --- CONTACT & QUOTE LOGIC ---
const InquirySchema = new mongoose.Schema({ name: String, email: String, message: String, date: { type: Date, default: Date.now } });
const Inquiry = mongoose.model('Inquiry', InquirySchema);
app.post('/api/contact', async (req, res) => {
    try { const newInquiry = new Inquiry(req.body); await newInquiry.save(); res.status(200).send({ message: 'Saved!' }); }
    catch (err) { res.status(500).send(err.message); }
});

const QuoteSchema = new mongoose.Schema({ furnitureType: String, date: { type: Date, default: Date.now } });
const Quote = mongoose.model('Quote', QuoteSchema);
app.post('/api/quote', async (req, res) => {
    try { const newQuote = new Quote(req.body); await newQuote.save(); res.status(200).send({ message: 'Saved!' }); }
    catch (err) { res.status(500).send(err.message); }
});

// 3. FIX: '*' ki jagah '/*' use karein taaki PathError na aaye
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 4. Port configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
