import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { DateTime } from 'luxon';
import AvailableSlot from './models/AvailableSlot.js'; // Import the AvailableSlot model

dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

// Create slots for a range of dates and times
const createSlots = async () => {
    const startDate = DateTime.now().setZone('America/Denver').startOf('day').plus({ days: 1 });
    const endDate = startDate.plus({ days: 45 }); // Create slots for the next year

    const timeSlots = [];

    for (let date = startDate; date < endDate; date = date.plus({ days: 1 })) {
        for (let hour = 5; hour <= 12; hour++) { // From 5am to 1pm MT
            const startTime = date.set({ hour, minute: 0 }).toJSDate();
            const endTime = date.set({ hour, minute: 30 }).toJSDate(); // 30-minute slots
            timeSlots.push({ startTime, endTime });
        }
    }

    try {
        await AvailableSlot.insertMany(timeSlots); // Use the imported model
        console.log('Time slots initialized');
    } catch (error) {
        console.error('Error initializing slots:', error);
    }
};

// Run the initialization
const initializeSlots = async () => {
    await connectDB();  // Connect to MongoDB
    await createSlots();  // Create time slots
    mongoose.connection.close();  // Close the connection after initialization
};

initializeSlots();  // Run the initialization process
