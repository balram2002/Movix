import React from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext';

function ProtectedRoute({ children }) {
    const { user } = UserAuth();

    if (user?.email) {
        return children;
    } else {
        return <Navigate to='/' />;
    }
};

export default ProtectedRoute