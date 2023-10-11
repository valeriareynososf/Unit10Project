import { useContext, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { api } from '../utils/apiHelper';
import Errors from './Errors';
import UserContext from '../context/UserContext';

const UserSignUp = () => {
    const navigate = useNavigate();
    const { actions } = useContext(UserContext)

    const firstName = useRef(null);
    const lastName = useRef(null);
    const emailAddress = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            emailAddress: emailAddress.current.value,
            password: password.current.value,
        }

        try {
            const response = await api("/users", "POST", user);
            if (response.status === 201) {
                console.log(`${user.firstName} ${user.lastName} is successfully signed up and authenticated!`)
                const credentials = {
                    email: user.emailAddress,
                    password: user.password
                }
                await actions.signIn(credentials);
                navigate("/")
            } else if (response.status === 400) {
                const data = await response.json();
                setErrors(data.errors)
            } else if (response.status === 500) {
                navigate("/error")
            } else {
                throw Error();
            }

        } catch (e) {
            console.log("error signing up", e)
        }

    }


    const handleCancel = (event) => {
        event.preventDefault();
        navigate("/");
    }


    return (
        <div className="form--centered">
            <h2>Sign Up</h2>
            <Errors errors={errors} />
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    ref={firstName}
                    placeholder='First Name'
                />

                <label htmlFor="lastName">Last Name</label>
                <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    ref={lastName}
                    placeholder='Last Name'
                />

                <label htmlFor="emailAddress">Email Address</label>
                <input
                    id="emailAddress"
                    name="emailAddress"
                    type="email"
                    ref={emailAddress}
                    placeholder='Email Address'
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    ref={password}
                    placeholder='Password'
                />

                <button className="button" type="submit">
                    Sign Up
                </button>
                <button className="button button-secondary"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
            </form>
            <p>Already have a user account? Click here to <NavLink to="/signin">sign in</NavLink>!</p>
        </div>

    )
}

export default UserSignUp;