import React from 'react';
import { Box, Heading, Text, VStack, IconButton, Image } from "@chakra-ui/react";
import { FaArrowDown } from "react-icons/fa"; // Import Font Awesome icon
import { Link as ScrollLink } from "react-scroll"; // Import for smooth scrolling

const HeroSection = () => {
    return (
        <>
            {/* Hero Section */}
            <Box
                minHeight={{ base: "auto", md: "100vh" }}  // Flexible height for small screens, full viewport for larger screens
                width="100vw"
                bgImage="
    linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(5, 18, 32, 1) 100%),
    url('/images/herobackground2.png')
  "
                bgSize="cover, cover" // Ensure both layers cover the entire element
                bgPosition="center, center"
                bgRepeat="no-repeat, no-repeat"
                display="flex"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                py={{ base: 8, md: 0 }} // Add padding on small screens to prevent overlap
            >
                {/* Parent container with responsive layout */}
                <VStack spacing={4} p={8} borderRadius="lg" zIndex={1}>
                    <Image w="300px" src="/images/alslogo.png" alt="als logo" />
                    <Heading size="2xl" color="white">
                        Welcome to Al's Web Services
                    </Heading>
                    <Text fontSize="lg" color="white">
                        Professional websites that boost your online presence.
                    </Text>

                    {/* Down arrow button for smooth scrolling */}
                    <ScrollLink to="guarantees" smooth={true} duration={500} offset={-100}>
                        <IconButton
                            aria-label="Scroll down"
                            icon={<FaArrowDown />}
                            size="lg"
                            variant="outline"
                            colorScheme="teal"
                            mt={8}
                            _hover={{ bg: "rgba(255, 255, 255, 0.2)" }}
                        />
                    </ScrollLink>
                </VStack>
            </Box>
        </>
    );
};

export default HeroSection;
