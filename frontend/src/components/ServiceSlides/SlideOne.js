import React from 'react';
import { VStack, Icon, Box, Text, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaPen, FaRegFile } from "react-icons/fa"; // Pen and Paper Icon

const SlideOne = () => {
    const penMotion = {
        initial: { x: 0, y: 0 },
        animate: {
            x: ["0%", "100%", "0%"], // Moves horizontally across the paper
            y: ["0%", "30%", "0%", "90%", "0%"], // Simulates lines being written
        },
        transition: {
            repeat: Infinity,
            duration: 5, // Adjust duration for smoother motion
            ease: "easeInOut",
        },
    };

    return (
        <VStack
            spacing={4}
            align="center"
            maxW="100%"
            px={4} // Add padding for smaller screens
        >
            <Box position="relative" width={{ base: "100px", md: "200px" }} height={{ base: "100px", md: "200px" }}>
                {/* Paper Icon */}
                <Icon as={FaRegFile} w="100%" h="100%" color="teal.500" />

                {/* Pen Icon */}
                <motion.div
                    initial="initial"
                    animate="animate"
                    transition="transition"
                    style={{ position: "absolute", top: 30, left: 20 }}
                    {...penMotion}
                >
                    <Icon as={FaPen} w={{ base: 6, md: 10 }} h={{ base: 6, md: 10 }} color="teal.300" />
                </motion.div>
            </Box>

            <Heading size={{ base: "md", md: "lg" }} color="white" textAlign="center">
                Step 1: Share Your Vision
            </Heading>
            <Text fontSize={{ base: "sm", md: "lg" }} color="white" textAlign="center">
                Provide us with the basic information of what you want your website to include.
                Whether it's a portfolio, e-commerce site, or a digital hub, we're here to bring your vision to life.
            </Text>
        </VStack>
    );
};

export default SlideOne;
