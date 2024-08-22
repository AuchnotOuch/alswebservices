import React, { useState } from 'react';
import { Flex, Box, VStack, HStack, Heading, Text, Button, Select, Textarea, Input, RadioGroup, Radio, Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";

const BasicPackage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [numPages, setNumPages] = useState(1);
    const [specialRequests, setSpecialRequests] = useState("");
    const [hasMedia, setHasMedia] = useState("yes");
    const [additionalFee, setAdditionalFee] = useState(0);
    const [totalPrice, setTotalPrice] = useState(100);
    const [maintenanceOptIn, setMaintenanceOptIn] = useState("no");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const pricePerPage = 100;
    const mediaFee = 25;
    const maintenanceFee = 25;

    const handleNextClick = () => {
        if (currentStep === 3 && hasMedia === "no") {
            setAdditionalFee(mediaFee);
            setTotalPrice(numPages * pricePerPage + mediaFee);
        } else if (currentStep === 3 && hasMedia === "yes" || "unsure") {
            setTotalPrice(numPages * pricePerPage);
            setAdditionalFee(0);
        }
        setCurrentStep(currentStep + 1);
    };

    const handleBackClick = () => {
        setCurrentStep(currentStep - 1);
    };

    const variants = {
        enter: { x: "100vw", opacity: 0 },
        center: { x: 0, opacity: 1 },
        exit: { x: "-100vw", opacity: 0 },
    };

    return (
        <Box height="100vh" width="100vw" display="flex" justifyContent="center" alignItems="center">
            <motion.div
                key={currentStep}
                initial="enter"
                animate="center"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.5 }}
                style={{ maxWidth: "900px", width: "90%" }}
            >
                <Box overflow="auto" borderWidth="2px" borderColor="teal" borderRadius="lg" bg="rgba(5, 18, 32, .7)" p={8} boxShadow="0 4px 50px rgba(56, 178, 172, 0.6)">
                    <VStack spacing={6}>
                        {currentStep === 1 && (
                            <>
                                <Heading size="2xl" color="white">Basic Website Package</Heading>
                                <Text fontSize="lg" color="white">Select the number of pages:</Text>
                                <Box w="50%">
                                    <Select value={numPages} onChange={(e) => setNumPages(parseInt(e.target.value))} bg="transparent" borderColor="teal" color="white">
                                        {[...Array(5).keys()].map(i => (
                                            <option key={i + 1} value={i + 1} style={{ backgroundColor: "rgb(5, 18, 32)" }}>
                                                {i + 1} Page{i > 0 ? "s" : ""}
                                            </option>
                                        ))}
                                    </Select>
                                </Box>
                                <Button colorScheme="teal" variant="outline" size="lg" onClick={handleNextClick} isDisabled={numPages < 1}>Next</Button>
                            </>
                        )}

                        {currentStep === 2 && (
                            <>
                                <Heading size="2xl" color="white">Details</Heading>
                                <Text fontSize="lg" color="white">Please explain what the website is for, any special requests, references, and any info you feel is important for me to know.</Text>
                                <Textarea value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} placeholder="Your requests..." bg="transparent" borderColor="teal" color="white" />
                                <HStack spacing={4}>
                                    <Button colorScheme="teal" variant="outline" size="lg" onClick={handleBackClick}>Back</Button>
                                    <Button colorScheme="teal" variant="outline" size="lg" onClick={handleNextClick} isDisabled={!specialRequests}>Next</Button>
                                </HStack>
                            </>
                        )}

                        {currentStep === 3 && (
                            <>
                                <Heading size="2xl" color="white">Do You Have Your Own Media?</Heading>
                                <Text color="white">Media could include photos or video, company logos, or graphics. </Text>
                                <RadioGroup value={hasMedia} onChange={(value) => setHasMedia(value)} colorScheme="teal">
                                    <Stack direction="row" spacing={4}>
                                        <Radio checked value="yes">
                                            <Text color="teal.200">Yes</Text>
                                        </Radio>
                                        <Radio value="no">
                                            <Text color="teal.200">No</Text>
                                        </Radio>
                                        <Radio value="unsure">
                                            <Text color="teal.200">Unsure</Text>
                                        </Radio>
                                    </Stack>
                                </RadioGroup>
                                {hasMedia === "no" && (
                                    <Text fontSize="lg" color="rgb(236, 97, 71)">A $25 fee will be added to purchase high-quality stock images.</Text>
                                )}
                                <HStack spacing={4}>
                                    <Button colorScheme="teal" variant="outline" size="lg" onClick={handleBackClick}>Back</Button>
                                    <Button colorScheme="teal" variant="outline" size="lg" onClick={handleNextClick} isDisabled={!hasMedia}>Next</Button>
                                </HStack>
                            </>
                        )}

                        {currentStep === 4 && (
                            <>
                                <Box height="100px" display="flex" flexDir="column" alignItems="center" justifyContent="space-between">

                                    <Heading textAlign="center" fontSize="lg" color="white">
                                        After the first month of your website launch, opt into my maintenance and upkeep service for $25/month to ensure your website stays updated and secure. The first month is free!
                                    </Heading>
                                    <RadioGroup value={maintenanceOptIn} onChange={(value) => setMaintenanceOptIn(value)} colorScheme="teal">
                                        <Stack direction="row" spacing={4}>
                                            <Radio value="yes">
                                                <Text color="teal.200">Yes</Text>
                                            </Radio>
                                            <Radio value="no">
                                                <Text color="teal.200">No</Text>
                                            </Radio>
                                            <Radio value="unsure">
                                                <Text color="teal.200">Unsure</Text>
                                            </Radio>
                                        </Stack>
                                    </RadioGroup>
                                </Box>
                                <HStack spacing={4}>
                                    <Button colorScheme="teal" variant="outline" size="lg" onClick={handleBackClick}>Back</Button>
                                    <Button colorScheme="teal" variant="outline" size="lg" onClick={handleNextClick}>Next</Button>
                                </HStack>
                            </>
                        )}

                        {currentStep === 5 && (
                            <>
                                <Heading size="lg" color="white">Here's a breakdown of the costs:</Heading>
                                <Text fontStyle="italic" fontSize="sm" color="teal.200" mt={0} textAlign="center">
                                    Please note, no charges will be made at this time. Payment will only be required after our initial appointment.
                                </Text>
                                <Box display="flex" flexDir="column" justifyContent="space-between" width="400px" height="200px">
                                    <Flex justifyContent="space-between" width="100%">
                                        <Text fontSize="lg" color="white">Pages:</Text>
                                        <Text fontSize="lg" color="white">{numPages} x ${pricePerPage} = ${numPages * pricePerPage}</Text>
                                    </Flex>

                                    {additionalFee > 0 && (
                                        <Flex justifyContent="space-between" width="100%">
                                            <Text fontSize="lg" color="white">Stock Media Fee:</Text>
                                            <Text fontSize="lg" color="white">${additionalFee}</Text>
                                        </Flex>
                                    )}

                                    <hr></hr>
                                    <Flex justifyContent="space-between" width="100%">
                                        <Text fontSize="lg" color="rgb(236, 97, 71)" fontWeight="bold">Total:</Text>
                                        <Text fontSize="lg" color="rgb(236, 97, 71)" fontWeight="bold">${totalPrice}</Text>
                                    </Flex>
                                </Box>
                                <Box display="flex" flexDir="column" justifyContent="space-between" width="400px" height="25px">
                                    <Flex justifyContent="space-between" alignItems="center" width="100%">
                                        <Text fontSize="lg" color="gold">Maintenance:</Text>
                                        <Box display="flex" alignItems="flex-start">
                                            {/* Asterisk */}
                                            <Text fontSize="sm" color="gold" mt="-4px" mr="4px" aria-label="asterisk">
                                                *
                                            </Text>
                                            <Text fontSize="lg" color="gold">{maintenanceOptIn === "yes" ? "$25/month" : "Opted Out"}</Text>
                                        </Box>
                                    </Flex>
                                </Box>
                                <HStack spacing={4}>
                                    <Button colorScheme="teal" variant="outline" size="lg" onClick={handleBackClick}>Back</Button>
                                    <Button colorScheme="teal" variant="outline" size="lg" onClick={handleNextClick}>Next</Button>
                                </HStack>
                                <Box display="flex" alignItems="flex-start">
                                    <Text fontSize="sm" color="teal.200" mt="-4px" mr="4px" aria-label="asterisk">
                                        *
                                    </Text>
                                    <Text color="teal.200" fontSize="small">First month is free. You won't be charged until a month after your website is live.</Text>
                                </Box>
                            </>
                        )}

                        {currentStep === 6 && (
                            <>
                                <Box display="flex" flexDir="column" alignItems="center">

                                    <Heading size="2xl" color="white">Personal Information</Heading>

                                    {/* Name Input */}
                                    <Box width="100%">
                                        <Text fontSize="lg" color="white">Name:</Text>
                                        <Input
                                            required
                                            placeholder="Your Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            isInvalid={!name && currentStep === 6}
                                            borderColor="teal"
                                            errorBorderColor="red.300"
                                            color="white"
                                        />
                                        {!name && currentStep === 6 && (
                                            <Text color="red.300" fontSize="sm">Name is required.</Text>
                                        )}
                                    </Box>

                                    {/* Email Input */}
                                    <Box width="100%">
                                        <Text fontSize="lg" color="white">Email:</Text>
                                        <Input
                                            required
                                            type="email"
                                            placeholder="Your Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            isInvalid={(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) && currentStep === 6}
                                            borderColor="teal"
                                            errorBorderColor="red.300"
                                            color="white"
                                        />
                                        {!email && currentStep === 6 && (
                                            <Text color="red.300" fontSize="sm">Email is required.</Text>
                                        )}
                                        {email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && currentStep === 6 && (
                                            <Text color="red.300" fontSize="sm">Please enter a valid email address.</Text>
                                        )}
                                    </Box>

                                    {/* Phone Input */}
                                    <Box width="100%">
                                        <Text fontSize="lg" color="white">Phone:</Text>
                                        <Input
                                            required
                                            type="tel"
                                            placeholder="Your Phone Number"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            isInvalid={!phone && currentStep === 6}
                                            errorBorderColor="red.300"
                                        />
                                        {!phone && currentStep === 6 && (
                                            <Text color="red.300" fontSize="sm">Phone number is required.</Text>
                                        )}
                                    </Box>

                                    {/* Optional Company Name Input */}
                                    <Box width="100%">
                                        <Text fontSize="lg" color="white">Company Name (optional):</Text>
                                        <Input
                                            placeholder="Your Company Name"
                                            value={companyName}
                                            onChange={(e) => setCompanyName(e.target.value)}
                                        />
                                    </Box>

                                    {/* Navigation Buttons */}
                                    <HStack mt={6} spacing={4}>
                                        <Button
                                            colorScheme="teal"
                                            variant="outline"
                                            size="lg"
                                            onClick={handleBackClick}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            colorScheme="teal"
                                            variant="outline"
                                            size="lg"
                                            onClick={handleNextClick}
                                            isDisabled={!name || !email || !phone} // Disable button if required fields are not filled
                                        >
                                            Next
                                        </Button>
                                    </HStack>
                                </Box>
                            </>
                        )}
                        {currentStep === 7 && (
                            <>
                                <Heading size="2xl" color="white">Book Your Meeting</Heading>
                                <Text fontSize="lg" color="white">Select a Date and Time: <Input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} /></Text>
                                <HStack spacing={4}>
                                    <Button colorScheme="teal" variant="outline" size="lg" onClick={handleBackClick}>Back</Button>
                                    <Button colorScheme="teal" variant="outline" size="lg" isDisabled={!name || !email || !date || !time}>Submit</Button>
                                </HStack>
                            </>
                        )}
                    </VStack>
                </Box>
            </motion.div>
        </Box>
    )
}

export default BasicPackage
