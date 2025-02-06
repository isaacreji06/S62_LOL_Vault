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

router.post("/create-user", upload.single("profilePicture"), async (req, res) => {
    try {
      const { username, email, password, bio } = req.body;

      const profilePicture = req.file ? req.file.filename : "";
  
      if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required." });
      }
      const existingUser = await User.findOne({ 
        $or: [{ username }, { email }] 
    });

    if (existingUser) {
        return res.status(400).json({ error: "Username or Email already exists." });
    }
  
      const user = new User({
        username,
        email,
        password,
        bio,
        profilePicture,
      });
  
      await user.save();
      res.status(201).json({ message: "User added successfully!", user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.put('/update-user/:id', upload.single("profilePicture"), async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        if (req.file) {
            updatedData.profilePicture = req.file.filename;
        }
        const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User data updated successfully', user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: 'An error occurred', error: err.message });
    }
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