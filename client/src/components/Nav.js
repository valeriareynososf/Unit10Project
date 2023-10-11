import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

const Nav = () => {
    const { authUser } = useContext(UserContext)

    return (
        <nav>
            {authUser === null ?
                <ul className="header--signedout">
                    <li>
                        <Link className="signup" to="/signup">Sign up</Link>
                    </li>
                    <li>
                        <Link className="signin" to="/signin">Sign in</Link>
                    </li>
                </ul>
                :
                <>
                    <span>Welcome, {authUser.name}!</span>
                    <Link className="signout" to="/signout">Sign out</Link>
                </>
            }
        </nav>
    )
}

export default Nav;