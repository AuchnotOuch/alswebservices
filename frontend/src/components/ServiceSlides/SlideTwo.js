import React from 'react';
import { VStack, SimpleGrid, Icon, Text, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaCheckSquare } from "react-icons/fa";

const SlideTwo = () => {
    const fadeInVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.5,
                duration: 0.8,
            },
        }),
    };

    return (
        <VStack
            spacing={4}
            align="center"
            maxW="100%"
            px={4}
        >
            <span aria-label="Check boxes with checkmarks" role="img">
                <SimpleGrid columns={2} spacing={8} pt={4}>
                    {[...Array(4)].map((_, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            initial="hidden"
                            animate="visible"
                            variants={fadeInVariants}
                        >
                            <Icon as={FaCheckSquare} w={{ base: 8, md: 12 }} h={{ base: 8, md: 12 }} color="teal.500" aria-hidden="true" />
                        </motion.div>
                    ))}
                </SimpleGrid>
            </span>
            <Heading as="h3" size={{ base: "md", md: "lg" }} color="white" textAlign="center">
                Step 2: Choose Your Add-ons
            </Heading>
            <Text fontSize={{ base: "sm", md: "lg" }} color="white" textAlign="center">
                Select additional features to enhance your website’s functionality and user experience.
            </Text>
        </VStack>
    );
};

export default SlideTwo;
