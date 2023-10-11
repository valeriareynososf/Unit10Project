import { useEffect, useContext, useState } from 'react';
import { Link, NavLink, useParams, useNavigate  } from 'react-router-dom';
import { api } from "../utils/apiHelper.js";
import ReactMarkdown from 'react-markdown';

const CourseDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const [course, setCourse] = useState({})
    const [loading, setLoading] = useState(false);

    const handleDelete = async() => {
        console.log("delete this");
        const data = await api(`/courses/${id}`, "DELETE", null);
        if (data.status === 204) {
            navigate("/")
        } else if (data.status === 403) {
            return null;
        } else {
            throw new Error()
        }
    }

    useEffect(() => {
        let activeFetch = true;

        setLoading(true)

        const getCourses = async () => {
            const data = await api(`/courses/${id}`, "GET", null);
            if (data.status === 200) {
                const course = await data.json()
                console.log("course:", course)
                if (activeFetch) {
                setCourse(course);
                setLoading(false);
                }
            } else if (data.status === 401) {
                return null;
            } else {
                throw new Error()
            }
          
        }

        getCourses()
            .catch(console.error);
    

        return () => {
            activeFetch = false;
        };

    }, [])


console.log("course", course)
    return (
        <div>
            <div className="actions--bar">
                <div className="wrap">
                    <NavLink className="button" to={`/courses/${id}/update`}>Update Course</NavLink>
                    <button className="button" onClick={handleDelete}>Delete Course</button>
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
                            <p>By {course.User?.firstName} {course.User?.lastName}</p>
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
        </div>
    )
}

export default CourseDetail;