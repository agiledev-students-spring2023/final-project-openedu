import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { SubjectList } from "./pages/subjects/SubjectList.jsx";
import { Layout } from './containers/Layout/Layout';
import { CourseDetail } from "./pages/course/CourseDetail";
export const MainRouter = () => {
    // Currently, there is only one route to a default page:
    //      Level one routes should be included here

    return (
        <div>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/subjects" element={<SubjectList />} />
                    {/*<Route path="/courses" element={<Courses />} />*/}
                    <Route path="/course_detail" element={<CourseDetail />} />
                    <Route path="/signin" element={<LandingPage />} />
                    <Route path="/edit_profile" element={<EditProfile />} />
                    <Route path="/recently_used_avatars" element={<RecentlyUsedAvatars />} />
                </Routes>
            </Layout>
        </div>
    );
};
