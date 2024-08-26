import React, { useEffect } from 'react';
import { Box } from "@chakra-ui/react";
import HeroSection from '../components/HeroSection';
import ServiceHighlight from '../components/ServiceHighlight';
import Guarantees from '../components/Guarantees';
import { startBackgroundAnimation } from '../assets/backgroundAnimation'; // Import the animation function

const Landing = () => {

    return (
        <>
            <Box>
                <HeroSection />
                <Box height="500px" /> {/* Spacer */}
                <Guarantees />
                <Box height="500px" /> {/* Spacer */}
                <ServiceHighlight />
            </Box>
        </>
    );
};

export default Landing;
