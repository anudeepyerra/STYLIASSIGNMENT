const express = require('express');
const mongoose = require('mongoose');
const clothingRoutes = require('./routes/categories');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', clothingRoutes);

// MongoDB connection
mongoose.connect('mongodb+srv://admin:admin@cluster0.ka5jt2d.mongodb.net/INVENTORY?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  })
  .catch((err) => console.log('MongoDB connection error:', err));