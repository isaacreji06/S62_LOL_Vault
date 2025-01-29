const express=require('express')
const mongoose = require('mongoose');
const User = require('../Schema/userSchema.js');
const router = express.Router();
const upload=require('../middlewares/multer.js')

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
router.post('/create-user', upload.single("profilePicture"), async (req, res) => {
    try {
        // Check if an image was uploaded
        const profilePictureUrl = req.file
            ? `http://localhost:8080/uploads/${req.file.filename}`
            : undefined;
        const userData = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            bio: req.body.bio,
            profilePicture: profilePictureUrl || undefined, 
        });
        await userData.save();
        res.status(201).json({ message: 'User added successfully!', user: userData });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
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