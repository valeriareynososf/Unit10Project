import { useContext, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
{/*
UserSignIn - This component provides the "Sign In" screen by rendering a form that allows a user to sign in using their existing account information. 
The component also renders a "Sign In" button that when clicked signs in the user and a "Cancel" button that returns the user to the default route (i.e. the list of courses).

*/}


const UserSignIn = () => {
    const navigate = useNavigate();

    const email = useRef(null);
    const password = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("submitted")
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

{/*

<form>
     <label for="emailAddress">Email Address</label>
     <input id="emailAddress" name="emailAddress" type="email" value="">
     <label for="password">Password</label>
     <input id="password" name="password" type="password" value="">
     <button class="button" type="submit">Sign In</button><button class="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
 </form>
 <p>Don't have a user account? Click here to <a href="sign-up.html">sign up</a>!</p>
                
*/}