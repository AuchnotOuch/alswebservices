import React from 'react';
import { Box } from "@chakra-ui/react";
import HeroSection from '../components/HeroSection';
import ServiceHighlight from '../components/ServiceHighlight';
import Guarantees from '../components/Guarantees';

const Landing = () => {

    return (
        <>
            <Box as="main" id="main-content" role="main">
                <HeroSection />
                <Box height="500px" role="presentation" aria-hidden="true" /> {/* Spacer */}
                <Guarantees />
                <Box height="500px" role="presentation" aria-hidden="true" /> {/* Spacer */}
                <ServiceHighlight />
            </Box>
        </>
    );
};

export default Landing;
