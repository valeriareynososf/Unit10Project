import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";

import Courses from './components/courses/Courses'
import Header from './components/nav/Header';
import CreateCourse from './components/courses/CreateCourse';
import CourseDetail from './components/courses/CourseDetail';
import UpdateCourse from './components/courses/UpdateCourse';
import UserSignIn from './components/users/UserSignIn';
import UserSignUp from './components/users/UserSignUp';
import UserSignOut from './components/users/UserSignOut';
import NotFound from './components/errors/NotFound';
import Forbidden from './components/errors/Forbidden';
import PrivateRoute from './components/errors/PrivateRoute';
import UnhandledError from './components/errors/UnhandledError';

import '../src/styles/global.css'


function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="courses/:id" element={<CourseDetail />} />

        <Route element={<PrivateRoute />}>
          <Route path="courses/:id/update" element={<UpdateCourse />} />
          <Route path="courses/create" element={<CreateCourse />} />
        </Route>

        <Route path="signin" element={<UserSignIn />} />
        <Route path="signup" element={<UserSignUp />} />
        <Route path="signout" element={<UserSignOut />} />

        <Route path="error" element={<UnhandledError />} />
        <Route path="forbidden" element={<Forbidden />} />
        <Route path="notfound" element={<NotFound />} />
        <Route path="*" element={<Navigate replace to="notfound" />} />
      </Routes>
    </>
  );
}

export default App;
