import React from 'react';
import { Box, Heading, Text, VStack, IconButton, Image } from "@chakra-ui/react";
import { FaArrowDown } from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";

const HeroSection = () => {
    return (
        <>
            <Box
                minHeight={{ base: "auto", md: "100vh" }}
                width="100vw"
                bgImage="
                    linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(5, 18, 32, 1) 100%),
                    url('/images/herobackground2.webp')
                "
                bgSize="cover"
                bgPosition="center"
                bgRepeat="no-repeat"
                display="flex"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                py={{ base: 8, md: 0 }}
            >
                <VStack spacing={4} p={8} borderRadius="lg" zIndex={1}>
                    <Image w="300px" src="/images/alslogo.png" alt="Al's Web Services logo" />
                    <Heading as="h1" size="2xl" color="white">Welcome to Al's Web Services</Heading>
                    <Text fontSize="lg" color="white">Professional websites that boost your online presence.</Text>

                    <ScrollLink to="guarantees" smooth={true} duration={500} offset={-100} tabIndex="0">
                        <IconButton
                            aria-label="Scroll down to Guarantees section"
                            icon={<FaArrowDown />}
                            size="lg"
                            variant="outline"
                            colorScheme="teal"
                            mt={8}
                            _hover={{ bg: "rgba(255, 255, 255, 0.2)" }}
                        />
                    </ScrollLink>
                </VStack>
            </Box>
        </>
    );
};

export default HeroSection;
