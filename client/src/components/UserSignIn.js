import { useContext, useRef, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

import UserContext from '../context/UserContext';
import Errors from './Errors';

const UserSignIn = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { actions } = useContext(UserContext);

    const email = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([])

    const handleSubmit = async (event) => {
        event.preventDefault();
        //redirects users back to the previous screen after successfully signing in
        let from = "/";
        if (location.state) {
            from = location.state.from;
        }

        const credentials = {
            emailAddress: email.current.value,
            password: password.current.value
        };

        try {
            const user = await actions.signIn(credentials);
            // console.log("user", user)
            if (user) {
                navigate(from)
            } else {
                setErrors(["Sign-in was unsuccessful"])
            }
        } catch (e) {
            // console.log(e);
            navigate("/error")
        }
    }

    const handleCancel = (event) => {
        event.preventDefault();
        navigate("/");
    }

    return (
        <div className="form--centered">
            <h2>Sign In</h2>
            <Errors errors={errors} />
            <form onSubmit={handleSubmit}>
                <input
                    id="emailAddress"
                    name="emailAddress"
                    type="email"
                    ref={email}
                    placeholder="Email Address"
                />
                <input
                    id="password"
                    name="password"
                    type="password"
                    ref={password}
                    placeholder="Password"
                />
                <button className='button' type="submit">Sign In</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
            <p>Don't have a user account? Click here to <NavLink to="/signup">sign up</NavLink>!</p>
        </div>
    )
}

export default UserSignIn;
