// src/components/ServiceHighlight.js
import React from 'react';
import { SimpleGrid, Box, Heading, Text, Button, VStack } from "@chakra-ui/react";

const ServiceHighlight = () => {
    return (
        <Box py={12} px={4} bg="rgb(5, 18, 32)">
            <Heading color={"white"} textAlign="center" mb={8}>Services</Heading>
            <SimpleGrid columns={[1, null, 3]} spacing="40px">
                {/* Basic Package */}
                <Box
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    p={6}
                    bg="white"
                    boxShadow="0 4px 12px rgba(56, 178, 172, 0.6)" // Teal shadow
                    textAlign="center"
                >
                    <VStack spacing={4}>
                        <Heading size="md">Basic Website Package</Heading>
                        <Text fontWeight="bold" fontSize="xl" color="teal.600">$150+</Text>
                        <Text>Up to 5 pages, responsive design, SEO optimization.</Text>
                        <Button colorScheme="teal" variant="outline" size="md">Get Started</Button>
                    </VStack>
                </Box>

                {/* Standard Package */}
                <Box
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    p={6}
                    bg="white"
                    boxShadow="0 4px 12px rgba(56, 178, 172, 0.6)" // Teal shadow
                    textAlign="center"
                >
                    <VStack spacing={4}>
                        <Heading size="md">Standard Website Package</Heading>
                        <Text fontWeight="bold" fontSize="xl" color="teal.600">$500+</Text>
                        <Text>Up to 10 pages, e-commerce integration, premium design.</Text>
                        <Button colorScheme="teal" variant="outline" size="md">Get Started</Button>
                    </VStack>
                </Box>

                {/* Premium Package */}
                <Box
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    p={6}
                    bg="white"
                    boxShadow="0 4px 12px rgba(56, 178, 172, 0.6)" // Teal shadow
                    textAlign="center"
                >
                    <VStack spacing={4}>
                        <Heading size="md">Premium Website Package</Heading>
                        <Text fontWeight="bold" fontSize="xl" color="teal.600">$1000+</Text>
                        <Text>Advanced features, full e-commerce functionality, custom integrations.</Text>
                        <Button colorScheme="teal" variant="outline" size="md">Get Started</Button>
                    </VStack>
                </Box>
            </SimpleGrid>
        </Box>
    );
};

export default ServiceHighlight;
