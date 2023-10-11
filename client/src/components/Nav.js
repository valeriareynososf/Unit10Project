import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

const Nav = () => {
    const { authUser } = useContext(UserContext)
    // console.log(authUser)
    return (
        <nav>
            <ul className="header--signedout">
                {/* If there is no users, show sign up/sign in links */}
                {authUser === null ?
                    <>
                        <li>
                            <Link className="signup" to="/signup">Sign up</Link>
                        </li>
                        <li>
                            <Link className="signin" to="/signin">Sign in</Link>
                        </li>
                    </>
                    :
                    <>
                        <li>
                            <span>Welcome, {authUser.firstName} {authUser.lastName} !</span>
                        </li>
                        <li>
                            <Link className="signout" to="/signout">Sign out</Link>
                        </li>
                    </>
                }
            </ul>
        </nav>
    )
}

export default Nav;