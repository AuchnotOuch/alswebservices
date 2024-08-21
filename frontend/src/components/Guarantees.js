// src/components/HeroSection.js
import React from 'react';
import { Box, Heading, Text, Button, VStack, SimpleGrid, Icon, HStack } from "@chakra-ui/react";

const Guarantees = () => {
    return (
        <>
            <Box display="flex" flexDir="column" justify="center" py={12} px={4} bg="rgb(5, 18, 32)">
                <SimpleGrid columns={[1, null, 2]} spacing="40px" maxW="1200px" mx="auto">

                    <HStack spacing={4} align="center">
                        <Box as="i" className="fa-solid fa-paint-roller" fontSize="5xl" color="rgb(236, 97, 71)" minWidth="40px" />
                        <Text fontSize="xl" color="white">Professional designs</Text>
                    </HStack>

                    <HStack spacing={4} align="center">
                        <Box as="i" className="fa-solid fa-mobile-screen-button" fontSize="5xl" color="rgb(236, 97, 71)" minWidth="40px" />
                        <Text fontSize="xl" color="white">Mobile-friendly and responsive layouts</Text>
                    </HStack>

                    <HStack spacing={4} align="center">
                        <Box as="i" className="fa-solid fa-magnifying-glass" fontSize="5xl" color="rgb(236, 97, 71)" minWidth="40px" />
                        <Text fontSize="xl" color="white">SEO optimization for better visibility</Text>
                    </HStack>

                    <HStack spacing={4} align="center">
                        <Box as="i" className="fa-solid fa-cart-shopping" fontSize="5xl" color="rgb(236, 97, 71)" minWidth="40px" />
                        <Text fontSize="xl" color="white">E-commerce integration for your online store</Text>
                    </HStack>

                    <HStack spacing={4} align="center">
                        <Box as="i" className="fa-solid fa-screwdriver-wrench" fontSize="5xl" color="rgb(236, 97, 71)" minWidth="40px" />
                        <Text fontSize="xl" color="white">Ongoing support and maintenance</Text>
                    </HStack>

                </SimpleGrid>
            </Box>
        </>
    );
};

export default Guarantees;
