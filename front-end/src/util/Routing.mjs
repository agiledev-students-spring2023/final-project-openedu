import { Navigate, Route, Routes } from "react-router-dom";
import { Landing } from "../pages/landing/Landing.jsx";
import React from "react";
import { Home } from "../pages/home/Home.jsx";
import { SubjectList } from "../pages/subjects/SubjectList.jsx";
import { SuggestSubjectList } from "../pages/subjects/SuggestSubjectList.jsx";
import { SubjectDetail } from "../pages/subjects/SubjectDetail.jsx";
import { RecentSubjectList } from "../pages/subjects/RecentSubjectList.jsx";
import { CourseDetail } from "../pages/course/CourseDetail.jsx";
import UserProfile from "../pages/userprofile/UserProfile.jsx";
import EditProfile from "../pages/userprofile/EditProfile.jsx";
import RecentlyUsedAvatars from "../pages/userprofile/RecentlyUsedAvatars.jsx";
import { ViewPost } from "../pages/posts/ViewPost.jsx";
import LecturePlay from "../pages/lectures/LecturePlay.jsx";
import LoginWizard from "../pages/landing/LoginWizard.jsx";
import ErrorPage from "../pages/errors/ErrorPage.jsx";
import Feedback from "../pages/feedback/Feedback.jsx";



let routes;

export function getRoutes() {
  routes ??= (
    <Routes>
      <Route path="" element={<Navigate to="/landing/greeting" />} />

      <Route path="/">
        {/*TODO: Update this*/}
        <Route path="landing">
          <Route index path="greeting" element={<Landing />} />
          <Route path="wizard" element={<LoginWizard />} />
        </Route>

        <Route path="home" element={<Home />} />

        <Route path="subjects">
          <Route index={true} path="list" element={<SubjectList />} />
          <Route path="detail/:subjectId" element={<SubjectDetail />} />
          <Route path="recent" element={<RecentSubjectList />} />
          <Route path="suggest" element={<SuggestSubjectList />} />
        </Route>

        <Route path="courses">
          <Route path="detail/:courseId" element={<CourseDetail />} />
          <Route path="play" element={<LecturePlay />} />
          
        </Route>

        <Route path="profile">
          <Route index={true} path="self" element={<UserProfile />} />
          <Route path="edit" element={<EditProfile />} />
          <Route path="avatars" element={<RecentlyUsedAvatars />} />
          <Route path="feedback" element={<Feedback />} />
        </Route>
        <Route path="post">
          <Route path="view/:postId" element={<ViewPost />} />
        </Route>
        <Route path="error" element={<ErrorPage />} />
      </Route>
    </Routes>
  );

  return routes;
}
