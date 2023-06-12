import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

const PrivateRouteAdmin = ({ children }) => {
    const { user } = useSelector((state) => state.auth);

    const isLoggedIn = Cookies.get('isLoggedIn');

    if (user) {
        Cookies.set('isLoggedIn', 'true', { expires: 7 }); 
        return children;
    } else if (isLoggedIn === 'true') {
        return children;
    }

    return <Navigate to="/login" />;
};

export default PrivateRouteAdmin;
