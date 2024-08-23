import React from 'react';
import { VStack, Heading, Text, Textarea, Button, HStack } from "@chakra-ui/react";

const StepTwo = ({ specialRequests, setSpecialRequests, onNext, onBack }) => {
    return (
        <VStack spacing={6} maxW="100%">
            <Text fontSize="lg" color="white" textAlign="center">
                Please explain what the website is for, any special requests, references, and any info you feel is important for me to know.
            </Text>
            <Textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Your requests..."
                bg="transparent"
                borderColor="teal"
                color="white"
                w={{ base: "90%", md: "500px" }}  // Adjust width for responsiveness
            />
            <HStack spacing={4}>
                <Button colorScheme="teal" variant="outline" size="lg" onClick={onBack}>
                    Back
                </Button>
                <Button colorScheme="teal" variant="outline" size="lg" onClick={onNext} isDisabled={!specialRequests}>
                    Next
                </Button>
            </HStack>
        </VStack>
    );
};

export default StepTwo;
