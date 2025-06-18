import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ allowedTypes, children }) => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario || (allowedTypes && !allowedTypes.includes(usuario.tipo))) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default RequireAuth;