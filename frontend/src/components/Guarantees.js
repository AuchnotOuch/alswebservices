import React, { useEffect, useRef, useState } from 'react';
import { Box, Text, VStack, IconButton } from "@chakra-ui/react";
import { motion } from 'framer-motion';
import { Link as ScrollLink } from "react-scroll";
import { FaArrowDown } from "react-icons/fa";

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

    useEffect(() => {
        if (isVisible) {
            guaranteeRef.current.focus();
        }
    }, [isVisible]);

    const guarantees = [
        { icon: "fa-paint-roller", text: "Professional designs" },
        { icon: "fa-mobile-screen-button", text: "Mobile-friendly and responsive layouts" },
        { icon: "fa-magnifying-glass", text: "SEO optimization for better visibility" },
        { icon: "fa-cart-shopping", text: "E-commerce integration for your online store" },
        { icon: "fa-screwdriver-wrench", text: "Ongoing support and maintenance" },
    ];

    const slideInVariants = (index) => ({
        hidden: { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 1, ease: "easeInOut", delay: index * 0.6 }
        },
    });

    return (
        <Box id="guarantees" ref={guaranteeRef} py={0} px={4} bg="transparent" tabIndex={-1} role="region" aria-label="Guarantees Section">
            <VStack spacing={8} maxW="500px" mx="auto" alignItems="center" bg="transparent">
                {guarantees.map((guarantee, index) => (
                    <motion.div
                        key={index}
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                        variants={slideInVariants(index)}
                        style={{ width: '100%' }}
                    >
                        <VStack
                            spacing={4}
                            align="center"
                            direction={{ base: "column", md: "row" }}
                        >
                            <Box
                                as="i"
                                className={`fa-solid ${guarantee.icon}`}
                                fontSize={{ base: "3xl", md: "5xl" }}
                                color="rgb(236, 97, 71)"
                                aria-label={guarantee.text}
                            />
                            <Text as="h2" fontSize={{ base: "md", md: "xl" }} color="white">
                                {guarantee.text}
                            </Text>
                        </VStack>
                    </motion.div>
                ))}
                <ScrollLink to="service-highlight" smooth={true} duration={500} offset={-100}>
                    <IconButton
                        aria-label="Scroll down to service highlights section"
                        icon={<FaArrowDown />}
                        size="lg"
                        variant="outline"
                        colorScheme="teal"
                        mt={1}
                        _hover={{ bg: "rgba(255, 255, 255, 0.2)" }}
                    />
                </ScrollLink>
            </VStack>
        </Box>
    );
};

export default Guarantees;
