import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.js'; 




dotenv.config({ path: './config/.env' }); // relative path from server.js
console.log('MongoDB URI:', process.env.MONGODB_URI); // Check if this logs the correct URI

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes

// GET: Return all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST: Add a new user to the database
app.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT: Edit a user by ID
app.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE: Remove a user by ID
app.delete('/users/:id', async (req, res) => {
    try {
        const removedUser = await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User removed', removedUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
