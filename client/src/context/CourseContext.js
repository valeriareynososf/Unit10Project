import { createContext, useState, useEffect } from "react";
import { api } from "../utils/apiHelper";
const CourseContext = createContext(null)

export const CourseProvider = (props) => {

    const getCourses = async() => {
        const res = await api("/courses", "GET", null);
       
        if (res.status === 200) {
            const courses = await res.json()
             console.log("courses:", courses)
            return courses;
        } else if (res.status === 401) {
            return null;
        } else {
            throw new Error()
        }
    }


  return (
    <CourseContext.Provider value={{
      actions: {
        getCourses
      }
    }}>
      {props.children}
    </CourseContext.Provider>
  );
}

export default CourseContext;