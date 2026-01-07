const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Yeh line zaroori hai

const app = express();
app.use(cors());
app.use(express.json());

// Static files load karne ke liye
app.use(express.static(__dirname));

// MongoDB Atlas
mongoose.connect('mongodb+srv://admin:EliteWood2026@cluster0.sr86mps.mongodb.net/?appName=Cluster0')
    .then(() => console.log("🚀 BINGO: MongoDB Atlas connected!"))
    .catch(err => console.log("❌ Connection error:", err));

// Forms Logic
const InquirySchema = new mongoose.Schema({ name: String, email: String, message: String, date: { type: Date, default: Date.now } });
const Inquiry = mongoose.model('Inquiry', InquirySchema);
app.post('/api/contact', async (req, res) => {
    try { const newInquiry = new Inquiry(req.body); await newInquiry.save(); res.status(200).send({ message: 'Saved!' }); }
    catch (err) { res.status(500).send(err.message); }
});

// --- YE WALI LINE DHAYAN SE DEKHO ---
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
