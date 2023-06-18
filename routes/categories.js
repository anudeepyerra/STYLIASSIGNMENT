const express = require('express');
const router = express.Router();
const Categories = require('../models/categories');

// Create a new categories item
router.post('/categories', async (req, res) => {
  try {
    const categories = new categories(req.body);
    await categories.save();
    res.status(201).json(categories);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all categories items
router.get('/categories', async (req, res) => {
  try {
    const categories = await categories.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific categories item by ID
router.get('/categories/:id', async (req, res) => {
  try {
    var o_id = new mongo.ObjectID(req.params.id);
    const categories = await categories.findOne({'_id': o_id});
    if (!categories) {
      return res.status(404).json({ error: 'categories item not found' });
    }
    res.json(categories);
  } catch (err) {
    console.log("error errored",JSON.stringify(err));
    res.status(500).json({ error: err.message });
  }
});

// Update a specific categories item by ID
router.put('/categories/:id', async (req, res) => {
  try {
    var o_id = new mongo.ObjectID(req.params.id);
    const categories = await categories.findByIdAndUpdate({'_id': o_id}, req.body, {
      new: true,
    });
    if (!categories) {
      return res.status(404).json({ error: 'categories item not found' });
    }
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a specific categories item by ID
router.delete('/categories/:id', async (req, res) => {
  try {
    var o_id = new mongo.ObjectID(req.params.id);
    const categories = await categories.findByIdAndRemove({'_id': o_id});
    if (!categories) {
      return res.status(404).json({ error: 'categories item not found' });
    }
    res.json({ message: 'categories item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
