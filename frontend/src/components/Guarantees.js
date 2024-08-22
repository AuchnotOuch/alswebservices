import React, { useEffect, useRef, useState } from 'react';
import { Box, Text, VStack, HStack } from "@chakra-ui/react";
import { motion } from 'framer-motion';

const Guarantees = () => {
    const [isVisible, setIsVisible] = useState(false);
    const guaranteeRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (guaranteeRef.current) {
            observer.observe(guaranteeRef.current);
        }

        return () => {
            if (guaranteeRef.current) {
                observer.unobserve(guaranteeRef.current);
            }
        };
    }, []);

    const guarantees = [
        { icon: "fa-paint-roller", text: "Professional designs" },
        { icon: "fa-mobile-screen-button", text: "Mobile-friendly and responsive layouts" },
        { icon: "fa-magnifying-glass", text: "SEO optimization for better visibility" },
        { icon: "fa-cart-shopping", text: "E-commerce integration for your online store" },
        { icon: "fa-screwdriver-wrench", text: "Ongoing support and maintenance" },
    ];

    // Define slide-in variants for left and right
    const slideInVariants = (index) => ({
        hidden: { opacity: 0, x: index % 2 === 0 ? -100 : 100 }, // Slide from left if index is even, right if odd
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 1, ease: "easeInOut", delay: index * 0.6 }
        },
    });

    return (
        <Box ref={guaranteeRef} py={12} px={4} bg="rgb(5, 18, 32)">
            <VStack spacing={8} maxW="500px" mx="auto" alignItems="flex-start">
                {guarantees.map((guarantee, index) => (
                    <motion.div
                        key={index}
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                        variants={slideInVariants(index)}
                        style={{ width: '100%' }}  // Ensure full width for alignment
                    >
                        <HStack spacing={4} align="center">
                            <Box
                                as="i"
                                className={`fa-solid ${guarantee.icon}`}
                                fontSize="5xl"
                                color="rgb(236, 97, 71)"
                                minWidth="40px"
                            />
                            <Text fontSize="xl" color="white">
                                {guarantee.text}
                            </Text>
                        </HStack>
                    </motion.div>
                ))}
            </VStack>
        </Box>
    );
};

export default Guarantees;
