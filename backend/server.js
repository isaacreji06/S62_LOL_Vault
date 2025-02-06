const express = require('express');
require('dotenv').config({
    path: './config/.env',
});
const mongoose = require('mongoose');
const User = require('./Schema/userSchema.js');
const path=require('path')
const app = express();
const cors=require('cors')
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
const userRoute=require('./routes/userRoute.js')
let databaseStatus = '';
app.use(cors())
app.use(express.json());
app.use('/user',userRoute)
app.use('/uploads', express.static(path.join(__dirname, "./uploads")))
mongoose
    .connect(MONGODB_URL)
    .then(() => {
        databaseStatus = 'Connected to the database successfully';
    })
    .catch((err) => {
        databaseStatus = `Error connecting to the database: ${err.message}`;
    });
app.get('/', (req, res) => {
    res.send(`<h1>${databaseStatus}</h1>`);
});

app.get('/ping', (req, res) => {
    res.send('ping');
});

app.listen(PORT, () => {
    console.log(`The server is running on port http://localhost:${PORT}`);
});
