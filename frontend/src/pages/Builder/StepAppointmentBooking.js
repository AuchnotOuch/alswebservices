import React, { useState, useEffect } from 'react';
import { Heading, VStack, Button, Text, Box, Select, useMediaQuery } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './StepAppointmentBooking.css';
import { addDays, format } from 'date-fns';

const StepAppointmentBooking = ({
    date,
    setDate,
    name,
    email,
    phone,
    companyName,
    specialRequests,
    numPages,
    maintenanceOptIn,
    maintenanceCost,
    hasMedia,
    totalPrice,
    addOns,
    onNext,
    onBack
}) => {
    const [availableSlots, setAvailableSlots] = useState([]);
    const [isMobile] = useMediaQuery("(max-width: 768px)");
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    // Fetch available time slots from the backend
    useEffect(() => {
        const fetchAvailability = async () => {
            try {
                const response = await fetch('http://localhost:5000/availability');
                const data = await response.json();
                setAvailableSlots(data);  // Save the fetched slots
            } catch (error) {
                console.error('Error fetching availability:', error);
            }
        };

        fetchAvailability();
    }, []);

    const handleSubmit = async () => {
        const appointmentDetails = {
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
            date: isMobile ? selectedDate : date, // Use selectedDate for mobile, date for desktop
            time: isMobile ? selectedTime : date.toTimeString().split(' ')[0], // Use selectedTime for mobile
        };

        const response = await fetch('http://localhost:5000/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(appointmentDetails),
        });

        if (response.ok) {
            console.log("Booking successful!");
            onNext();
        } else {
            console.error("Error booking appointment.");
        }
    };

    // Filter time based on available slots and your preferred hours (5am - 1pm MT)
    const filterAvailableTime = (time) => {
        const selectedTime = new Date(time);

        // Convert to Mountain Time
        const mountainTime = new Date(selectedTime.toLocaleString('en-US', { timeZone: 'America/Denver' }));
        const hour = mountainTime.getHours();

        // Check if the time falls within the 5am - 1pm MT window
        const withinTimeRange = hour >= 5 && hour < 13; // hour < 13 to prevent selecting exactly 1:00pm

        // Check if the selected time is one of the available slots from the backend
        const isAvailable = availableSlots.some(slot => {
            const slotStartTime = new Date(slot.startTime);

            return selectedTime.getTime() === slotStartTime.getTime(); // Compare full date and time
        });

        return withinTimeRange && isAvailable;
    };

    // Set the min and max dates based on available slots
    const minDate = new Date();  // Today
    const maxDate = addDays(minDate, 45);  // 45 days from today

    // Available dates and times for mobile view dropdowns
    const availableDates = [...new Set(availableSlots.map(slot => format(new Date(slot.startTime), 'yyyy-MM-dd')))];
    const availableTimes = selectedDate ? availableSlots
        .filter(slot => format(new Date(slot.startTime), 'yyyy-MM-dd') === selectedDate)
        .map(slot => format(new Date(slot.startTime), 'HH:mm')) : [];

    return (
        <VStack spacing={8}>
            <Heading size="lg" color="teal.400" textAlign="center">
                Book Your Appointment
            </Heading>
            <Text color="gray.300" textAlign="center">
                Please select a date and time for your appointment below. Available times are shown.
            </Text>

            {isMobile ? (
                <VStack spacing={4}>
                    <Select placeholder="Select a date" onChange={(e) => setSelectedDate(e.target.value)}>
                        {availableDates.map(date => (
                            <option key={date} value={date}>
                                {format(new Date(date), 'MMMM dd, yyyy')}
                            </option>
                        ))}
                    </Select>
                    <Select placeholder="Select a time" onChange={(e) => setSelectedTime(e.target.value)} isDisabled={!selectedDate}>
                        {availableTimes.map(time => (
                            <option key={time} value={time}>
                                {time}
                            </option>
                        ))}
                    </Select>
                </VStack>
            ) : (
                <Box
                    bgGradient="linear(to-br, gray.700, gray.900)"
                    p={6}
                    borderRadius="lg"
                    boxShadow="2xl"
                    borderWidth="2px"
                    borderColor="teal.400"
                >
                    <DatePicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        showTimeSelect
                        filterTime={filterAvailableTime}
                        minDate={minDate}
                        maxDate={maxDate}
                        dateFormat="Pp"
                        inline
                        className="custom-datepicker"
                    />
                </Box>
            )}

            <Button colorScheme="teal" size="lg" onClick={handleSubmit} isFullWidth>
                Confirm Appointment
            </Button>
            <Button colorScheme="teal" size="lg" variant="outline" onClick={onBack} isFullWidth>
                Back
            </Button>
        </VStack>
    );
};

export default StepAppointmentBooking;
