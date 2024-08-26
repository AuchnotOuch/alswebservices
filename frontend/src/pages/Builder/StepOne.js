import React from 'react';
import { Box, Heading, Select, Text, Button, VStack } from "@chakra-ui/react";

const StepOne = ({ numPages, setNumPages, onNext }) => {
    return (
        <VStack spacing={6}>
            <Heading color="teal.300" size="lg" textAlign="center">How Many Pages Will Your Website Need?</Heading>
            <Text fontSize="lg" color="white" textAlign="left">
                Think about your website’s structure. Do you need just a landing page, or multiple sections like services, contact, or about? If you’re unsure, select ‘Unsure,’ and we’ll refine it together during our consultation.
            </Text>
            <Text fontSize="lg" color="white">Select the number of pages:</Text>
            <Box w="50%">
                <Select
                    value={numPages}
                    onChange={(e) => setNumPages(parseInt(e.target.value))}
                    bg="transparent"
                    borderColor="teal"
                    color="white"
                >
                    <option value={0} style={{ backgroundColor: "rgb(5, 18, 32)" }}>
                        Unsure
                    </option>
                    {[...Array(15).keys()].map(i => (
                        <option key={i + 1} value={i + 1} style={{ backgroundColor: "rgb(5, 18, 32)" }}>
                            {i + 1} Page{i > 0 ? "s" : ""}
                        </option>
                    ))}
                </Select>
            </Box>
            <Button
                colorScheme="teal"
                variant="outline"
                size="lg"
                onClick={onNext}
                isDisabled={numPages < 1 && numPages !== 0} // Allow navigation if "Unsure" (0) is selected
            >
                Next
            </Button>
        </VStack>
    );
};

export default StepOne;
