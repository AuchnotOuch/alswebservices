import React from 'react';
import { VStack, Heading, Text, RadioGroup, Radio, Stack, Button, HStack } from "@chakra-ui/react";

const StepThree = ({ hasMedia, setHasMedia, mediaFee, onNext, onBack }) => {
    return (
        <VStack spacing={6}>
            <Heading size="2xl" color="white">Do You Have Your Own Media?</Heading>
            <Text color="white">Media could include photos, videos, logos, or graphics.</Text>
            <RadioGroup value={hasMedia} onChange={setHasMedia} colorScheme="teal">
                <Stack direction="row" spacing={4}>
                    <Radio value="yes"><Text color="teal.200">Yes</Text></Radio>
                    <Radio value="no"><Text color="teal.200">No (+${mediaFee})</Text></Radio>
                    <Radio value="unsure"><Text color="teal.200">Unsure</Text></Radio>
                </Stack>
            </RadioGroup>
            <HStack spacing={4}>
                <Button colorScheme="teal" variant="outline" size="lg" onClick={onBack}>Back</Button>
                <Button colorScheme="teal" variant="outline" size="lg" onClick={onNext}>Next</Button>
            </HStack>
        </VStack>
    );
};

export default StepThree;
