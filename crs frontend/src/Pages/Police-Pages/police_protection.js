import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PoliceProtection = ({ children }) => {
    const isAuthenticated = sessionStorage.getItem('policeOfficer') !== null;

    useEffect(() => {
        if (!isAuthenticated) {
            toast.warn('You need to login as a police officer.');
        }
    }, [isAuthenticated]);

    return isAuthenticated ? children : <Navigate to="/login/police" />;
};

export default PoliceProtection;
