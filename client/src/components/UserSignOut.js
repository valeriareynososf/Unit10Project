import { useContext } from "react";
import { Navigate } from "react-router-dom";

const UserSignOut = () => {
 //const { actions } = useContext(UserContext);
 //useEffect(() => actions.signOut())
 
    return <Navigate to="/" replace />
}

export default UserSignOut;