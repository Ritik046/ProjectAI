// routes/cars.js
const express = require('express');
const multer = require('multer');
const path = require('path');

const Car = require('../models/Car');
const auth = require('../middleware/auth');

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // e.g., 1618321231231.jpg
    },
});

const upload = multer({ 
    storage: storage,
    limits: { files: 10 }, // Max 10 images
    fileFilter: function(req, file, cb) {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if(mimetype && extname){
            return cb(null, true);
        }
        cb(new Error('Images Only!'));
    }
});

// Create a Car
router.post('/', [auth, upload.array('images', 10)], async (req, res) => {
    try {
        const { title, description, tags } = req.body;
        const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];

        const images = req.files.map(file => file.path);

        const car = new Car({
            user: req.user.id,
            title,
            description,
            tags: tagsArray,
            images,
        });

        await car.save();
        res.json(car);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// List all Cars for the logged-in user with optional search
router.get('/', auth, async (req, res) => {
    try {
        const { search } = req.query;
        let query = { user: req.user.id };

        if (search) {
            const regex = new RegExp(search, 'i'); // case-insensitive
            query = {
                ...query,
                $or: [
                    { title: regex },
                    { description: regex },
                    { tags: regex },
                ],
            };
        }

        const cars = await Car.find(query).sort({ createdAt: -1 });
        res.json(cars);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get a particular Car by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);

        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        // Check ownership
        if (car.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        res.json(car);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(500).send('Server error');
    }
});

// Update a Car
router.put('/:id', [auth, upload.array('images', 10)], async (req, res) => {
    try {
        const { title, description, tags } = req.body;
        const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];

        let car = await Car.findById(req.params.id);

        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        // Check ownership
        if (car.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Update fields
        if (title) car.title = title;
        if (description) car.description = description;
        if (tags) car.tags = tagsArray;

        if (req.files.length > 0) {
            // Ensure total images do not exceed 10
            if (car.images.length + req.files.length > 10) {
                return res.status(400).json({ message: 'Maximum of 10 images allowed' });
            }

            const newImages = req.files.map(file => file.path);
            car.images = car.images.concat(newImages);
        }

        await car.save();
        res.json(car);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete a Car
router.delete('/:id', auth, async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);

        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        // Check ownership
        if (car.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        await Car.findByIdAndDelete(req.params.id);
        res.json({ message: 'Car removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(500).send('Server error');
    }
});

module.exports = router;