import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";

import Courses from '../src/components/Courses'
import Header from './components/Header';
import CreateCourse from './components/CreateCourse';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import PrivateRoute from './components/PrivateRoute';
import UnhandledError from './components/UnhandledError';

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

        <Route path="error" element={< UnhandledError />} />
        <Route path="forbidden" element={<Forbidden />} />
        <Route path="notfound" element={< NotFound />} />
        <Route path="*" element={< Navigate replace to="notfound" />} />
      </Routes>
    </>
  );
}

export default App;
