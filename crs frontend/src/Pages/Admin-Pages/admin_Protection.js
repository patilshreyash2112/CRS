import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminHomeProtection = ({ children }) => {
    const isAuthenticated = sessionStorage.getItem('admin') !== null;

    useEffect(() => {
        if (!isAuthenticated) {
            toast.warn('You need to login as admin.');
        }
    }, [isAuthenticated]);

    return isAuthenticated ? children : <Navigate to="/login/admin" />;
};

export default AdminHomeProtection;
