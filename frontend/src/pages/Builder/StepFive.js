import React from 'react';
import { VStack, Heading, Text, Box, Flex, Button, HStack } from "@chakra-ui/react";

const StepFive = ({ totalPrice, numPages, pricePerPage, additionalFee, addOns, addOnOptions, hasMedia, mediaFee, maintenanceCost, maintenanceOptIn, onNext, onBack }) => {
    return (
        <VStack spacing={6} height="auto" justify="center" alignItems="center">
            <Heading color="teal.300" size="lg">Cost Breakdown</Heading>
            <Text fontSize="lg" color="white" textAlign="left" maxW="600px">
                Here's a breakdown of the estimated costs based on the information you've provided so far. Keep in mind, no payment is required at this stage. The total price shown here is just a rough estimate and may be adjusted after we finalize the project details during our consultation.
            </Text>
            <Text fontSize="lg" color="white" textAlign="left" fontStyle="italic" maxW="600px">
                This breakdown includes the cost for your site's pages, any selected add-ons, media fees, and—if opted in—your monthly maintenance plan.
            </Text>

            {/* Cost Breakdown Box */}
            <Box
                display="flex"
                flexDir="column"
                justifyContent="space-between"
                width="400px"
                height="auto"
                maxH="40vh"
                overflowY="auto"
                p={4}
                bg="gray.900"
                borderRadius="lg"
                boxShadow="0px 0px 20px rgba(0, 0, 0, 0.2)"
            >
                {/* Pages Cost */}
                <Flex justifyContent="space-between" width="100%">
                    <Text fontSize="md" color="white">Pages:</Text>
                    <Text fontSize="md" color="white">{numPages} x ${pricePerPage} = ${numPages * pricePerPage}</Text>
                </Flex>

                {/* Stock Media Fee */}
                {hasMedia === "no" && (
                    <Flex justifyContent="space-between" width="100%">
                        <Text fontSize="md" color="white">Stock Media Fee:</Text>
                        <Text fontSize="md" color="white">${mediaFee}</Text>
                    </Flex>
                )}

                {/* Add-ons Cost */}
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

                {/* Total Price */}
                <hr />
                <Flex justifyContent="space-between" width="100%">
                    <Text fontSize="lg" color="rgb(236, 97, 71)" fontWeight="bold"> Estimated Total:</Text>
                    <Text fontSize="lg" color="rgb(236, 97, 71)" fontWeight="bold">${totalPrice}</Text>
                </Flex>
                <hr />

                {/* Monthly Maintenance Charge */}
                {maintenanceOptIn === 'yes' && (
                    <Flex justifyContent="space-between" width="100%" mt={4}>
                        <Text fontSize="lg" color="gold" fontWeight="bold">Monthly Maintenance Charge:</Text>
                        <Text fontSize="lg" color="gold" fontWeight="bold">${maintenanceCost}/month</Text>
                    </Flex>
                )}
            </Box>

            {/* Navigation Buttons */}
            <HStack spacing={4} mt={4}>
                <Button colorScheme="teal" variant="outline" size="lg" onClick={onBack}>Back</Button>
                <Button colorScheme="teal" variant="outline" size="lg" onClick={onNext}>Next</Button>
            </HStack>
        </VStack>
    );
};

export default StepFive;
