import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Nav = () => {
    const { authUser } = useContext(UserContext)
    // console.log(authUser)
    return (
        <nav>
                {/* If there is no users, show sign up/sign in links */}
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
                    <ul className="header--signedin">
                        <li>
                            <span>Welcome, <span className="header--username">{authUser.firstName} {authUser.lastName} </span>!</span>
                        </li>
                        <li>
                            <Link className="signout" to="/signout">Sign out</Link>
                        </li>
                    </ul>
                }
        </nav>
    )
}

export default Nav;