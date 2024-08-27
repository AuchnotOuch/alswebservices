import React, { useState, useEffect } from 'react';
import { Heading, VStack, Button, Text, Box, Select, useMediaQuery } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './StepAppointmentBooking.css';
import { addDays, format, differenceInMinutes } from 'date-fns';

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
                const response = await fetch('/availability');
                const data = await response.json();

                // Ensure booked slots are filtered or disabled
                const availableSlots = data.filter(slot => !slot.isBooked);  // Filter out booked slots

                setAvailableSlots(availableSlots);
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

        const response = await fetch('/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(appointmentDetails),
        });

        if (response.ok) {
            const result = await response.json();
            console.log("Booking successful!");

            // Update the available slots with the new data returned from the server
            setAvailableSlots(result.updatedAvailableSlots);

            onNext();
        } else {
            console.error("Error booking appointment.");
        }
    };

    const filterAvailableTime = (time) => {
        const selectedTime = new Date(time);
        const now = new Date();

        // Ensure the selected time is at least 3 hours from now
        if (differenceInMinutes(selectedTime, now) < 180) return false;

        const mountainTime = new Date(selectedTime.toLocaleString('en-US', { timeZone: 'America/Denver' }));
        const hour = mountainTime.getHours();

        const withinTimeRange = hour >= 5 && hour < 13;

        const isAvailable = availableSlots.some(slot => {
            const slotStartTime = new Date(slot.startTime);
            return selectedTime.getTime() === slotStartTime.getTime();
        });

        return withinTimeRange && isAvailable;
    };

    const isSlotBooked = (time) => {
        return availableSlots.some(slot => {
            const slotStartTime = new Date(slot.startTime).getTime();
            return time.getTime() === slotStartTime && slot.isBooked;
        });
    };

    const minDate = new Date(); // Prevent selecting past dates
    const maxDate = addDays(minDate, 45);

    // Unique, sorted dates for the dropdown (exclude past dates)
    const availableDates = [...new Set(availableSlots
        .filter(slot => new Date(slot.startTime) >= minDate)
        .map(slot => format(new Date(slot.startTime), 'yyyy-MM-dd'))
    )];

    // Times corresponding to the selected date
    const availableTimes = selectedDate ? availableSlots
        .filter(slot => format(new Date(slot.startTime), 'yyyy-MM-dd') === selectedDate)
        .map(slot => ({
            time: format(new Date(slot.startTime), 'HH:mm'),
            isBooked: slot.isBooked
        })) : [];

    return (
        <VStack minWidth="350px" spacing={8}>
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
                                {format(new Date(date), 'EEEE, MMMM dd')} {/* Day of the week, Month day */}
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
                        {availableTimes.map(({ time, isBooked }) => (
                            <option key={time} value={time} disabled={isBooked}>
                                {time} {isBooked ? "(Booked)" : ""}
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
                        // Disable booked times in DatePicker
                        filterDate={time => !isSlotBooked(time)}
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
