import React, { useEffect } from 'react';
import { VStack, Heading, Text } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { Icon } from "@chakra-ui/icons";
import { FaCalendarAlt, FaPen } from "react-icons/fa";

const SlideThree = () => {
    const penControls = useAnimation();

    useEffect(() => {
        // Start the pen animation after the calendar icon fades in
        const sequence = async () => {
            await penControls.start({ opacity: 1 });
            await penControls.start({
                x: [0, 15, 30, 15, 0, -15, -30, -15, 0],  // Creating a circular path in place
                y: [0, 15, 0, -15, -30, -15, 0, 15, 0],
                transition: {
                    duration: 2,  // Adjust the duration for a smooth circle motion
                    ease: "linear",
                },
            });
        };
        sequence();
    }, [penControls]);

    return (
        <VStack spacing={6} alignItems="center" position="relative">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                style={{ zIndex: 1 }}
            >
                <Icon as={FaCalendarAlt} w={200} h={200} color="teal.400" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={penControls}
                style={{
                    position: "absolute",
                    top: "25%",   // Adjust to keep pen within calendar bounds
                    zIndex: 2,
                }}
            >
                <Icon as={FaPen} boxSize={6} color="white" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <Heading size="lg" color="white">Step 3: Book an Appointment</Heading>
                <Text fontSize="lg" color="white" mt={4}>
                    Schedule a consultation with us to discuss your project in detail and solidify the game plan.
                    No upfront payments required until after the consultation!
                </Text>
            </motion.div>
        </VStack>
    );
};

export default SlideThree;
