import React, { useState } from 'react';
import { VStack, Button, Text, Heading, HStack, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const StepInfo = ({ onNext }) => {
    const slides = [
        "Welcome! I'm excited to help you build the perfect website. My Price Builder tool is designed to give you control over your site’s features while keeping the process simple and transparent. Think of this as a roadmap to estimate costs and plan ahead with confidence.",

        "Please remember, the prices shown here are just estimates. They offer a general idea of what to expect but aren’t final. We’ll refine your choices during our consultation to create a custom solution that fits your specific needs and goals.",

        "The Price Builder lets you explore features like e-commerce, content management, and social media integration in a way that feels manageable. It helps you discover what aligns best with your vision so I can craft a plan tailored to your website’s requirements.",

        "I know it can be overwhelming, especially if you're unsure about certain options. That’s why I’ve added 'Unsure' selections so you can continue without making any commitments just yet. During our consultation, we’ll review everything and fine-tune your choices.",

        "Take your time exploring the possibilities, and know that I'm here to guide you every step of the way. Your project is unique, and I’m committed to ensuring every detail is carefully considered. Let’s see what exciting opportunities we can create together!"
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    const handleNextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const handlePreviousSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    return (
        <VStack spacing={6} align="center" textAlign="center">
            <Heading textAlign="center" color="teal.300" size="lg">Welcome to the Price Builder</Heading>

            {/* Slideshow content */}
            <Text textAlign="left" fontSize="lg" color="white">
                {slides[currentSlide]}
            </Text>

            {/* Arrow buttons */}
            <HStack spacing={4}>
                <IconButton
                    icon={<ArrowBackIcon />}
                    isDisabled={currentSlide === 0}
                    onClick={handlePreviousSlide}
                    colorScheme="teal"
                    aria-label="Previous slide"
                />
                <IconButton
                    icon={<ArrowForwardIcon />}
                    isDisabled={currentSlide === slides.length - 1}
                    onClick={handleNextSlide}
                    colorScheme="teal"
                    aria-label="Next slide"
                />
            </HStack>

            {/* Show the "Start Price Builder" button only on the last slide */}
            {currentSlide === slides.length - 1 && (
                <Button colorScheme="teal" onClick={onNext} size="lg">
                    Start Price Builder
                </Button>
            )}
        </VStack>
    );
};

export default StepInfo;
