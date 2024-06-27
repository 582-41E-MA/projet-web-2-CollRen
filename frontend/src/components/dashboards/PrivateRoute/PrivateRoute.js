import { useContext } from "react";
import { AppContext } from "../App/App";
import { Navigate, Outlet } from "react-router-dom";


function PrivateRoute () {
    const context = useContext(AppContext); 

    if(context.isLogged) {
        return <Outlet/>;
    }else{
        return <Navigate to="/"/>
    }

   
}

export default PrivateRoute;