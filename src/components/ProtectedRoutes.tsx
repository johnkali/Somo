import  {Navigate} from "react-router-dom";
import type {JSX} from "react";

interface Props {
    children: JSX.Element;
}

const ProtectedRoutes = ({children}: Props) => {
    const token = localStorage.getItem("token");

    if(!token){
        return <Navigate to="/login" replace />;
    }
    return children

};

export default ProtectedRoutes;