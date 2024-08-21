// src/components/HeroSection.js
import React from 'react';
import { Box, Heading, Text, Button, VStack, SimpleGrid, Icon, HStack } from "@chakra-ui/react";

const HeroSection = () => {
    return (
        <>
            {/* Hero Section */}
            <Box
                height="100vh"
                width="100vw"
                bgImage="linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(5, 18, 32, 1) 95%), url('/images/hero-background.jpg')"
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
        </>
    );
};

export default HeroSection;
