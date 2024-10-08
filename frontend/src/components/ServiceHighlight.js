import React, { useState, useEffect, useRef } from 'react';
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
    const [isInView, setIsInView] = useState(false);
    const [isLaunching, setIsLaunching] = useState(false);
    const [sectionsHidden, setSectionsHidden] = useState(false);
    const serviceHighlightRef = useRef(null);
    const navigate = useNavigate();

    const slides = [<SlideOne />, <SlideTwo />, <SlideThree />, <SlideFour />];

    const handleNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const handlePreviousSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };

    const handleGetStarted = () => {
        setIsLaunching(true);
        setTimeout(() => {
            setSectionsHidden(true);
        }, 50);
        setTimeout(() => {
            navigate("/build");
        }, 2500);
    };

    const rocketMotion = {
        initial: { y: 0 },
        animate: {
            y: -1000,
            transition: { duration: 3, ease: "easeInOut" }
        }
    };

    useEffect(() => {
        let interval;
        if (isInView) {
            interval = setInterval(() => {
                handleNextSlide();
            }, 8000);
        }

        return () => clearInterval(interval);
    }, [isInView]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.5 }
        );

        if (serviceHighlightRef.current) {
            observer.observe(serviceHighlightRef.current);
        }

        return () => {
            if (serviceHighlightRef.current) {
                observer.unobserve(serviceHighlightRef.current);
            }
        };
    }, []);

    return (
        <VStack id="service-highlight" ref={serviceHighlightRef} spacing={8} alignItems="center" justify="space-evenly" h="80vh" bg="transparent" position="relative" zIndex={99}>
            {!sectionsHidden && (
                <>
                    <Box
                        p={9}
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
                            aria-live="polite"
                        >
                            {slides[currentSlide]}
                        </motion.div>

                        <HStack justify="space-between" position="absolute" bottom={4} left={4} right={4} zIndex={2}>
                            <IconButton
                                icon={<ArrowBackIcon />}
                                colorScheme="teal"
                                variant="ghost"
                                onClick={handlePreviousSlide}
                                cursor="pointer"
                                zIndex={99}
                                aria-label="Previous Slide"
                            />
                            <IconButton
                                icon={<ArrowForwardIcon />}
                                colorScheme="teal"
                                variant="ghost"
                                onClick={handleNextSlide}
                                cursor="pointer"
                                zIndex={99}
                                aria-label="Next Slide"
                            />
                        </HStack>
                    </Box>

                    <HStack spacing={4} mt={0} zIndex={99}>
                        <Button aria-label="Get Started with Building Your Website" w="300px" h="100px" fontSize="xxx-large" colorScheme="teal" variant="outline" onClick={handleGetStarted}>
                            Get Started
                        </Button>
                    </HStack>
                </>
            )}

            {isLaunching && (
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={rocketMotion}
                    style={{ position: 'absolute', bottom: 0, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    role="img"
                    aria-label="Rocket launching animation"
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                    >
                        <Box
                            as='i'
                            className="fa-brands fa-space-awesome"
                            fontSize="xxx-large"
                            color="teal.400"
                        />
                        <Box
                            className="rocket-thruster"
                            ml={-2.5}
                        />
                    </Box>
                </motion.div>
            )}
        </VStack>
    );
};

export default ServiceHighlight;
