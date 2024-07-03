import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AppContext } from '../../App/App';

function PrivateRoute({ requiredPrivilege }) {
    const { user } = useContext(AppContext);
    
    // Verifique se o usuário está logado e se tem o privilégio necessário
    if (user.isLogged && requiredPrivilege.includes(user.usager.privilege_id)) {
        return <Outlet />;
    } else {
        return <Navigate to="/" />;
    }
}

export default PrivateRoute;
