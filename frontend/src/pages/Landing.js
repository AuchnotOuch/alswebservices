// src/pages/Landing.js
import React from 'react';
import { Box } from "@chakra-ui/react";
import HeroSection from '../components/HeroSection';
import ServiceHighlight from '../components/ServiceHighlight';
import "./Landing.css"

const Landing = () => {
    return (
        <>
            <HeroSection />
            <ServiceHighlight />
        </>
    );
};

export default Landing;
