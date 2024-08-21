// src/components/HeroSection.js
import React from 'react';
import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";

const HeroSection = () => {
    return (
        <Box
            height="100vh"
            width="100vw"
            bgImage="url('/images/hero-background.jpg')" // Add your image source here
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
            display="flex"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
        >
            <VStack spacing={4} bg="rgba(0, 0, 0, 0.5)" p={8} borderRadius="lg">
                <Heading size="2xl" color="white">
                    Welcome to Al's Web Services
                </Heading>
                <Text fontSize="lg" color="white">
                    Professional websites that boost your online presence.
                </Text>
                <Button colorScheme="teal" size="lg">
                    Get Started
                </Button>
            </VStack>
        </Box>
    );
};

export default HeroSection;
