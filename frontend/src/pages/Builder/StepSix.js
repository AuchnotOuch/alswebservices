import React from 'react';
import { VStack, Heading, Text, Input, Button, HStack, Box } from "@chakra-ui/react";

const StepSix = ({ name, setName, email, setEmail, phone, setPhone, companyName, setCompanyName, onNext, onBack }) => {
    return (
        <VStack spacing={6}>
            <Box width="100%">
                <Text fontSize="lg" color="white">Name:</Text>
                <Input
                    required
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    isInvalid={!name}
                    borderColor="teal"
                    errorBorderColor="red.300"
                    color="white"
                />
                {!name && (
                    <Text color="red.300" fontSize="sm">Name is required.</Text>
                )}
            </Box>

            <Box width="100%">
                <Text fontSize="lg" color="white">Email:</Text>
                <Input
                    required
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
                    borderColor="teal"
                    errorBorderColor="red.300"
                    color="white"
                />
                {!email && (
                    <Text color="red.300" fontSize="sm">Email is required.</Text>
                )}
                {email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
                    <Text color="red.300" fontSize="sm">Please enter a valid email address.</Text>
                )}
            </Box>

            <Box width="100%">
                <Text fontSize="lg" color="white">Phone:</Text>
                <Input
                    required
                    type="tel"
                    placeholder="Your Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    isInvalid={!phone}
                    borderColor="teal"
                    errorBorderColor="red.300"
                    color="white"
                />
                {!phone && (
                    <Text color="red.300" fontSize="sm">Phone number is required.</Text>
                )}
            </Box>

            <Box width="100%">
                <Text fontSize="lg" color="white">Company Name (optional):</Text>
                <Input
                    placeholder="Your Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    borderColor="teal"
                    color="white"
                />
            </Box>

            <HStack mt={6} spacing={4}>
                <Button colorScheme="teal" variant="outline" size="lg" onClick={onBack}>Back</Button>
                <Button colorScheme="teal" variant="outline" size="lg" onClick={onNext} isDisabled={!name || !email || !phone}>Next</Button>
            </HStack>
        </VStack>
    );
};

export default StepSix;
