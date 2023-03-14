import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Courses from './pages/courses';
import Subjects from './pages/Subjects';
import Login from './pages/Login';
import Layout from './containers/Layout';
import Password from './pages/Password';
import Signup from './pages/Signup';


const MainRouter = () => {
    // Currently, there is only one route to a default page:
    //      Level one routes should be included here
    
    return (
        <div>
            <Layout>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/subjects" element={<Subjects />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/password" element={<Password />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </Layout>
        </div>
    );
};

export default MainRouter; 