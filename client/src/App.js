import React, { useEffect, useState } from 'react';
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
import Forbidden from './components/forbidden';
import PrivateRoute from './components/PrivateRoute';

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

        <Route path="/signin" element={<UserSignIn />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/signout" element={<UserSignOut />} />

        <Route path="/forbidden" element={< Forbidden />} />
        <Route path="/404" element={< NotFound />} />
        <Route path="*" element={< Navigate replace to="/404" />} />
      </Routes>
    </>
  );
}

export default App;
