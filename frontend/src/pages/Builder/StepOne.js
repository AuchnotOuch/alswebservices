import React from 'react';
import { Box, Heading, Select, Text, Button, VStack } from "@chakra-ui/react";

const StepOne = ({ numPages, setNumPages, onNext }) => {
    return (
        <VStack spacing={6}>
            <Text fontSize="lg" color="white">Select the number of pages:</Text>
            <Box w="50%">
                <Select
                    value={numPages}
                    onChange={(e) => setNumPages(parseInt(e.target.value))}
                    bg="transparent"
                    borderColor="teal"
                    color="white"
                >
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
                isDisabled={numPages < 1}
            >
                Next
            </Button>
        </VStack>
    );
};

export default StepOne;
