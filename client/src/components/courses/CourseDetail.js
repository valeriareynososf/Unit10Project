import { useEffect, useContext, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { NavLink, useParams, useNavigate } from 'react-router-dom';

import UserContext from '../../context/UserContext.js';
import { api } from "../../utils/apiHelper.js";
import DeleteCourseModal from '../modals/deleteModal/deleteCourse.js';

const CourseDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const { authUser } = useContext(UserContext)
    const [course, setCourse] = useState({})
    const [openModal, setOpenModal] = useState(false)

    const handleDelete = async () => {
        setOpenModal(false)
         const { password } = authUser;
        const data = await api(`/courses/${id}`, "DELETE", null, { ...authUser, password: password });
        if (data.status === 204) {
            navigate("/")
        } else if (data.status === 403) {
            navigate("/forbidden")
        } else if (data.status === 500) {
            navigate("/error")
        } else {
           throw new Error()
        }
    }

const handleCloseModal = () => {
    setOpenModal(false)
}

    useEffect(() => {
        const getCourses = async () => {
            const data = await api(`/courses/${id}`, "GET", null);
            // console.log("course:", data)
            if (data.status === 200) {
                const course = await data.json()
                setCourse(course);

            } else if (data.status === 404) {
                navigate("/notfound")
            } else {
                navigate("/error")
            }

        }

        getCourses()
            .catch(console.error);

    }, [id, navigate])

    return (
        <div>
            <div className="actions--bar">
                <div className="wrap">
                    {/* only show if authenticated user's ID matches that of the user who owns the course */}
                    {
                        authUser?.id === course?.User?.id ?
                            (
                                <>
                                    <NavLink className="button" to={`/courses/${id}/update`}>Update Course</NavLink>
                                    <button className="button" onClick={() => setOpenModal(true)}>Delete Course</button>
                                </>
                            ) : null
                    }
                    <NavLink className="button button-secondary" to="/">Return to List</NavLink>
                </div>
            </div>
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>By <span className="course--username">{course.User?.firstName} {course.User?.lastName}</span></p>
                            <ReactMarkdown children={course.description} />
                            <p>{course.description}</p>

                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                <ReactMarkdown children={course.materialsNeeded} />
                            </ul>
                        </div>
                    </div>
                </form>

            </div>
            <DeleteCourseModal 
            isOpen={openModal}
            onSubmit={handleDelete}
            onClose={handleCloseModal}
            />
        </div>
    )
}

export default CourseDetail;