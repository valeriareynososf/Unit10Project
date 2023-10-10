import { Link, NavLink } from 'react-router-dom';

// import CourseContext from "../context/CourseContext";
import { useEffect, useContext, useState } from 'react';
import { api } from "../utils/apiHelper.js";

const Courses = () => {
    // const { actions } = useContext(CourseContext);
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false);

    // const getCourses = async () => {
    //     const courses = await actions.getCourses;
    //     courses().then(val => setCourses(val))
    // }
    // useEffect(() => {
    //     getCourses()

    // }, [])

    // const getCourses = async () => {
    //     const res = await api("/courses", "GET", null);

    //     if (res.status === 200) {
    //         const courses = await res.json()
    //         console.log("courses:", courses)
    //         return courses;
    //     } else if (res.status === 401) {
    //         return null;
    //     } else {
    //         throw new Error()
    //     }
    // }


    useEffect(() => {
        let activeFetch = true;

        setLoading(true)

        const getCourses = async () => {
            const data = await api("/courses", "GET", null);
            // const res = await response.json();
            if (data.status === 200) {
                const courses = await data.json()
                console.log("courses:", courses)
                if (activeFetch) {
                setCourses(courses);
                setLoading(false);
                }
            } else if (data.status === 401) {
                return null;
            } else {
                throw new Error()
            }
          
        }

        // call the function
        getCourses()
            // make sure to catch any error
            .catch(console.error);
        //     fetch (`https://www.fli=json&nojsoncallback=1`)
        //     .then(res => {
        //       if (res.ok) {
        //          return res.json() 
        //       } else {
        //           console.log(res)
        //           console.log("Not successful!")
        //       }

        //   })
        //     .then(res => {
        //       if (activeFetch) {
        //             setImages(res.photos.photo);
        //             setLoading(false);
        //           }
        //     })
        //     .catch(error => console.log("Error fetching data", error))

        return () => {
            activeFetch = false;
        };

    }, [])

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