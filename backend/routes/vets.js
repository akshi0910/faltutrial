const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Get all available vets
router.get('/', async (req, res) => {
  try {
    const vets = await User.find({ role: 'vet', available: true }).select('-password');
    res.json(vets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update vet availability
router.put('/:id/availability', async (req, res) => {
  try {
    const { available } = req.body;
    const vet = await User.findByIdAndUpdate(req.params.id, { available }, { new: true }).select('-password');
    res.json(vet);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
