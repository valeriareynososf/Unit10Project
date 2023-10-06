import React, { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";

import Courses from '../src/components/Courses'
import Header from './components/Header';
import CreateCourse from './components/CreateCourse';
import CourseDetail from './components/CourseDetail';

import  '../src/styles/global.css'
//import  '../src/styles/reset.css'

function App() {
 
  return (
    <div id="root">
      <Header />
     <Routes>
      <Route path="/" element={<Courses />}  />
     <Route path="/courses/create" element={<CreateCourse />} />
      <Route path="courses">
          <Route index element={null} />
          <Route path=":id" element={<CourseDetail />} />
          {/* <Route path=":id/update" element={<UpdateCourse />} /> */}
        </Route>
       {/* <Route path="/signin" element={<UserSignIn />}  />
      <Route path="/signup" element={<UserSignUp />}  />
      <Route path="/signout" element={<UserSignOut />}  /> */}
     </Routes>
    </div>
  );
}

export default App;
