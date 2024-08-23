import React from 'react';
import { VStack, Heading, Text, Box, Flex, Button, HStack } from "@chakra-ui/react";

const StepFive = ({ totalPrice, numPages, pricePerPage, additionalFee, addOns, addOnOptions, hasMedia, mediaFee, maintenanceCost, onNext, onBack }) => {
    return (
        <VStack spacing={6} height="80vh" justify="center" alignItems="center">
            <Heading size="lg" color="white">Here's a breakdown of the costs:</Heading>
            <Text fontStyle="italic" fontSize="sm" color="teal.200" textAlign="center">
                Please note, no charges will be made at this time. Payment will only be required after our initial appointment.
            </Text>

            {/* Restrict the height of the breakdown container */}
            <Box display="flex" flexDir="column" justifyContent="space-between" width="400px" height="auto" maxH="40vh" overflowY="auto" p={4} bg="gray.900" borderRadius="lg" boxShadow="0px 0px 20px rgba(0, 0, 0, 0.2)">
                <Flex justifyContent="space-between" width="100%">
                    <Text fontSize="md" color="white">Pages:</Text>
                    <Text fontSize="md" color="white">{numPages} x ${pricePerPage} = ${numPages * pricePerPage}</Text>
                </Flex>

                {/* Display Stock Media Fee */}
                {hasMedia === "no" && (
                    <Flex justifyContent="space-between" width="100%">
                        <Text fontSize="md" color="white">Stock Media Fee:</Text>
                        <Text fontSize="md" color="white">${mediaFee}</Text>
                    </Flex>
                )}

                {/* Display Add-ons */}
                {addOns && addOns.length > 0 && (
                    <>
                        {addOns.map((addOnLabel, index) => {
                            const addOnOption = addOnOptions.find(option => option.label === addOnLabel);
                            return (
                                addOnOption && (
                                    <Flex key={index} justifyContent="space-between" width="100%">
                                        <Text fontSize="md" color="white">{addOnOption.label}:</Text>
                                        <Text fontSize="md" color="white">${addOnOption.price}</Text>
                                    </Flex>
                                )
                            );
                        })}
                    </>
                )}
                <hr></hr>
                {/* Display Total Price */}
                <Flex justifyContent="space-between" width="100%">
                    <Text fontSize="lg" color="rgb(236, 97, 71)" fontWeight="bold">Total:</Text>
                    <Text fontSize="lg" color="rgb(236, 97, 71)" fontWeight="bold">${totalPrice}</Text>
                </Flex>
                <hr></hr>
                {/* Display Monthly Maintenance Charge */}
                {maintenanceCost > 0 && (
                    <Flex justifyContent="space-between" width="100%" mt={4}>
                        <Text fontSize="lg" color="gold" fontWeight="bold">Monthly Maintenance Charge:</Text>
                        <Text fontSize="lg" color="gold" fontWeight="bold">${maintenanceCost}/month</Text>
                    </Flex>
                )}
            </Box>

            <HStack spacing={4} mt={4}>
                <Button colorScheme="teal" variant="outline" size="lg" onClick={onBack}>Back</Button>
                <Button colorScheme="teal" variant="outline" size="lg" onClick={onNext}>Next</Button>
            </HStack>
        </VStack>
    );
};

export default StepFive;
