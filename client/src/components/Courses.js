import { NavLink, useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { api } from "../utils/apiHelper.js";

const Courses = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([])

    useEffect(() => {
        const getCourses = async () => {
            const data = await api("/courses", "GET", null);
            if (data.status === 200) {
                const courses = await data.json()
                setCourses(courses);
            } else if (data.status === 500) {
                //redirect users when API returns a 500 status code
                navigate("/error")
            } else {
                throw new Error()
            }
        }
        getCourses()
            .catch(console.error);


    }, [navigate])

    return (

        <div className="wrap main--grid">
            {courses.map((course) => (
                <NavLink key={course.id} to={`/courses/${course.id}`} className="course--module course--link">
                    <h2 className="course--label">Course</h2>
                    <h3 className="course--title">{course.title}</h3>
                </NavLink>
            ))}
            <NavLink to="/courses/create" className="course--module course--add--module">
                <span className="course--add--title">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                    New Course
                </span>
            </NavLink>
        </div>
    )
}

export default Courses;