import React from 'react';
import { VStack, Heading, Text, Textarea, Button, HStack } from "@chakra-ui/react";

const StepTwo = ({ specialRequests, setSpecialRequests, onNext, onBack }) => {
    return (
        <VStack minWidth="350px" spacing={6}>
            <Heading color="teal.300" size="lg" textAlign="center" as="h2">Tell Me Your Vision</Heading>
            <Text fontSize="lg" color="white" textAlign="left">
                Whether it's the purpose of the site, any special features you have in mind, specific design references, or anything else that's important to you, I’d love to hear it.
                The more information you provide, the better I can prepare for your consultation, and ultimately the final product.
            </Text>
            <Textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Describe your project, special requests, or anything important..."
                bg="transparent"
                borderColor="teal"
                color="white"
                w={{ base: "90%", md: "500px" }}
                aria-label="Special Requests Text Area"
            />
            <HStack spacing={4}>
                <Button colorScheme="teal" variant="outline" size="lg" onClick={onBack}>
                    Back
                </Button>
                <Button
                    colorScheme="teal"
                    variant="outline"
                    size="lg"
                    onClick={onNext}
                    isDisabled={!specialRequests}
                    aria-disabled={!specialRequests}
                >
                    Next
                </Button>
            </HStack>
        </VStack>
    );
};

export default StepTwo;
