import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ChakraProvider } from "@chakra-ui/react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import theme from './theme/theme';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='793630998655-bo6mlsuk0gb7hd92on1db2i4ef5ri7pb.apps.googleusercontent.com'>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
