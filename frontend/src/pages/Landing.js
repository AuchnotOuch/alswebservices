import React, { useEffect } from 'react';
import { Box } from "@chakra-ui/react";
import HeroSection from '../components/HeroSection';
import ServiceHighlight from '../components/ServiceHighlight';
import Guarantees from '../components/Guarantees';
import { startBackgroundAnimation } from '../assets/backgroundAnimation'; // Import the animation function

const Landing = () => {
    useEffect(() => {
        // Start the background animation when the component mounts
        startBackgroundAnimation();
    }, []);

    return (
        <>
            <canvas id="canvas" style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}></canvas>
            <HeroSection />
            <Guarantees />
            <ServiceHighlight />
        </>
    );
};

export default Landing;
