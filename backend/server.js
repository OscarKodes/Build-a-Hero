// SET UP REQUIREMENTS =========================
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

// APP USE =====================================
app.use(cors());
app.use(express.json());

// MONGO ATLAS CONNECTION STRING & .env file=======
const url = process.env.ATLAS_URL;
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open', () => {
    console.log('MongoDB database connection established!');
});

// LISTENER =========================================
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});