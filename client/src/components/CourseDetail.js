import { Link } from 'react-router-dom';
import Nav from './Nav';
{/*
CourseDetail - This component provides the "Course Detail" screen by retrieving the detail for a course from the REST API's /api/courses/:id route and rendering the course. 
The component also renders a "Delete Course" button that when clicked should send a DELETE request to the REST API's /api/courses/:id route in order to delete a course. 
This component also renders an "Update Course" button for navigating to the "Update Course" screen.

*/}
const CourseDetail = () => {

    return (
        <div className="header">
            <Link to="/" className="header--logo"><h1>Courses</h1></Link>
            <Nav />
        </div>
    )
}

export default CourseDetail;