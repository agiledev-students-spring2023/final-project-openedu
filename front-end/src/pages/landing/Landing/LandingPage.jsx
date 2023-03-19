import React, { useState } from 'react'
import { Box } from '@mui/material'
import { BeginPage } from '../Begin/BeginPage'
import { SigninPage } from '../Signin/SigninPage'
import { SignupPage } from '../Signup/SignupPage'

// Use Context to make globals,or functions between parent/child
export default function LandingPage() {
    const [begin, setBegin] = useState(true)
    const [signin, setSignin] = useState(false)
    const [signup, setSignup] = useState(false)

    const setPage = () => {
        if (begin) {
            return <BeginPage />
        }
        if (signin) {
            return <SigninPage />
        }
        if (signup) {
            return <SignupPage />
        }
    }
    return (
        <Box>
            {setPage()}
        </Box>
    )
}
