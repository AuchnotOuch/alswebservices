import React from 'react';
import { Box, Heading, Text, Button, VStack, Image } from "@chakra-ui/react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel CSS

const HeroSection = () => {
    const images = [
        "/images/ecosphere.png",
        "/images/freedom.png",
        "/images/urbangreens.png",
        "/images/sunnyblooms.png"
    ];

    return (
        <>
            {/* Hero Section */}
            <Box
                minHeight={{ base: "auto", md: "100vh" }}  // Flexible height for small screens, full viewport for larger screens
                width="100vw"
                bgImage="linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(5, 18, 32, 1) 95%), url('/images/hero-background.jpg')"
                bgPosition="center"
                bgRepeat="no-repeat"
                bgSize="cover"
                display="flex"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                py={{ base: 8, md: 0 }} // Add padding on small screens to prevent overlap
            >
                {/* Parent container with responsive layout */}
                <Box
                    display="flex"
                    flexDirection={{ base: "column", md: "row" }} // Stack on smaller screens, align in a row on larger screens
                    alignItems="center"
                    justifyContent="center" // Center content on smaller screens
                    width="100%"
                    px={{ base: 4, md: 16 }} // Responsive padding
                    gap={{ base: 8, md: 0 }} // Add space between elements on smaller screens
                >
                    {/* VStack with text and button */}
                    <VStack spacing={4} p={8} bg="rgba(0,0,0,0.5)" borderRadius="lg" zIndex={1}>
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
            </Box>
        </>
    );
};

export default HeroSection;
