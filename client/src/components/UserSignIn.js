import { useContext, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import UserContext from '../context/UserContext';

const UserSignIn = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { actions } = useContext(UserContext);

    const email = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([])

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("submitted")
        let from = "/";
        if (location.state) {
            from = location.state.from;
        }

        const credentials = {
            email: email.current.value,
            password: password.current.value
        };

        try {
            const user = await actions.signIn(credentials);
            if (user) {
                navigate(from)
            } else {
                setErrors["Sign-in was unsuccessful"]
            }
        } catch (e) {
            console.log(e);
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
            <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
        </div>
    )
}

export default UserSignIn;
