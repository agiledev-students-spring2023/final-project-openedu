import React, { createContext, useState } from 'react';
import { Box } from '@mui/material';
import { LandingIU } from './LandingUI.jsx';
import BackgroundImage from "../../containers/BackgroundImage/index.jsx";

// Use Context to make globals,or functions between parent/child
export const LandingContext = createContext(null);

export default function LandingPage() {
    // 0: begin; 1: login; 2: signup
    const [landing, setLanding] = useState(0);


    return (
        <LandingContext.Provider value={{ landing, setLanding }}>
            <Box>
                <BackgroundImage />
                <LandingIU />
            </Box>
        </LandingContext.Provider>

    );
}
