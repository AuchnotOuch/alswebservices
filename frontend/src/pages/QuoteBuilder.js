import React, { useState } from 'react';
import StepOne from './Builder/StepOne';
import StepTwo from './Builder/StepTwo';
import StepThree from './Builder/StepThree';
import StepFour from './Builder/StepFour';
import StepFive from './Builder/StepFive';
import StepSix from './Builder/StepSix';
import StepSeven from './Builder/StepSeven';
import StepMaintenance from './Builder/StepMaintenance'; // Ensure this is imported correctly
import { Box, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

const QuoteBuilder = () => {
    const pricePerPage = 100;
    const mediaFee = 50;
    const [currentStep, setCurrentStep] = useState(1);
    const [numPages, setNumPages] = useState(1);
    const [specialRequests, setSpecialRequests] = useState("");
    const [hasMedia, setHasMedia] = useState("yes");
    const [addOns, setAddOns] = useState([]);
    const [additionalFee, setAdditionalFee] = useState(0);
    const [totalPrice, setTotalPrice] = useState(numPages * pricePerPage);
    const [maintenanceOptIn, setMaintenanceOptIn] = useState("no");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const addOnOptions = [
        { label: 'Basic E-commerce Integration', price: 100, complexity: 'medium' },
        { label: 'Contact Form with Captcha', price: 50, complexity: 'low' },
        { label: 'Social Media Feed Integration', price: 75, complexity: 'medium' },
        { label: 'Blog Setup', price: 100, complexity: 'medium' },
        { label: 'Custom Analytics Integration', price: 150, complexity: 'high' },
        { label: 'Email Newsletter Integration', price: 125, complexity: 'medium' },
        { label: 'Live Chat Integration', price: 200, complexity: 'high' },
        { label: 'Custom Forms & Surveys', price: 150, complexity: 'medium' },
        { label: 'Advanced SEO Optimization', price: 200, complexity: 'high' },
        { label: 'User Authentication & Login', price: 250, complexity: 'high' },
        { label: 'Membership Portal', price: 300, complexity: 'high' },
        { label: 'Multi-language Support', price: 250, complexity: 'medium' },
        { label: 'Advanced E-commerce (Multiple Payment Gateways, Subscriptions)', price: 400, complexity: 'high' },
        { label: 'Custom API Integrations (Third-Party Apps)', price: 350, complexity: 'high' },
        { label: 'Custom CRM Integration', price: 500, complexity: 'high' },
        { label: 'Advanced Security Features (2FA, Security Audits)', price: 300, complexity: 'high' },
        { label: 'Interactive Maps & Geolocation', price: 400, complexity: 'high' },
        { label: 'Complex Animations & Interactivity', price: 350, complexity: 'high' },
        { label: 'Advanced Database Functionality', price: 500, complexity: 'high' },
        { label: 'Performance Optimization for High Traffic', price: 450, complexity: 'high' }
    ];

    const calculateMaintenanceCost = (numPages, selectedAddOns) => {
        const baseCostPerPage = 10;
        const complexityRates = {
            low: 5,
            medium: 10,
            high: 20
        };

        let maintenanceCost = numPages * baseCostPerPage;

        selectedAddOns.forEach(addOnLabel => {
            const addOn = addOnOptions.find(option => option.label === addOnLabel);
            if (addOn) {
                maintenanceCost += complexityRates[addOn.complexity];
            }
        });

        return maintenanceCost;
    };

    // Calculate maintenance cost
    const maintenanceCost = calculateMaintenanceCost(numPages, addOns);

    const handleNextClick = () => {
        setCurrentStep(prevStep => prevStep + 1);
    };

    const handleBackClick = () => {
        setCurrentStep(prevStep => prevStep - 1);
    };

    const steps = [
        <StepOne
            numPages={numPages}
            setNumPages={setNumPages}
            onNext={handleNextClick}
        />,
        <StepTwo
            specialRequests={specialRequests}
            setSpecialRequests={setSpecialRequests}
            onNext={handleNextClick}
            onBack={handleBackClick}
        />,
        <StepThree
            hasMedia={hasMedia}
            setHasMedia={setHasMedia}
            mediaFee={mediaFee}
            onNext={handleNextClick}
            onBack={handleBackClick}
        />,
        <StepFour
            addOns={addOns}
            setAddOns={setAddOns}
            addOnOptions={addOnOptions}
            additionalFee={additionalFee}
            setAdditionalFee={setAdditionalFee}
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
            pricePerPage={pricePerPage}
            numPages={numPages}
            hasMedia={hasMedia}
            mediaFee={mediaFee}
            onNext={handleNextClick}
            onBack={handleBackClick}
        />,
        <StepMaintenance
            maintenanceOptIn={maintenanceOptIn}
            setMaintenanceOptIn={setMaintenanceOptIn}
            maintenanceCost={maintenanceCost}
            onNext={handleNextClick}
            onBack={handleBackClick}
        />,
        <StepFive
            totalPrice={totalPrice}
            numPages={numPages}
            pricePerPage={pricePerPage}
            additionalFee={additionalFee}
            addOns={addOns}
            addOnOptions={addOnOptions}
            hasMedia={hasMedia}
            mediaFee={mediaFee}
            maintenanceCost={maintenanceCost}
            onNext={handleNextClick}
            onBack={handleBackClick}
        />,
        <StepSix
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            companyName={companyName}
            setCompanyName={setCompanyName}
            onNext={handleNextClick}
            onBack={handleBackClick}
        />,
        <StepSeven
            date={date}
            setDate={setDate}
            time={time}
            setTime={setTime}
            onNext={handleNextClick}
            onBack={handleBackClick}
        />,
    ];

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" width="auto">
            <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
            >
                <VStack
                    spacing={6}
                    borderWidth="2px"
                    m={20}
                    borderColor="teal"
                    borderRadius="lg"
                    bg="rgba(5, 18, 32, .7)"
                    p={8}
                    boxShadow="0 4px 50px rgba(56, 178, 172, 0.6)"
                >
                    {steps[currentStep - 1]}
                </VStack>
            </motion.div>
        </Box>
    );
};

export default QuoteBuilder;
