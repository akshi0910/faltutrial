const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vetId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'completed', 'rejected'], 
    default: 'pending' 
  },
  type: { 
    type: String, 
    enum: ['video', 'farm_visit'], 
    required: true 
  },
  meetingRoom: { type: String } // For video calls
}, { timestamps: true });

module.exports = mongoose.model('Consultation', consultationSchema);
