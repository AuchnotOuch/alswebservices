import React from 'react';
import { VStack, Icon, Box, Text, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaPen, FaCalendarAlt } from "react-icons/fa"; // Pen and Calendar Icons

const SlideThree = () => {
    const circleMotion = {
        initial: { x: 0, y: 0 },
        animate: {
            x: ["0%", "15%", "30%", "15%", "0%"], // Moves in a circle, but with percentages
            y: ["0%", "50%", "0%", "50%", "0%"],
        },
        transition: {
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
        },
    };

    return (
        <VStack spacing={4} align="center" maxW="100%" px={4}>
            <Box position="relative" width={{ base: "100px", md: "200px" }} height={{ base: "100px", md: "200px" }}>
                {/* Calendar Icon */}
                <Icon as={FaCalendarAlt} w="100%" h="100%" color="teal.500" />

                {/* Pen Icon */}
                <motion.div
                    initial="initial"
                    animate="animate"
                    transition="transition"
                    style={{ position: "absolute", top: '30%', left: '20%' }}
                    {...circleMotion}
                >
                    <Icon as={FaPen} w={{ base: 6, md: 10 }} h={{ base: 6, md: 10 }} color="teal.300" />
                </motion.div>
            </Box>

            <Heading size={{ base: "md", md: "lg" }} color="white" textAlign="center">
                Step 3: Book an Appointment
            </Heading>
            <Text fontSize={{ base: "sm", md: "lg" }} color="white" textAlign="center">
                Schedule a consultation to finalize your project. No upfront payment required until after the consultation!
            </Text>
        </VStack>
    );
};

export default SlideThree;
