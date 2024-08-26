import React from 'react';
import { VStack, Heading, Text, Input, Button, HStack, Box } from "@chakra-ui/react";

const StepSix = ({ name, setName, email, setEmail, phone, setPhone, companyName, setCompanyName, onNext, onBack }) => {
    return (
        <VStack spacing={1} alignItems="center" textAlign="center">
            <Heading as="h2" color="teal.300" size="lg">Contact Information</Heading>

            <Box width="100%" maxW="500px">
                <Text fontSize="lg" color="white" mb={2}>Name:</Text>
                <Input
                    required
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    isInvalid={!name}
                    borderColor="teal"
                    errorBorderColor="red.300"
                    color="white"
                    mb={2}
                    aria-required="true"
                    aria-describedby={!name ? "name-error" : undefined}
                />
                {!name && (
                    <Text id="name-error" color="red.300" fontSize="sm" mb={2}>Name is required.</Text>
                )}
            </Box>

            <Box width="100%" maxW="500px">
                <Text fontSize="lg" color="white" mb={2}>Email:</Text>
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
                    mb={2}
                    aria-required="true"
                    aria-describedby={!email ? "email-error" : email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "email-invalid" : undefined}
                />
                {!email && (
                    <Text id="email-error" color="red.300" fontSize="sm" mb={2}>Email is required.</Text>
                )}
                {email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
                    <Text id="email-invalid" color="red.300" fontSize="sm" mb={2}>Please enter a valid email address.</Text>
                )}
            </Box>

            <Box width="100%" maxW="500px">
                <Text fontSize="lg" color="white" mb={2}>Phone:</Text>
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
                    mb={2}
                    aria-required="true"
                    aria-describedby={!phone ? "phone-error" : undefined}
                />
                {!phone && (
                    <Text id="phone-error" color="red.300" fontSize="sm" mb={2}>Phone number is required.</Text>
                )}
            </Box>

            <Box width="100%" maxW="500px">
                <Text fontSize="lg" color="white" mb={2}>Company Name (optional):</Text>
                <Input
                    placeholder="Your Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    borderColor="teal"
                    color="white"
                    mb={2}
                />
            </Box>

            <HStack mt={6} spacing={4}>
                <Button colorScheme="teal" variant="outline" size="lg" onClick={onBack}>Back</Button>
                <Button
                    colorScheme="teal"
                    variant="outline"
                    size="lg"
                    onClick={onNext}
                    isDisabled={!name || !email || !phone}
                >
                    Next
                </Button>
            </HStack>
        </VStack>
    );
};

export default StepSix;
