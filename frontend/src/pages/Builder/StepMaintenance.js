import React from 'react';
import { VStack, HStack, Heading, Text, Switch, Flex, Button } from "@chakra-ui/react";

const StepMaintenance = ({ maintenanceOptIn, setMaintenanceOptIn, maintenanceCost, onNext, onBack }) => {
    return (
        <VStack minWidth="350px" spacing={6} alignItems="center">
            <Heading as="h2" textAlign="center" color="teal.300" size="lg">Monthly Maintenance Plan</Heading>
            <Text textAlign="left" fontSize="lg" color="white" fontStyle="italic" maxW="600px">
                Opting into this plan will give you peace of mind knowing that any necessary updates, security patches, or minor adjustments will be handled regularly.
            </Text>
            <Flex justifyContent="space-between" width="100%" alignItems="center" maxW="600px">
                <Text fontSize="lg" color="white">Opt-in for Maintenance (${maintenanceCost}/month):</Text>
                <Switch
                    colorScheme="teal"
                    size="lg"
                    isChecked={maintenanceOptIn === 'yes'}
                    onChange={(e) => setMaintenanceOptIn(e.target.checked ? 'yes' : 'no')}
                    aria-label={`Opt-in for Maintenance ($${maintenanceCost}/month)`}
                />
            </Flex>
            <HStack spacing={4} mt={4}>
                <Button colorScheme="teal" variant="outline" size="lg" onClick={onBack}>Back</Button>
                <Button colorScheme="teal" variant="outline" size="lg" onClick={onNext}>Next</Button>
            </HStack>
        </VStack>
    );
};

export default StepMaintenance;
