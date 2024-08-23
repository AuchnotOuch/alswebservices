import React from 'react';
import { VStack, HStack, Heading, Text, Switch, Flex, Button } from "@chakra-ui/react";

const StepMaintenance = ({ maintenanceOptIn, setMaintenanceOptIn, maintenanceCost, onNext, onBack }) => {
    return (
        <VStack spacing={6}>
            <Heading size="lg" color="white">Monthly Maintenance</Heading>
            <Text fontStyle="italic" fontSize="sm" color="teal.200" textAlign="center">
                We offer lifetime monthly maintenance for your website. 1st month is free!
            </Text>
            <Flex justifyContent="space-between" width="100%">
                <Text fontSize="lg" color="white">Opt-in for Maintenance (${maintenanceCost}/month):</Text>
                <Switch
                    colorScheme="teal"
                    size="lg"
                    isChecked={maintenanceOptIn === 'yes'}
                    onChange={(e) => setMaintenanceOptIn(e.target.checked ? 'yes' : 'no')}
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
