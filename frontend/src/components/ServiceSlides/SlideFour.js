import React from 'react';
import { VStack, Heading, Text, Box } from "@chakra-ui/react";

const SlideFour = () => {
    return (
        <Box
            position="relative"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="transparent"
            flexDirection="column"
            textAlign="center"
        >
            <Heading size="lg" color="white">Step 4: Watch Your Vision Come to Life</Heading>
            <Text fontSize="lg" color="white" mt={4}>
                Once everything is finalized, sit back and watch your website come to life. Your digital presence will be enhanced with a professional, engaging website.
            </Text>
        </Box>
    );
};

export default SlideFour;
