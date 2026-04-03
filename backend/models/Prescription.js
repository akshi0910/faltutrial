const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  consultationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Consultation', required: true },
  vetId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  animalType: { type: String, required: true },
  symptoms: { type: String, required: true },
  medicines: { type: String, required: true },
  instructions: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);
