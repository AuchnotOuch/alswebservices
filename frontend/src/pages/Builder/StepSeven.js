import React from 'react';
import { VStack, Heading, Text, Input, Button, HStack, Box } from "@chakra-ui/react";

const StepSeven = ({ date, setDate, time, setTime, onNext, onBack }) => {
    return (
        <VStack spacing={6}>
            <Heading size="2xl" color="white">Book Your Meeting</Heading>

            <Box width="100%">
                <Text fontSize="lg" color="white">Select a Date:</Text>
                <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    borderColor="teal"
                    color="white"
                />
            </Box>

            <Box width="100%">
                <Text fontSize="lg" color="white">Select a Time:</Text>
                <Input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    borderColor="teal"
                    color="white"
                />
            </Box>

            <HStack mt={6} spacing={4}>
                <Button colorScheme="teal" variant="outline" size="lg" onClick={onBack}>Back</Button>
                <Button colorScheme="teal" variant="outline" size="lg" onClick={onNext} isDisabled={!date || !time}>Submit</Button>
            </HStack>
        </VStack>
    );
};

export default StepSeven;
