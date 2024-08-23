import React, { useState } from 'react';
import { VStack, HStack, Button, Heading, Text, CheckboxGroup, Checkbox, SimpleGrid, Box, useBreakpointValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

const StepFour = ({ addOns, setAddOns, additionalFee, setAdditionalFee, totalPrice, setTotalPrice, addOnOptions, onNext, onBack, numPages, pricePerPage, hasMedia, mediaFee }) => {
    const [flippedCategory, setFlippedCategory] = useState(null); // Track the flipped category

    // Determine if we are on a mobile screen
    const isMobile = useBreakpointValue({ base: true, md: false });

    const handleAddOnsChange = (selectedLabels) => {
        setAddOns(selectedLabels);

        // Calculate the price of selected add-ons
        const addOnPrices = selectedLabels.reduce((total, label) => {
            const addOnOption = addOnOptions.find(option => option.label === label);
            return total + (addOnOption ? addOnOption.price : 0);
        }, 0);

        const mediaFeeValue = hasMedia === "no" ? mediaFee : 0;

        // Calculate the new total price, ensuring that pages and media fee are always included
        const newTotalPrice = (numPages * pricePerPage) + addOnPrices + mediaFeeValue;

        // Set the additional fee and total price
        setAdditionalFee(addOnPrices);
        setTotalPrice(newTotalPrice > 0 ? newTotalPrice : (numPages * pricePerPage) + mediaFeeValue);
    };

    const groupedAddOns = {
        "E-commerce & Payment": addOnOptions.filter(option => ['Basic E-commerce Integration', 'Advanced E-commerce (Multiple Payment Gateways, Subscriptions)'].includes(option.label)),
        "Communication & Forms": addOnOptions.filter(option => ['Contact Form with Captcha', 'Custom Forms & Surveys', 'Live Chat Integration', 'Email Newsletter Integration'].includes(option.label)),
        "Content & Media": addOnOptions.filter(option => ['Social Media Feed Integration', 'Blog Setup', 'Complex Animations & Interactivity', 'Interactive Maps & Geolocation'].includes(option.label)),
        "Analytics & Optimization": addOnOptions.filter(option => ['Custom Analytics Integration', 'Advanced SEO Optimization', 'Performance Optimization for High Traffic'].includes(option.label)),
        "Security & Authentication": addOnOptions.filter(option => ['User Authentication & Login', 'Advanced Security Features (2FA, Security Audits)'].includes(option.label)),
        "Membership & User Management": addOnOptions.filter(option => ['Membership Portal', 'Multi-language Support', 'Custom CRM Integration'].includes(option.label)),
        "Advanced Features & Integrations": addOnOptions.filter(option => ['Custom API Integrations (Third-Party Apps)', 'Advanced Database Functionality'].includes(option.label))
    };

    const flipVariants = {
        initial: { rotateY: 0 },
        flipped: { rotateY: 180 },
    };

    return (
        <VStack spacing={6} alignItems="center" maxW="100%" height="80vh" overflow="hidden">
            <Text fontSize="lg" color="white" textAlign="center">Select any additional features you'd like to include:</Text>

            {!isMobile ? (
                // Desktop Layout: 3D Flip Cards
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} width="100%" height="100%" maxH="80vh" overflowY="auto">
                    {Object.entries(groupedAddOns).map(([category, options]) => (
                        <motion.div
                            key={category}
                            style={{ perspective: 1000 }} // Create 3D perspective
                            onClick={() => setFlippedCategory(flippedCategory === category ? null : category)} // Toggle flip on click
                        >
                            <motion.div
                                variants={flipVariants}
                                initial="initial"
                                animate={flippedCategory === category ? "flipped" : "initial"}
                                transition={{ duration: 0.6 }}
                                style={{
                                    width: "400px",
                                    height: "200px",
                                    position: "relative",
                                    transformStyle: "preserve-3d",
                                    transformOrigin: "center",
                                    cursor: "pointer",
                                }}
                            >
                                {/* Front of the card */}
                                <Box
                                    position="absolute"
                                    width="100%"
                                    height="100%"
                                    bg="teal.600"
                                    borderRadius="lg"
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    color="white"
                                    boxShadow="0px 0px 20px rgba(0, 0, 0, 0.2)"
                                    style={{ backfaceVisibility: "hidden", zIndex: 2 }}
                                >
                                    <Heading size="md" textAlign="center">{category}</Heading>
                                </Box>

                                {/* Back of the card */}
                                <Box
                                    position="absolute"
                                    width="100%"
                                    height="100%"
                                    bg="gray.800"
                                    borderRadius="lg"
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="space-evenly"
                                    alignItems="start"
                                    p={8}
                                    color="white"
                                    transform="rotateY(180deg)"
                                    style={{ backfaceVisibility: "hidden", zIndex: 1 }}
                                >
                                    <CheckboxGroup value={addOns} onChange={handleAddOnsChange} colorScheme="teal">
                                        {options.map(option => (
                                            <Checkbox key={option.label} value={option.label}>
                                                <Text color="teal.200" fontSize="md">{option.label} (+${option.price})</Text>
                                            </Checkbox>
                                        ))}
                                    </CheckboxGroup>
                                </Box>
                            </motion.div>
                        </motion.div>
                    ))}
                </SimpleGrid>
            ) : (
                // Mobile Layout: Simple Categories and Checkboxes
                <VStack spacing={4} alignItems="flex-start" maxW="100%" overflowY="auto" maxH="80vh" p={4}>
                    {Object.entries(groupedAddOns).map(([category, options]) => (
                        <Box key={category} width="100%" p={4} bg="gray.700" borderRadius="md">
                            <Heading size="sm" color="white">{category}</Heading>
                            <CheckboxGroup value={addOns} onChange={handleAddOnsChange} colorScheme="teal">
                                {options.map(option => (
                                    <Checkbox key={option.label} value={option.label} mt={2}>
                                        <Text color="teal.200" fontSize="xs">{option.label} (+${option.price})</Text>
                                    </Checkbox>
                                ))}
                            </CheckboxGroup>
                        </Box>
                    ))}
                </VStack>
            )}

            <HStack spacing={4} mt={4}>
                <Button colorScheme="teal" variant="outline" size="lg" onClick={onBack}>
                    Back
                </Button>
                <Button colorScheme="teal" variant="outline" size="lg" onClick={onNext}>
                    Next
                </Button>
            </HStack>
        </VStack>
    );
};

export default StepFour;
