const express=require('express')
const mongoose = require('mongoose');
const User = require('../Schema/userSchema.js');
const router = express.Router();

router.get('/get-user', (req, res) => {
    User.find()
    .then((users) => {
    if (users.length > 0) {
         res.status(200).json({ message: users[0] });
    } else {
        res.status(404).json({ message: 'No users found' });
    }
        })
        .catch((err) => {
            res.status(500).json({ message: 'An error occurred', error: err.message });
        });
});
router.post('/create-user', (req, res) => {
    const userData = new User(req.body);
    userData
        .save()
        .then(() => res.status(201).json({ message: 'User added successfully!' }))
        .catch((error) => {
            res.status(500).json({ message: 'An error occurred', error: error.message });
        });
});
router.put('/update-user/:id', (req, res) => {
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
router.delete('/delete-user/:id', (req, res) => {
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

module.exports=router