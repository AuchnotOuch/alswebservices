import React from 'react';
import { VStack, Icon, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { MdCheckBox } from 'react-icons/md';

const SlideTwo = () => {
    const checkboxes = [1, 2, 3, 4]; // Array to represent each checkbox

    const fadeIn = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.5 }
    };

    return (
        <VStack spacing={1} alignItems="center" justify="center" h="100%" w="100%">
            {checkboxes.map((_, index) => (
                <motion.div
                    key={index}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: index * 0.3, ...fadeIn.transition }} // Delay each checkbox
                    variants={fadeIn}
                >
                    <Icon as={MdCheckBox} boxSize={10} color="teal.500" />
                </motion.div>
            ))}
            <Heading size="lg" color="white">Step 2: Choose Your Add-ons</Heading>
            <Text fontSize="lg" color="white" mt={4}>
                Select from a wide range of additional features like e-commerce, live chat, SEO optimization, and more to enhance your website's functionality and user experience.
            </Text>
        </VStack>
    );
};

export default SlideTwo;
