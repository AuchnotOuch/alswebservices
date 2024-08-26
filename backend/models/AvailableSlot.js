// models/AvailableSlot.js

import mongoose from 'mongoose';

const availableSlotSchema = new mongoose.Schema({
    startTime: Date,
    endTime: Date,
    isBooked: { type: Boolean, default: false },
});

const AvailableSlot = mongoose.model('AvailableSlot', availableSlotSchema);

export default AvailableSlot;
