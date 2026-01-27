import {Navigate} from "react-router-dom";
import type {JSX} from "react";

interface Props {
    children: JSX.Element;
}
const PublicRoute = ({children}: Props) => {
const token  = localStorage.getItem("token");

if (token)
    return <Navigate to="/"  replace />; //if already logged in -> Home
    return children;
}


export default PublicRoute;