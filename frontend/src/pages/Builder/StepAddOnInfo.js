import React, { useState } from 'react';
import { VStack, HStack, Button, Heading, Text, IconButton } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const StepAddOnInfo = ({ onNext, onBack }) => {
    const slides = [
        "Next, we'll introduce you to the various additional features, or 'add-ons,' that you can choose for your website.",
        "Don’t worry if these features seem overwhelming. This step helps you make informed choices, but it’s okay if you’re unsure. We’ll discuss your specific needs and clarify everything during our consultation.",
        "Don't worry about making any permanent decisions here—nothing is finalized until after we have our consultation. Ready to explore your website's full potential? Let's proceed!"
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    const handleNextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        } else {
            onNext();
        }
    };

    const handlePreviousSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        } else {
            onBack();
        }
    };

    return (
        <VStack minWidth="350px" spacing={6} alignItems="center" textAlign="center" height="auto" justifyContent="center" px={4}>
            <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
                aria-live="polite"
            >
                <Heading textAlign="center" color="teal.300" size="lg" mb={4}>
                    Additional Features Overview
                </Heading>
                <Text textAlign="left" fontSize="lg" color="white" maxW="600px">
                    {slides[currentSlide]}
                </Text>
            </motion.div>

            <HStack spacing={4} mt={8}>
                <IconButton
                    icon={<ArrowBackIcon />}
                    colorScheme="teal"
                    size="lg"
                    onClick={handlePreviousSlide}
                    isDisabled={currentSlide === 0}
                    aria-label="Back to previous slide"
                />
                {currentSlide === slides.length - 1 ? (
                    <Button colorScheme="teal" size="lg" onClick={handleNextSlide}>
                        Proceed
                    </Button>
                ) : (
                    <IconButton
                        icon={<ArrowForwardIcon />}
                        colorScheme="teal"
                        size="lg"
                        onClick={handleNextSlide}
                        aria-label="Go to next slide"
                    />
                )}
            </HStack>
            <Button colorScheme="teal" variant="outline" size="lg" onClick={onBack}>Back</Button>
        </VStack>
    );
};

export default StepAddOnInfo;
