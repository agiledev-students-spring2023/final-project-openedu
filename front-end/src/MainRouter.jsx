import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import Layout from './containers/Layout'

const MainRouter = () => {
    // Currently, there is only one route to a default page:
    //      Level one routes should be included here
    return (
        <div>
            <Layout>
                <Routes>
                    <Route path="/" element={<Index />} />
                </Routes>
            </Layout>
        </div>
    )
}

export default MainRouter; 