const express = require('express');
const Prescription = require('../models/Prescription');

const router = express.Router();

// Create prescription
router.post('/', async (req, res) => {
  try {
    const { consultationId, vetId, farmerId, animalType, symptoms, medicines, instructions } = req.body;
    const prescription = new Prescription({
      consultationId, vetId, farmerId, animalType, symptoms, medicines, instructions
    });
    await prescription.save();
    res.status(201).json(prescription);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get prescriptions for a consultation
router.get('/consultation/:consultationId', async (req, res) => {
  try {
    const prescription = await Prescription.findOne({ consultationId: req.params.consultationId })
      .populate('vetId', 'name specialization')
      .populate('farmerId', 'name');
    res.json(prescription);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
