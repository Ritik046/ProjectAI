const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/cars');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); 


app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
})
.catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});