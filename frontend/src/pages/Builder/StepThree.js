import React from 'react';
import { VStack, Heading, Text, RadioGroup, Radio, Stack, Button, HStack } from "@chakra-ui/react";

const StepThree = ({ hasMedia, setHasMedia, onNext, onBack }) => {
    return (
        <VStack spacing={6}>
            <Heading color="teal.300" size="lg" textAlign="center">Do You Have Your Own Media?</Heading>
            <Text fontSize="lg" color="white" textAlign="left">
                Media includes photos, videos, logos, or graphics for your website. If you have your own, we’ll integrate them. If not, I can help with stock images or custom graphics, though a media fee applies.
            </Text>
            <RadioGroup value={hasMedia} onChange={setHasMedia} colorScheme="teal">
                <Stack direction="row" spacing={4}>
                    <Radio value="yes" aria-label="I have my own media">
                        <Text color="teal.200">Yes</Text>
                    </Radio>
                    <Radio value="no" aria-label="I don't have my own media">
                        <Text color="teal.200">No</Text>
                    </Radio>
                    <Radio value="unsure" aria-label="I'm unsure if I have my own media">
                        <Text color="teal.200">Unsure</Text>
                    </Radio>
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
