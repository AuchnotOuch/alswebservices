import React, { useState, useEffect } from 'react';
import { Heading, VStack, Button, Text, Box } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './StepAppointmentBooking.css';
import { addDays, differenceInMinutes } from 'date-fns';

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
    const [userInteracted, setUserInteracted] = useState(false);
    console.log(userInteracted)
    useEffect(() => {
        const fetchAvailability = async () => {
            try {
                const response = await fetch('/availability');
                const data = await response.json();

                const slotsInLocalTimezone = data.map(slot => {
                    const localStartTime = new Date(slot.startTime).toLocaleString('en-US', { timeZone: 'America/Denver' });
                    const localEndTime = new Date(slot.endTime).toLocaleString('en-US', { timeZone: 'America/Denver' });
                    return { ...slot, localStartTime, localEndTime };
                });

                const sortedSlots = slotsInLocalTimezone.sort((a, b) => new Date(a.localStartTime) - new Date(b.localStartTime));
                setAvailableSlots(sortedSlots);
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
            date,
            time: date ? date.toTimeString().split(' ')[0] : null,
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

            setAvailableSlots(result.updatedAvailableSlots);

            onNext();
        } else {
            console.error("Error booking appointment.");
        }
    };

    const filterAvailableTime = (time) => {
        const selectedTimeInstance = new Date(time);
        const now = new Date();

        if (differenceInMinutes(selectedTimeInstance, now) < 180) return false;

        const mountainTime = new Date(selectedTimeInstance.toLocaleString('en-US', { timeZone: 'America/Denver' }));
        const hour = mountainTime.getHours();

        const withinTimeRange = hour >= 5 && hour < 13;

        const isAvailable = availableSlots.some(slot => {
            const slotStartTime = new Date(slot.startTime);
            return selectedTimeInstance.getTime() === slotStartTime.getTime();
        });

        return withinTimeRange && isAvailable;
    };

    const isSlotBooked = (time) => {
        return availableSlots.some(slot => {
            const slotStartTime = new Date(slot.startTime).getTime();
            return time.getTime() === slotStartTime && slot.isBooked;
        });
    };

    const minDate = new Date();
    const maxDate = addDays(minDate, 45);

    return (
        <VStack minWidth="350px" spacing={8}>
            <Heading as="h2" size="lg" color="teal.400" textAlign="center">
                Book Your Appointment
            </Heading>
            <Text color="gray.300" textAlign="center">
                Please select a date and time for your appointment below. Available times are shown.
            </Text>

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
                    onChange={(date) => {
                        setDate(date);
                        setUserInteracted(true);
                    }}
                    showTimeSelect
                    filterTime={filterAvailableTime}
                    minDate={minDate}
                    maxDate={maxDate}
                    dateFormat="Pp"
                    inline
                    className="custom-datepicker"
                    aria-label="Select appointment date and time"
                    filterDate={time => !isSlotBooked(time)}
                />
            </Box>

            <Button
                colorScheme="teal"
                size="lg"
                onClick={handleSubmit}
                isFullWidth
                isDisabled={!userInteracted} // Also check user interaction
                _disabled={{
                    bg: "gray.400 !important",
                    cursor: "not-allowed !important",
                }}
            >
                Confirm Appointment
            </Button>
            <Button colorScheme="teal" size="lg" variant="outline" onClick={onBack} isFullWidth>
                Back
            </Button>
        </VStack>
    );
};

export default StepAppointmentBooking;
