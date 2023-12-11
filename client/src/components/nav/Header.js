import { NavLink } from 'react-router-dom';
import Nav from './Nav';

const Header = () => {

    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo">
                    <NavLink to="/">Courses</NavLink>
                </h1>
                <Nav />
            </div>
        </header>

    )
}

export default Header;