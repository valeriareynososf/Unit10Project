import { useParams, useNavigate } from 'react-router-dom';

import { useEffect, useContext, useState } from 'react';
import { api } from "../utils/apiHelper.js";
import UserContext from '../context/UserContext.js';
import Errors from './Errors.js';

const UpdateCourse = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const { authUser } = useContext(UserContext)

    const [course, setCourse] = useState({})
    const [errors, setErrors] = useState([])


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e.target)
        const data = await api(`/courses/${id}`, "PUT", course, authUser);
        if (data.status === 204) {
            navigate(`/courses/${id}`)
        } else if (data.status === 400) {
            const res = await data.json();
            setErrors(res.errors)
        } else if (data.status === 404) {
            navigate("/notfound")
        } else if (data.status === 500) {
            navigate("/error")
        } else {
            throw new Error()
        }
        e.target.reset()
    }


    useEffect(() => {

        const getCourses = async () => {
            const data = await api(`/courses/${id}`, "GET", null);
            if (data.status === 200) {
                const course = await data.json()
                console.log("course:", course)

                //navigate to forbidden if authenticated user's ID doesn't match that of the user who owns the course

                if (authUser?.id !== course?.User?.id) {
                    navigate("/forbidden")
                } else {
                    setCourse(course);
                }
            } else if (data.status === 404) {
                navigate("/notfound")
            } else if (data.status === 500) {
                navigate("/error")
            }
        }

        getCourses()
            .catch(console.error);

    }, [id, navigate, authUser?.id])


    const handleCancel = (event) => {
        event.preventDefault();
        navigate(`/courses/${course.id}`);
    }


    return (
        <div className="wrap">
            <h2>Update Course</h2>
            {/* screens display validation errors returned from the REST API */}
            <Errors errors={errors} />
            <form onSubmit={handleSubmit}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input
                            id="courseTitle"
                            name="courseTitle"
                            type="text"
                            value={course.title || ''}
                            onChange={e => setCourse({ ...course, title: e.target.value })}
                        />

                        <p>By {course.User?.firstName} {course.User?.lastName}</p>

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea
                            id="courseDescription"
                            name="courseDescription"
                            value={course.description || ''}
                            onChange={e => setCourse({ ...course, description: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input
                            id="estimatedTime"
                            name="estimatedTime"
                            type="text"
                            value={course.estimatedTime || ''}
                            onChange={e => setCourse({ ...course, estimatedTime: e.target.value })}
                        />

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea
                            id="materialsNeeded"
                            name="materialsNeeded"
                            value={course.materialsNeeded || ''}
                            onChange={e => setCourse({ ...course, materialsNeeded: e.target.value })}
                        />
                    </div>
                </div>
                <button className="button" type="submit">
                    Update Course
                </button>
                <button className="button button-secondary"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
            </form>
        </div>
    )
}

export default UpdateCourse;