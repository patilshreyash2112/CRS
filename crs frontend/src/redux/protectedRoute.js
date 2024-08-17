import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  
  useEffect(() => {
    if (!isLoggedIn) {
      toast.warn("You need to login to view this page");
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <>

        <Navigate to="/login/user" />
      </>
    );
  }

  return (
    <>

      {children}
    </>
  );
};

export default ProtectedRoute;
