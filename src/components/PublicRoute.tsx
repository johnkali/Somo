import {Navigate} from "react-router-dom";
import {type JSX, useContext} from "react";
import {AuthContext} from "../context/AuthContext.tsx";

interface Props {
    children: JSX.Element;
}
const PublicRoute = ({children}: Props) => {
    const {user} = useContext(AuthContext);

    if (user) {
        return <Navigate to="/" replace/>; //if already logged in -> Home
    }
    return children;

}

export default PublicRoute;