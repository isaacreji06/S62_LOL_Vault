const express=require('express')
const mongoose = require('mongoose');
const User = require('../Schema/userSchema.js');
const router = express.Router();
const upload=require('../middlewares/multer.js')
const bcrypt=require("bcrypt")
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
    }
)
router.post("/create-user", upload.single("profilePicture"), async (req, res) => {
    try {
      const { username, email, password, bio } = req.body;
      const profilePicture = req.file ? req.file.filename : "";
  
      const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  
      if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required." });
      }
  
      if (!usernameRegex.test(username)) {
        return res.status(400).json({ error: "Invalid username. It must be 3-15 characters long and contain only letters, numbers, or underscores." });
      }
  
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format." });
      }
  
      if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character." });
      }
  
      const existingUser = await User.findOne({ 
        $or: [{ username }, { email }] 
      });
  
      if (existingUser) {
        return res.status(400).json({ error: "Username or Email already exists." });
      }
      const hashPassword=await bcrypt.hash(password,10)
      const user = new User({
        username,
        email,
        password:hashPassword,
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

        const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (updatedData.username && !usernameRegex.test(updatedData.username)) {
            return res.status(400).json({ error: "Invalid username. It must be 3-15 characters long and contain only letters, numbers, or underscores." });
        }

        if (updatedData.email && !emailRegex.test(updatedData.email)) {
            return res.status(400).json({ error: "Invalid email format." });
        }

        if (updatedData.password && !passwordRegex.test(updatedData.password)) {
            return res.status(400).json({ error: "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character." });
        }

        if (updatedData.password) {
            updatedData.password = await bcrypt.hash(updatedData.password, 10);
        }

        if (req.file) {
            updatedData.profilePicture = req.file.filename;
        }
        const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });

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