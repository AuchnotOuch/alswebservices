import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Text, VStack, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";

const LastStep = () => {
    const navigate = useNavigate()
    useEffect(() => {
        createConfetti();
    }, []);

    const createConfetti = () => {
        const container = document.getElementById("confetti-container");
        if (!container) return;

        const colors = ['#FF595E', '#FFCA3A', '#8AC926', '#1982C4', '#6A4C93'];

        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement("div");
            confetti.className = "confetti-piece";
            const color = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.backgroundColor = color;
            container.appendChild(confetti);

            const size = Math.random() * 8 + 4 + 'px';
            confetti.style.width = size;
            confetti.style.height = size;

            confetti.style.left = '50%';
            confetti.style.bottom = '0';
            confetti.style.position = 'absolute';

            const explosionX = (Math.random() - 0.5) * 1500;
            const explosionY = -(Math.random() * 500 + 300);
            const initialSpeed = Math.random() * 200 + 500;

            confetti.animate([
                { transform: `translateY(0) translateX(0)`, opacity: 1 },
                { transform: `translateY(${explosionY}px) translateX(${explosionX}px)`, opacity: 1 }
            ], {
                duration: initialSpeed,
                easing: 'ease-out',
                iterations: 1,
            });

            const driftSpeed = Math.random() * 3000 + 4000;
            setTimeout(() => {
                confetti.animate([
                    { transform: `translateY(${explosionY}px) translateX(${explosionX}px)`, opacity: 1 },
                    { transform: `translateY(1000px) translateX(${explosionX}px)`, opacity: 0 }
                ], {
                    duration: driftSpeed,
                    easing: 'ease-in',
                    iterations: 1,
                });
            }, initialSpeed);

            setTimeout(() => {
                confetti.remove();
            }, initialSpeed + driftSpeed);
        }
    };
    const onBackToHome = () => {
        navigate('/')
    }
    return (
        <VStack spacing={6} textAlign="center" mt={16}>
            <Heading size="xl" color="teal.400">
                Congratulations!
            </Heading>
            <Text fontSize="lg" color="gray.200">
                You've taken the first step towards your business's online success.
            </Text>
            <Text fontSize="lg" color="gray.200">
                We can't wait to bring your vision to life. Get ready to elevate your brand!
            </Text>

            <Box id="confetti-container" position="relative" height="0" width="100%" />

            <Button colorScheme="teal" size="lg" onClick={onBackToHome}>
                Back to Home
            </Button>
        </VStack>
    );
};

export default LastStep;
