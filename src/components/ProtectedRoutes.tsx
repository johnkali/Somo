import  {Navigate} from "react-router-dom";
import {type JSX, useContext} from "react";
import {AuthContext} from "../context/AuthContext.tsx";

interface Props {
    children: JSX.Element;
}

const ProtectedRoutes = ({children}: Props) => {
    const {user} = useContext(AuthContext)

    if(!user){
        return <Navigate to="/login" replace />;
    }
    return children

};

export default ProtectedRoutes;