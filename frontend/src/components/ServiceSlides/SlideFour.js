import React from 'react';
import { VStack, Icon, Box, Text, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaGrinStars } from "react-icons/fa";

const SlideFour = () => {

    const popInMotion = {
        initial: { scale: 0.3, opacity: 0 },
        animate: {
            scale: [1.5, 1],
            opacity: 1,
            transition: {
                duration: 1,
                ease: "easeInOut",
            },
        },
    };

    return (
        <VStack
            spacing={4}
            align="center"
            maxW="100%"
            px={4}
        >
            <span aria-label="Starstruck smiley face" role="img">
                <Box
                    position="relative"
                    width={{ base: "100px", md: "200px" }}
                    height={{ base: "100px", md: "200px" }}
                >
                    <motion.div
                        initial="initial"
                        animate="animate"
                        {...popInMotion}
                    >
                        <Icon as={FaGrinStars} w="100%" h="100%" color="teal.500" />
                    </motion.div>
                </Box>
            </span>
            <Heading as="h3" size={{ base: "md", md: "lg" }} color="white" textAlign="center">
                Step 4: Watch Your Vision Come to Life
            </Heading>
            <Text fontSize={{ base: "sm", md: "lg" }} color="white" textAlign="center">
                Once everything is finalized, sit back and watch your website come to life.
                Your digital presence will be enhanced with a professional, engaging website.
            </Text>
        </VStack>
    );
};

export default SlideFour;
