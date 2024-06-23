const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Replace with your MongoDB Atlas connection string
const uri = "mongodb+srv://rsk2176:122302yeah@jinx.b3cetj0.mongodb.net/?retryWrites=true&w=majority&appName=jinx";

// Connect to MongoDB Atlas
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB Atlas', error);
    });

const CounterSchema = new mongoose.Schema({
    name: String,
    count: Number,
    lastClick: String
});

const Counter = mongoose.model('Counter', CounterSchema);

// Get counters
app.get('/counters', async (req, res) => {
    const counters = await Counter.find();
    res.json(counters);
});

// Update counter
app.post('/counter', async (req, res) => {
    const { name, count, lastClick } = req.body;
    const counter = await Counter.findOneAndUpdate(
        { name },
        { count, lastClick },
        { new: true, upsert: true }
    );
    res.json(counter);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
