import React from "react";
import { Route, Routes } from "react-router-dom";
import { Landing } from "./pages/landing/Landing";
import { Layout } from "./containers/Layout/Layout";
import { SubjectList } from "./pages/subjects/SubjectList.jsx";
import { SubjectDetail } from "./pages/subjects/SubjectDetail.jsx";
import { RecentSubjectList } from "./pages/subjects/RecentSubjectList";
import { CourseDetail } from "./pages/course/CourseDetail";
import { SuggestSubjectList } from "./pages/subjects/SuggestSubjectList";
import EditProfile from "./pages/userprofile/EditProfile";
import RecentlyUsedAvatars from "./pages/userprofile/RecentlyUsedAvatars";
import UserProfile from "./pages/userprofile/UserProfile";
import LoginWizard from "./pages/landing/LoginWizard";
import { Home } from "./pages/home/Home";

/**
 * @deprecated the old router that we used in Sprint 0 (now deprecated)
 * @returns {JSX.Element}
 * @constructor
 */
export const MainRouter = () => {
  // Currently, there is only one route to a default page:
  //      Level one routes should be included here

  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/subjects" element={<SubjectList />} />
          <Route path="/subjects/subject_detail/:subjectId" element={<SubjectDetail />} />
          <Route path="/recent_subject_list" element={<RecentSubjectList />} />
          <Route path="/recent_subject_list/subject_detail/:subjectId" element={<SubjectDetail />} />
          <Route path="/suggest_subject_list" element={<SuggestSubjectList />} />
          <Route path="/suggest_subject_list/subject_detail/:subjectId" element={<SubjectDetail />} />
          <Route path="/course_detail" element={<CourseDetail />} />
          <Route path="/signin" element={<LoginWizard />} />
          <Route path="/edit_profile" element={<EditProfile />} />
          <Route path="/user_profile" element={<UserProfile />} />
          <Route path="/recently_used_avatars" element={<RecentlyUsedAvatars />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Layout>
    </div>
  );
};
