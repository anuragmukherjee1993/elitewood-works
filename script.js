const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// 1. Static Files (Sabse pehle)
app.use(express.static(__dirname));

// 2. Database Connection
mongoose.connect('mongodb+srv://admin:EliteWood2026@cluster0.sr86mps.mongodb.net/?appName=Cluster0')
    .then(() => console.log("🚀 MongoDB Connected!"))
    .catch(err => console.log("❌ DB Error:", err));

// 3. API Route
const InquirySchema = new mongoose.Schema({
    name: String, email: String, message: String, date: { type: Date, default: Date.now }
});
const Inquiry = mongoose.model('Inquiry', InquirySchema);

app.post('/api/contact', async (req, res) => {
    try {
        const newInquiry = new Inquiry(req.body);
        await newInquiry.save();
        res.status(200).send({ message: 'Saved!' });
    } catch (err) { res.status(500).send(err.message); }
});

// 4. Root Route (Direct Send File - No regex)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Running on ${PORT}`));
