import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {Home} from './pages/home/Home';
//import Courses from './pages/course';
import {SubjectList} from './pages/subjects/SubjectList';
import {Begin} from './pages/landing/begin/Begin';
import {Layout} from './containers/Layout/Layout';
import {CourseDetail} from "./pages/course/CourseDetail";
import {CourseList} from "./pages/course/CourseList";
import {SignUp} from './pages/landing/signup/SignUp';
export const MainRouter = () => {
    // Currently, there is only one route to a default page:
    //      Level one routes should be included here
    
    return (
        <div>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/begin" element={<Begin />} />
                    <Route path="/subjects" element={<SubjectList />} />
                    <Route path="/courses" element={<CourseList />} />
                    <Route path="/course_detail" element={<CourseDetail/>}/>
                    <Route path="/signup" element={<SignUp />} />


                </Routes>
            </Layout>
        </div>
    );
};