import { Link, NavLink } from 'react-router-dom';
import Nav from './Nav';
{/*
CourseDetail - This component provides the "Course Detail" screen by retrieving the detail for a course from the REST API's /api/courses/:id route and rendering the course. 
The component also renders a "Delete Course" button that when clicked should send a DELETE request to the REST API's /api/courses/:id route in order to delete a course. 
This component also renders an "Update Course" button for navigating to the "Update Course" screen.

*/}
const CourseDetail = () => {

    return (
        <div>
            <div className="actions--bar">
                <div className="wrap">
                    <NavLink className="button" to="/">Update Course</NavLink>
                    <NavLink className="button" to="/">Delete Course</NavLink>
                    <NavLink className="button button-secondary" to="/">Return to List</NavLink>
                </div>
            </div>
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">

                    </div>
                </form>

            </div>
        </div>
    )
}

export default CourseDetail;