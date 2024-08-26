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

    useEffect(() => {
        const fetchAvailability = async () => {
            try {
                const response = await fetch('http://localhost:5000/availability');
                const data = await response.json();
                setAvailableSlots(data);
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
            date: isMobile ? selectedDate : date,
            time: isMobile ? selectedTime : date.toTimeString().split(' ')[0],
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

    const filterAvailableTime = (time) => {
        const selectedTime = new Date(time);

        const mountainTime = new Date(selectedTime.toLocaleString('en-US', { timeZone: 'America/Denver' }));
        const hour = mountainTime.getHours();

        const withinTimeRange = hour >= 5 && hour < 13;

        const isAvailable = availableSlots.some(slot => {
            const slotStartTime = new Date(slot.startTime);

            return selectedTime.getTime() === slotStartTime.getTime();
        });

        return withinTimeRange && isAvailable;
    };

    const minDate = new Date();
    const maxDate = addDays(minDate, 45);

    const availableDates = [...new Set(availableSlots.map(slot => format(new Date(slot.startTime), 'yyyy-MM-dd')))];
    const availableTimes = selectedDate ? availableSlots
        .filter(slot => format(new Date(slot.startTime), 'yyyy-MM-dd') === selectedDate)
        .map(slot => format(new Date(slot.startTime), 'HH:mm')) : [];

    return (
        <VStack spacing={8}>
            <Heading as="h2" size="lg" color="teal.400" textAlign="center">
                Book Your Appointment
            </Heading>
            <Text color="gray.300" textAlign="center">
                Please select a date and time for your appointment below. Available times are shown.
            </Text>

            {isMobile ? (
                <VStack spacing={4}>
                    <Select
                        placeholder="Select a date"
                        onChange={(e) => setSelectedDate(e.target.value)}
                        aria-label="Select a date for your appointment"
                    >
                        {availableDates.map(date => (
                            <option key={date} value={date}>
                                {format(new Date(date), 'MMMM dd, yyyy')}
                            </option>
                        ))}
                    </Select>

                    <Select
                        placeholder="Select a time"
                        onChange={(e) => setSelectedTime(e.target.value)}
                        isDisabled={!selectedDate}
                        aria-disabled={!selectedDate}
                        aria-label="Select a time for your appointment"
                    >
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
                        aria-label="Select appointment date and time"
                        onCalendarOpen={() => document.getElementById('datepicker').focus()}
                        onCalendarClose={() => document.getElementById('confirm-btn').focus()}
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
