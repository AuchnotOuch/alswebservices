import React from 'react';
import { SimpleGrid, Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

const ServiceHighlight = () => {
    const navigate = useNavigate();

    const handleGetStartedClick = (serviceType) => {
        navigate(`/services/${serviceType}`);
    };

    return (
        <Box id="services" py={1} px={4} bg="transparent" >
            <SimpleGrid columns={[1, null, 3]} spacing="40px" bg="transparent">
                {/* Basic Package */}
                <Box
                    borderWidth="1px"
                    borderRadius="lg"
                    borderColor="teal"
                    color="white"
                    overflow="hidden"
                    p={6}
                    bg="transparent"
                    boxShadow="0 4px 12px rgba(56, 178, 172, 0.6)"
                    textAlign="center"
                    height="full"  // Ensure the box is full height
                >
                    <VStack spacing={4} justifyContent="space-between" height="full" bg="transparent">
                        <Heading size="md">Basic Website Package</Heading>
                        <Text fontWeight="bold" fontSize="xl" color="teal.600">$100+</Text>
                        <Text>Up to 5 pages, responsive design, SEO optimization.</Text>
                        <Button
                            colorScheme="teal"
                            variant="outline"
                            size="md"
                            onClick={() => handleGetStartedClick('basic')}
                        >
                            Get Started
                        </Button>
                    </VStack>
                </Box>

                {/* Standard Package */}
                <Box
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    borderColor="teal"
                    color="white"
                    p={6}
                    bg="transparent"
                    boxShadow="0 4px 12px rgba(56, 178, 172, 0.6)"
                    textAlign="center"
                    height="full"  // Ensure the box is full height
                >
                    <VStack spacing={4} justifyContent="space-between" height="full">
                        <Heading size="md">Standard Website Package</Heading>
                        <Text fontWeight="bold" fontSize="xl" color="teal.600">$500+</Text>
                        <Text>Up to 10 pages, e-commerce integration, premium design.</Text>
                        <Button
                            colorScheme="teal"
                            variant="outline"
                            size="md"
                            onClick={() => handleGetStartedClick('standard')}
                        >
                            Get Started
                        </Button>
                    </VStack>
                </Box>

                {/* Premium Package */}
                <Box
                    borderWidth="1px"
                    borderRadius="lg"
                    borderColor="teal"
                    color="white"
                    overflow="hidden"
                    p={6}
                    bg="transparent"
                    boxShadow="0 4px 12px rgba(56, 178, 172, 0.6)"
                    textAlign="center"
                    height="full"  // Ensure the box is full height
                >
                    <VStack spacing={4} justifyContent="space-between" height="full">
                        <Heading size="md">Premium Website Package</Heading>
                        <Text fontWeight="bold" fontSize="xl" color="teal.600">$1000+</Text>
                        <Text>Advanced features, full e-commerce functionality, custom integrations.</Text>
                        <Button
                            colorScheme="teal"
                            variant="outline"
                            size="md"
                            onClick={() => handleGetStartedClick('premium')}
                        >
                            Get Started
                        </Button>
                    </VStack>
                </Box>
            </SimpleGrid>
        </Box>
    );
};

export default ServiceHighlight;
