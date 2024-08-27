import dotenv from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import AvailableSlot from './models/AvailableSlot.js';
import path from 'path'
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express();

app.use(express.static(path.join(__dirname, '../frontend/build')))
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
});

const getAccessToken = async () => {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        return accessToken.token;
    } catch (error) {
        console.error('Error getting access token:', error);
        throw error;
    }
};

const createTransporter = async () => {
    const accessToken = await getAccessToken();

    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL_USER,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken,
        },
    });
};


app.post('/book', async (req, res) => {
    console.log('Booking request received:', req.body);

    const {
        name,
        email,
        phone,
        companyName,
        specialRequests,
        numPages,
        maintenanceOptIn,
        maintenanceCost,
        hasMedia,
        addOns,
        totalPrice,
        date,  // Assuming this is already in UTC
    } = req.body;

    try {
        // Use the date directly since it's already in UTC
        const selectedDateTime = new Date(date);

        console.log('Querying AvailableSlot with selectedDateTime:', selectedDateTime);

        const slot = await AvailableSlot.findOne({
            startTime: selectedDateTime,
            isBooked: false,
        });

        if (!slot) {
            console.log('No available slot found for the given time.');
            return res.status(400).json({ error: 'Time slot is no longer available' });
        }

        // Mark the slot as booked
        slot.isBooked = true;
        await slot.save(); // Ensure the slot is saved to the database before proceeding

        console.log('Slot successfully booked:', slot);

        // Send the booking confirmation email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECIPIENT_EMAIL,
            subject: `New Booking: ${name}`,
            text: `
                You have a new booking from ${name} (${email}, ${phone}).
                Company: ${companyName || 'N/A'}
                Special Requests: ${specialRequests}
                Number of Pages: ${numPages}
                Maintenance Opt-in: ${maintenanceOptIn ? 'Yes' : 'No'}
                Maintenance Cost: $${maintenanceCost}
                Media Provided: ${hasMedia === 'yes' ? 'Yes' : 'No'}
                Add Ons: ${addOns}
                Total Price: ${totalPrice}
                Appointment Date: ${selectedDateTime.toISOString()} (UTC)
            `,
        };

        const transporter = await createTransporter();
        await transporter.sendMail(mailOptions);

        // Send the updated availability back to the client
        const updatedAvailableSlots = await AvailableSlot.find({ isBooked: false });

        // Send a success response to the client with the updated availability
        res.status(200).json({
            message: 'Appointment booked successfully!',
            updatedAvailableSlots, // Send the updated slots to the frontend
        });
    } catch (error) {
        console.error('Error booking appointment:', error);
        res.status(500).json({ error: 'Error booking appointment' });
    }
});

app.get('/availability', async (req, res) => {
    try {
        const availableSlots = await AvailableSlot.find({ isBooked: false }); // Only fetch unbooked slots
        res.json(availableSlots);
    } catch (error) {
        console.error('Error fetching availability:', error);
        res.status(500).json({ error: 'Error fetching availability' });
    }
});

app.post('/initialize-slots', async (req, res) => {
    const { date, startTime, endTime } = req.body;

    try {
        const newSlot = new Booking({ date, startTime, endTime });
        await newSlot.save();
        res.status(201).json({ message: 'Time slot initialized' });
    } catch (error) {
        console.error('Error initializing time slots:', error);
        res.status(500).json({ error: 'Error initializing time slots' });
    }
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
