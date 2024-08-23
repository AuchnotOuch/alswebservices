import React, { useState, useEffect } from 'react';
import { VStack, Box, IconButton, Button, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useNavigate } from 'react-router-dom';
import SlideOne from './ServiceSlides/SlideOne';
import SlideTwo from './ServiceSlides/SlideTwo';
import SlideThree from './ServiceSlides/SlideThree';
import SlideFour from './ServiceSlides/SlideFour';

const ServiceHighlight = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    const slides = [<SlideOne />, <SlideTwo />, <SlideThree />, <SlideFour />];

    const handleNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const handlePreviousSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };

    const handleGetStarted = () => {
        navigate("/build");
    };

    // Confetti animation
    const createConfetti = () => {
        const container = document.getElementById("confetti-container");
        if (!container) return;

        const colors = ['#FF595E', '#FFCA3A', '#8AC926', '#1982C4', '#6A4C93'];

        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement("div");
            confetti.className = "confetti-piece";
            const color = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.backgroundColor = color;
            container.appendChild(confetti);

            // Random positioning and size
            const size = Math.random() * 8 + 4 + 'px';
            confetti.style.width = size;
            confetti.style.height = size;

            // Start at the bottom
            confetti.style.left = '50%';
            confetti.style.bottom = '0';
            confetti.style.position = 'absolute';

            // Explosion effect with wider horizontal and vertical spread
            const explosionX = (Math.random() - 0.5) * 1500;  // Wide horizontal spread
            const explosionY = -(Math.random() * 500 + 300);  // Vertical burst upward
            const initialSpeed = Math.random() * 200 + 500;  // Speed for explosion phase

            // Animate the explosion phase (burst) and drift down (slow phase)
            confetti.animate([
                { transform: `translateY(0) translateX(0)`, opacity: 1 },
                { transform: `translateY(${explosionY}px) translateX(${explosionX}px)`, opacity: 1 }
            ], {
                duration: initialSpeed,
                easing: 'ease-out',
                iterations: 1,
            });

            // Drift down effect with random falling speed and a slight float effect
            const driftSpeed = Math.random() * 3000 + 4000;  // Slow drift down
            setTimeout(() => {
                confetti.animate([
                    { transform: `translateY(${explosionY}px) translateX(${explosionX}px)`, opacity: 1 },
                    { transform: `translateY(1000px) translateX(${explosionX}px)`, opacity: 0 }
                ], {
                    duration: driftSpeed,
                    easing: 'ease-in',
                    iterations: 1,
                });
            }, initialSpeed);  // Delay drift down until explosion finishes

            // Remove the confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, initialSpeed + driftSpeed);
        }
    };

    // Automatically advance slides and trigger confetti on slide 4
    useEffect(() => {
        const interval = setInterval(() => {
            handleNextSlide();
        }, 8000); // 8-second interval per slide

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (currentSlide === 3) {
            createConfetti(); // Trigger confetti on slide 4
        }
    }, [currentSlide]);

    return (
        <VStack spacing={8} alignItems="center" justify="center" h="80vh" bg="transparent" position="relative" zIndex={99}>
            {/* Slide Container */}
            <Box
                borderWidth="2px"
                borderColor="teal"
                borderRadius="lg"
                bg="rgba(5, 18, 32, .7)"
                p={9}
                boxShadow="0 4px 50px rgba(56, 178, 172, 0.6)"
                w="100%"
                maxW="800px"
                maxH="400px"
                textAlign="center"
                position="relative"
                zIndex={1}
            >
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {slides[currentSlide]}
                </motion.div>

                <Box id="confetti-container" position="absolute" top={0} left={0} width="100%" height="100%" zIndex={0}></Box>
                {/* Arrow buttons inside the slide container, positioned at the bottom */}
                <HStack justify="space-between" position="absolute" bottom={4} left={4} right={4} zIndex={2}>
                    <IconButton
                        icon={<ArrowBackIcon />}
                        colorScheme="teal"
                        variant="ghost"
                        onClick={handlePreviousSlide}
                        cursor="pointer"
                        zIndex={99}  // Ensure it's on top of everything
                    />
                    <IconButton
                        icon={<ArrowForwardIcon />}
                        colorScheme="teal"
                        variant="ghost"
                        onClick={handleNextSlide}
                        cursor="pointer"
                        zIndex={99}  // Ensure it's on top of everything
                    />
                </HStack>
            </Box>

            {/* Get Started Button */}
            <HStack spacing={4} mt={8}>
                <Button colorScheme="teal" variant="outline" onClick={handleGetStarted}>
                    Get Started
                </Button>
            </HStack>

            {/* Confetti Container */}
        </VStack>
    );
};

export default ServiceHighlight;
