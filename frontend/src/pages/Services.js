import React from 'react';
import { Box, Heading, Text } from "@chakra-ui/react";
import { useParams } from 'react-router-dom';
import BasicPackage from '../components/BasicPackage';

const Services = () => {
    const { serviceType } = useParams();

    const renderServiceContent = () => {
        switch (serviceType) {
            case 'basic':
                return (
                    <BasicPackage />
                );
            case 'standard':
                return (
                    <Box>
                        <Heading>Standard Website Package</Heading>
                        <Text>Up to 10 pages, e-commerce integration, premium design.</Text>
                    </Box>
                );
            case 'premium':
                return (
                    <Box>
                        <Heading>Premium Website Package</Heading>
                        <Text>Advanced features, full e-commerce functionality, custom integrations.</Text>
                    </Box>
                );
            default:
                return <Text>Select a service package from the services page.</Text>;
        }
    };

    return (
        <Box
            py={12}
            px={4}
            height="100vh"  // Ensure it takes full viewport height
            overflow="hidden"  // Prevent overflow
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            {renderServiceContent()}
        </Box>
    );
};

export default Services;
