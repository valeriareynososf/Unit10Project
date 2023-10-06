import { Link, NavLink } from 'react-router-dom';
import Nav from './Nav';

import CourseContext from "../context/CourseContext";
import { useEffect, useContext, useState } from 'react';
{/*
Courses - This component provides the "Courses" screen by retrieving the list of courses from the REST API's /api/courses route and rendering a list of courses. 
Each course needs to link to its respective "Course Detail" screen. 
This component also renders a link to the "Create Course" screen.

*/}



const Courses = () => {
    const { actions } = useContext(CourseContext);
    const [courses, setCourses] = useState([])


    const getCourses = async () => {
        const courses = await actions.getCourses;
        courses().then(val => setCourses(val))
    }
    useEffect(() => {
        //         console.log("useeffect", actions.getCourses)
        //          const courses = Promise.resolve(actions.getCourses)
        //  console.log("courses state:", courses)
        // .then(async (res) => await res.json())
        // .then((json) => {
        //   return json;

        // });
        getCourses()

    }, [])

    return (
      
        <div className="wrap main--grid">
            <ul>
                {courses.map((course) => (
                    <li key={course.id}>
                        <NavLink to={`/courses/${course.id}`} className="course--module course--link">
                            <h2 className="course--label">Course</h2>
                            <h3 className="course--title">{course.title}</h3>
                        </NavLink>
                    </li>
                ))}
                <li key="create-course">
                    <NavLink to="/" className="course--module course--add--module">
            <span class="course--add--title">
               + New Course
                </span>
                </NavLink>
                </li>
            </ul>
            
            
        </div> 
       
    )
}

export default Courses;