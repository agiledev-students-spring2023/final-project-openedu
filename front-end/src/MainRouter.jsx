import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Begin } from "./pages/landing/begin/Begin";
import { Layout } from "./containers/Layout/Layout";
import { SubjectList } from "./pages/subjects/SubjectList.jsx";
import { SubjectDetail } from "./pages/subjects/SubjectDetail.jsx";
import { RecentSubjectList} from "./pages/subjects/RecentSubjectList";
import { CourseDetail } from "./pages/course/CourseDetail";
import { SignUp } from "./pages/landing/signup/SignUp";
import { SignIn } from "./pages/landing/signin/SignIn";
import {SuggestSubjectList} from "./pages/subjects/SuggestSubjectList";
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
          <Route path="/subjects/subject_detail/:subjectId" element={<SubjectDetail />} />
          <Route path="/recent_subject_list" element={<RecentSubjectList />} />
          <Route path="/recent_subject_list/subject_detail/:subjectId" element={<SubjectDetail />} />
          <Route path="/suggest_subject_list" element={<SuggestSubjectList />} />
          <Route path="/suggest_subject_list/subject_detail/:subjectId" element={<SubjectDetail />} />
          <Route path="/course_detail" element={<CourseDetail />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Layout>
    </div>
  );
};
