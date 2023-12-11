import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/apiHelper';
import UserContext from '../../context/UserContext';
import Errors from '../errors/Errors';

const CreateCourse = () => {
    const navigate = useNavigate()
    const { authUser } = useContext(UserContext);
    const { password } = authUser;
    const [errors, setErrors] = useState([]);
    const [course, setCourse] = useState({
        userId: authUser.id,
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await api(`/courses`, "POST", course, { ...authUser, password: password });

        if (data.status === 201) {
            navigate(`/`)
        } else if (data.status === 400) {
            const res = await data.json();
            // console.log("res", res)
            if (res.errors) {
                setErrors(res.errors)
            }
        } else if (data.status === 500) {
            navigate("/error")
        } else {
            throw new Error()
        }

    }


    const handleCancel = (event) => {
        event.preventDefault();
        navigate("/");
    }

    return (
        <div className="wrap">
            <h2>Create Course</h2>
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

                        <p>by {authUser?.firstName} {authUser?.lastName}</p>

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
                    Create Course
                </button>
                <button
                    className="button button-secondary"
                    onClick={handleCancel}>
                    Cancel
                </button>
            </form>
        </div>
    )
}

export default CreateCourse;