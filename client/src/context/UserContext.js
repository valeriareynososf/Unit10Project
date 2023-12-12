import { createContext, useState } from "react";
import Cookies from "js-cookie";
import { api } from "../utils/apiHelper";

const UserContext = createContext(null);

export const UserProvider = (props) => {
  const cookie = Cookies.get("authenticatedUser");
  const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);
  const [credentials, setCredentials] = useState('');

  const signIn = async (credentials) => {
    const res = await api("/users", "GET", null, credentials);

    if (res.status === 200) {
      const user = await res.json()
      // console.log("User:", user)
      setCredentials(credentials)
      // user.password = credentials.password
      setAuthUser(user);
      //persists user credentials
      Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
      return user;
    } else if (res.status === 401) {
      return null;
    } else {
      throw new Error()
    }
  }

  const signOut = () => {
    setAuthUser(null);
    Cookies.remove("authenticatedUser");
  }

  return (
    <UserContext.Provider value={{
      authUser,
      credentials,
      actions: {
        signIn,
        signOut
      }
    }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;