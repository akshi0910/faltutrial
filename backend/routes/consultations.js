const express = require('express');
const Consultation = require('../models/Consultation');
const User = require('../models/User');

const router = express.Router();

// Request consultation
router.post('/', async (req, res) => {
  try {
    const { farmerId, vetId, type } = req.body;
    const consultation = new Consultation({ farmerId, vetId, type });
    await consultation.save();
    res.status(201).json(consultation);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's consultations (either as farmer or vet)
router.get('/user/:userId', async (req, res) => {
  try {
    const userRole = await User.findById(req.params.userId).select('role');
    let query = {};
    if (userRole.role === 'farmer') {
      query = { farmerId: req.params.userId };
    } else {
      query = { vetId: req.params.userId };
    }

    const consultations = await Consultation.find(query)
      .populate('farmerId', 'name email')
      .populate('vetId', 'name email specialization')
      .sort({ createdAt: -1 });

    res.json(consultations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update consultation status
router.put('/:id/status', async (req, res) => {
  try {
    const { status, meetingRoom } = req.body;
    let updateFields = { status };
    if (meetingRoom) updateFields.meetingRoom = meetingRoom;

    const consultation = await Consultation.findByIdAndUpdate(
      req.params.id, 
      updateFields, 
      { new: true }
    ).populate('farmerId', 'name email').populate('vetId', 'name email specialization');
    res.json(consultation);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
