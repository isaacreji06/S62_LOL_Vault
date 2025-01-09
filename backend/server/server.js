const express = require('express');
require('dotenv').config({
    path: '../config/.env',
});
const mongoose = require('mongoose');
const User = require('../Schema.js');
const app = express();
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
let databaseStatus = '';
app.use(express.json());
mongoose
    .connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
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
app.get('/user', (req, res) => {
    User.find()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => {
            res.status(500).json({ message: 'An error occurred', error: err.message });
        });
});
app.post('/user', (req, res) => {
    const userData = new User(req.body);
    userData
        .save()
        .then(() => res.status(201).json({ message: 'User added successfully!' }))
        .catch((error) => {
            res.status(500).json({ message: 'An error occurred', error: error.message });
        });
});
app.put('/user/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    User.findByIdAndUpdate(id, updatedData, { new: true })
        .then((updatedItem) => {
            if (!updatedItem) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User data updated successfully', updatedItem });
        })
        .catch((err) => {
            res.status(500).json({ message: 'An error occurred', error: err.message });
        });
});
app.delete('/user/:id', (req, res) => {
    const id = req.params.id;

    User.findByIdAndDelete(id)
        .then((deletedItem) => {
            if (!deletedItem) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully', deletedItem });
        })
        .catch((err) => {
            res.status(500).json({ message: 'An error occurred', error: err.message });
        });
});
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});
