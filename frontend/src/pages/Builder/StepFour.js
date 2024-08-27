import React, { useState } from 'react';
import { VStack, HStack, Button, Heading, Text, CheckboxGroup, Checkbox, SimpleGrid, Box, useBreakpointValue, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { InfoOutlineIcon } from "@chakra-ui/icons";

const StepFour = ({ addOns, setAddOns, setAdditionalFee, setTotalPrice, addOnOptions, onNext, onBack, numPages, pricePerPage, hasMedia, mediaFee }) => {
    const [flippedCategory, setFlippedCategory] = useState(null);
    const [selectedAddOnInfo, setSelectedAddOnInfo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isMobile = useBreakpointValue({ base: true, md: false });

    const handleAddOnsChange = (selectedLabels) => {
        setAddOns(selectedLabels);

        const addOnPrices = selectedLabels.reduce((total, label) => {
            const addOnOption = addOnOptions.find(option => option.label === label);
            return total + (addOnOption ? addOnOption.price : 0);
        }, 0);

        const mediaFeeValue = hasMedia === "no" ? mediaFee : 0;

        const newTotalPrice = (numPages * pricePerPage) + addOnPrices + mediaFeeValue;

        setAdditionalFee(addOnPrices);
        setTotalPrice(newTotalPrice > 0 ? newTotalPrice : (numPages * pricePerPage) + mediaFeeValue);
    };

    const handleInfoClick = (addOnLabel) => {
        const selectedAddOn = addOnOptions.find(option => option.label === addOnLabel);
        setSelectedAddOnInfo(selectedAddOn);
        setIsModalOpen(true);
    };

    const groupedAddOns = {
        "E-commerce & Payment": addOnOptions.filter(option => ['Basic E-commerce Integration', 'Advanced E-commerce (Multiple Payment Gateways, Subscriptions)'].includes(option.label)),
        "Communication & Forms": addOnOptions.filter(option => ['Contact Form with Captcha', 'Custom Forms & Surveys', 'Live Chat Integration', 'Email Newsletter Integration'].includes(option.label)),
        "Content & Media": addOnOptions.filter(option => ['Social Media Feed Integration', 'Blog Setup', 'CMS Implementation'].includes(option.label)),
        "Analytics & Optimization": addOnOptions.filter(option => ['Basic SEO Setup', 'Advanced SEO Optimization', 'Image & Media Optimization'].includes(option.label)),
        "Security & Authentication": addOnOptions.filter(option => ['User Authentication & Login', 'Advanced Security Features (2FA, Security Audits)'].includes(option.label)),
        "Membership & User Management": addOnOptions.filter(option => ['Membership Portal', 'Multi-language Support'].includes(option.label)),
        "Advanced Features & Integrations": addOnOptions.filter(option => ['Custom API Integrations (Third-Party Apps)', 'Interactive Maps & Geolocation'].includes(option.label))
    };

    const flipVariants = {
        initial: { rotateY: 0 },
        flipped: { rotateY: 180 },
    };

    return (
        <VStack minWidth="350px" spacing={6} alignItems="center" maxW="100%" height="80vh" overflow="hidden">
            <Text fontSize="lg" color="white" textAlign="center">Select any additional features you'd like to include:</Text>

            {!isMobile ? (
                <SimpleGrid
                    columns={{ base: 1, md: 2 }}
                    spacing={6}
                    width="100%"
                    height="100%"
                    maxH="80vh"
                    overflowY="auto"
                    role="grid"
                    aria-label="Add-ons categories"
                >
                    {Object.entries(groupedAddOns).map(([category, options]) => (
                        <motion.div
                            key={category}
                            style={{ perspective: 1000 }}
                            onClick={() => setFlippedCategory(flippedCategory === category ? null : category)}
                            role="region" // Describes the region for screen readers
                            aria-labelledby={`${category}-heading`} // Matches to the heading
                            tabIndex="0" // Ensures it is focusable by keyboard
                            onKeyPress={(e) => e.key === 'Enter' && setFlippedCategory(flippedCategory === category ? null : category)} // Ensures keyboard users can flip cards
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
                                    <Heading size="md" id={`${category}-heading`} textAlign="center">{category}</Heading>
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
                                            <HStack key={option.label} spacing={3}>
                                                <Checkbox value={option.label}>
                                                    <Text color="teal.200" fontSize="md">{option.label} (+${option.price})</Text>
                                                </Checkbox>
                                                <IconButton
                                                    icon={<InfoOutlineIcon />}
                                                    aria-label={`More information about ${option.label}`}
                                                    size="sm"
                                                    variant="ghost"
                                                    colorScheme="teal"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleInfoClick(option.label);
                                                    }}
                                                />
                                            </HStack>
                                        ))}
                                    </CheckboxGroup>
                                </Box>
                            </motion.div>
                        </motion.div>
                    ))}
                    {/* Unsure card */}
                    <motion.div
                        style={{ perspective: 1000 }}
                        onClick={() => setFlippedCategory(flippedCategory === 'Unsure' ? null : 'Unsure')}
                        role="region" // Marks it as a section
                        aria-labelledby="unsure-heading" // Links to the heading for screen readers
                        tabIndex="0" // Makes it focusable
                        onKeyPress={(e) => e.key === 'Enter' && setFlippedCategory(flippedCategory === 'Unsure' ? null : 'Unsure')} // Keyboard support for flip
                    >
                        <motion.div
                            variants={flipVariants}
                            initial="initial"
                            animate={flippedCategory === 'Unsure' ? 'flipped' : 'initial'}
                            transition={{ duration: 0.6 }}
                            style={{
                                width: '400px',
                                height: '200px',
                                position: 'relative',
                                transformStyle: 'preserve-3d',
                                transformOrigin: 'center',
                                cursor: 'pointer',
                            }}
                        >
                            {/* Front of the Unsure card */}
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
                                style={{ backfaceVisibility: 'hidden', zIndex: 2 }}
                            >
                                <Heading size="md" id="unsure-heading" textAlign="center">Unsure?</Heading>
                            </Box>

                            {/* Back of the Unsure card */}
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
                                style={{ backfaceVisibility: 'hidden', zIndex: 1 }}
                            >
                                <Text textAlign="center" fontSize="md" color="teal.200">
                                    Not sure which add-ons you need? Don't worry! We can discuss your needs in detail during your consultation.
                                </Text>
                                <Checkbox value="Unsure" onChange={(e) => handleAddOnsChange([...addOns, 'Unsure'])}>
                                    <Text color="teal.200" fontSize="md">I'm Unsure (+$0)</Text>
                                </Checkbox>
                            </Box>
                        </motion.div>
                    </motion.div>
                </SimpleGrid>
            ) : (
                <VStack spacing={4} alignItems="flex-start" maxW="100%" overflowY="auto" maxH="80vh" p={4}>
                    {Object.entries(groupedAddOns).map(([category, options]) => (
                        <Box key={category} width="100%" p={4} bg="gray.700" borderRadius="md">
                            <Heading size="sm" color="white">{category}</Heading>
                            <CheckboxGroup value={addOns} onChange={handleAddOnsChange} colorScheme="teal">
                                {options.map(option => (
                                    <HStack key={option.label} spacing={3}>
                                        <Checkbox value={option.label} mt={2}>
                                            <Text color="teal.200" fontSize="xs">{option.label} (+${option.price})</Text>
                                        </Checkbox>
                                        <IconButton
                                            icon={<InfoOutlineIcon />}
                                            size="sm"
                                            variant="ghost"
                                            colorScheme="teal"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleInfoClick(option.label);
                                            }}
                                        />
                                    </HStack>
                                ))}
                            </CheckboxGroup>
                        </Box>
                    ))}
                    <Box width="100%" p={4} bg="gray.700" borderRadius="md" onClick={() => handleAddOnsChange([...addOns, 'Unsure'])}>
                        <Heading size="sm" color="white" textAlign="center">Unsure?</Heading>
                        <Text textAlign="center" fontSize="md" color="teal.200">
                            Not sure which add-ons you need? Don't worry! We can discuss your needs in detail during your consultation.
                        </Text>
                        <Checkbox value="Unsure" onChange={(e) => handleAddOnsChange([...addOns, 'Unsure'])} mt={2}>
                            <Text color="teal.200" fontSize="xs">I'm Unsure (+$0)</Text>
                        </Checkbox>
                    </Box>
                </VStack>
            )}


            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                isCentered
                motionPreset="slideInBottom"
                closeOnOverlayClick={false}
                role="dialog"
                aria-labelledby="modal-heading"
                aria-describedby="modal-description"
            >
                <ModalOverlay />
                <ModalContent
                    maxW={{ base: "90%", md: "500px" }}
                    mx="auto"
                    textAlign="center"
                >
                    <ModalHeader id="modal-heading">{selectedAddOnInfo?.label}</ModalHeader>
                    <ModalCloseButton aria-label="Close Modal" />
                    <ModalBody id="modal-description">
                        <Text>
                            {selectedAddOnInfo?.description || "This is a description of the selected add-on, explaining its purpose and benefits in simple terms."}
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="teal" onClick={() => setIsModalOpen(false)}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

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
