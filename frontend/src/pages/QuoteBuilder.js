import React, { useState, useEffect } from 'react';
import StepOne from './Builder/StepOne';
import StepTwo from './Builder/StepTwo';
import StepThree from './Builder/StepThree';
import StepFour from './Builder/StepFour';
import StepFive from './Builder/StepFive';
import StepSix from './Builder/StepSix';
import StepAppointmentBooking from './Builder/StepAppointmentBooking';
import StepMaintenance from './Builder/StepMaintenance';
import StepInfo from './Builder/StepInfo';
import { Box, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import StepAddOnInfo from './Builder/StepAddOnInfo';
import LastStep from './Builder/LastStep';

const QuoteBuilder = () => {
    const pricePerPage = 100;
    const mediaFee = 50;
    const [currentStep, setCurrentStep] = useState(1);
    const [numPages, setNumPages] = useState(0);
    const [specialRequests, setSpecialRequests] = useState("");
    const [hasMedia, setHasMedia] = useState("yes");
    const [addOns, setAddOns] = useState([]);
    const [additionalFee, setAdditionalFee] = useState(0);
    const [totalPrice, setTotalPrice] = useState(numPages * pricePerPage);
    const [maintenanceOptIn, setMaintenanceOptIn] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const addOnOptions = [
        {
            label: 'Basic E-commerce Integration',
            price: 200,
            complexity: 'medium',
            description: 'Enables a basic online store on your website, allowing you to list products, accept payments, and manage orders. Ideal for small businesses starting to sell online with a simple catalog and checkout process.'
        },
        {
            label: 'Contact Form with Captcha',
            price: 50,
            complexity: 'low',
            description: 'Adds a customizable contact form to your site with CAPTCHA to reduce spam. Great for capturing inquiries, feedback, and customer support requests while ensuring only legitimate users can submit the form.'
        },
        {
            label: 'Social Media Feed Integration',
            price: 75,
            complexity: 'medium',
            description: 'Displays real-time feeds from your social media platforms (e.g., Instagram, Twitter, Facebook) directly on your website. This keeps your site fresh with updated content, improves engagement, and shows visitors your latest posts.'
        },
        {
            label: 'Blog Setup',
            price: 100,
            complexity: 'medium',
            description: 'Creates a blog section on your website where you can easily post articles, updates, and news. A great way to engage visitors, boost SEO through regular content updates, and establish your authority in your industry.'
        },
        {
            label: 'Email Newsletter Integration',
            price: 125,
            complexity: 'medium',
            description: 'Integrates an email subscription form, allowing visitors to sign up for your newsletter. Automatically syncs with your email marketing tool (e.g., Mailchimp, Constant Contact) to help you build and engage your audience through regular updates.'
        },
        {
            label: 'Live Chat Integration',
            price: 200,
            complexity: 'high',
            description: 'Adds live chat functionality to your website, enabling you to provide real-time support to visitors. Ideal for improving customer service, answering questions instantly, and increasing conversions by engaging with potential customers.'
        },
        {
            label: 'Custom Forms & Surveys',
            price: 150,
            complexity: 'medium',
            description: 'Allows you to create custom forms and surveys tailored to your needs, such as customer feedback, lead generation, or event registration. Collect and analyze data efficiently, improving your engagement and decision-making.'
        },
        {
            label: 'Advanced SEO Optimization',
            price: 200,
            complexity: 'high',
            description: 'Comprehensive SEO improvements, including optimizing meta tags, content structure, internal linking, and keyword targeting to improve search engine rankings. This add-on helps increase your site’s visibility, driving organic traffic and boosting business.'
        },
        {
            label: 'User Authentication & Login',
            price: 250,
            complexity: 'high',
            description: 'Implements secure user authentication, allowing visitors to create accounts and log in. This feature is essential for membership sites, e-commerce with user accounts, or any personalized experience where users need access to restricted content.'
        },
        {
            label: 'Membership Portal',
            price: 300,
            complexity: 'high',
            description: 'Creates a members-only area of your website where registered users can access exclusive content, services, or community features. This is perfect for subscription-based businesses or organizations with a need for private user access.'
        },
        {
            label: 'Multi-language Support',
            price: 250,
            complexity: 'medium',
            description: 'Enables multi-language functionality, allowing users to switch between languages on your site. This is particularly beneficial for businesses with a global audience or for sites catering to diverse language speakers.'
        },
        {
            label: 'Advanced E-commerce (Multiple Payment Gateways, Subscriptions)',
            price: 400,
            complexity: 'high',
            description: 'Enhances your e-commerce site with advanced features, including support for multiple payment gateways (e.g., PayPal, Stripe) and subscription models. Ideal for businesses offering recurring billing or needing more payment flexibility.'
        },
        {
            label: 'Custom API Integrations (Third-Party Apps)',
            price: 350,
            complexity: 'high',
            description: 'Connects your site with third-party services and applications via APIs, such as integrating CRM systems, marketing tools, or custom data feeds. This allows for advanced automation, better data flow, and seamless app interactions.'
        },
        {
            label: 'Advanced Security Features (2FA, Security Audits)',
            price: 300,
            complexity: 'high',
            description: 'Adds critical security layers, including two-factor authentication (2FA) and regular security audits to protect your site from breaches. Perfect for sites handling sensitive data, ensuring that your users and data remain secure.'
        },
        {
            label: 'Interactive Maps & Geolocation',
            price: 400,
            complexity: 'high',
            description: 'Displays interactive maps with location-based features, such as store locators, event locations, or real-time tracking. Ideal for businesses needing to guide visitors to physical locations or show geographically relevant information.'
        },
        {
            label: 'CMS Implementation',
            price: 125,
            complexity: 'medium',
            description: 'Implements a content management system (e.g., WordPress, Joomla) to make it easy for you to update your website’s content, images, and pages without requiring technical expertise. Ideal for clients who want to manage their site in-house.'
        },
        {
            label: 'Image & Media Optimization',
            price: 75,
            complexity: 'low',
            description: 'Optimizes your website’s images and media files for faster loading times and improved performance. This reduces bandwidth usage, speeds up your site, and enhances user experience, especially on mobile devices.'
        },
        {
            label: 'Basic SEO Setup',
            price: 100,
            complexity: 'low',
            description: 'Provides foundational SEO settings, including meta tag setup, basic keyword optimization, and indexing improvements. This add-on boosts search engine visibility for small to medium websites.'
        }
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
    // Function to calculate the total price based on pages, media fee, and add-ons
    const calculateTotalPrice = () => {
        const addOnPrices = addOns.reduce((total, label) => {
            const addOnOption = addOnOptions.find(option => option.label === label);
            return total + (addOnOption ? addOnOption.price : 0);
        }, 0);

        const mediaFeeValue = hasMedia === "no" ? mediaFee : 0;
        const total = (numPages * pricePerPage) + addOnPrices + mediaFeeValue;
        setTotalPrice(total);
    };

    // Recalculate totalPrice whenever numPages, addOns, or hasMedia changes
    useEffect(() => {
        calculateTotalPrice();
    }, [numPages, addOns, hasMedia])

    // Calculate maintenance cost
    const maintenanceCost = calculateMaintenanceCost(numPages, addOns);

    const handleNextClick = () => {
        setCurrentStep(prevStep => prevStep + 1);
    };

    const handleBackClick = () => {
        setCurrentStep(prevStep => prevStep - 1);
    };

    const steps = [
        <StepInfo onNext={handleNextClick} />,
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
        <StepAddOnInfo
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
            maintenanceOptIn={maintenanceOptIn}
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
        <StepAppointmentBooking
            date={date}
            setDate={setDate}
            time={time}
            setTime={setTime}
            name={name}
            email={email}
            phone={phone}
            companyName={companyName}
            specialRequests={specialRequests}
            numPages={numPages}
            maintenanceOptIn={maintenanceOptIn}
            maintenanceCost={maintenanceCost}
            totalPrice={totalPrice}
            hasMedia={hasMedia}
            addOns={addOns}
            onNext={handleNextClick}
            onBack={handleBackClick}
        />,
        <LastStep />
    ];

    return (
        <Box overflow="hidden" display="flex" justifyContent="center" alignItems="center" height="100vh" width="auto">
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
