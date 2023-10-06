import { Link, NavLink } from 'react-router-dom';

import CourseContext from "../context/CourseContext";
import { useEffect, useContext, useState } from 'react';

const Courses = () => {
    const { actions } = useContext(CourseContext);
    const [courses, setCourses] = useState([])


    const getCourses = async () => {
        const courses = await actions.getCourses;
        courses().then(val => setCourses(val))
    }
    useEffect(() => {
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
                    <NavLink to="/courses/create" className="course--module course--add--module">
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