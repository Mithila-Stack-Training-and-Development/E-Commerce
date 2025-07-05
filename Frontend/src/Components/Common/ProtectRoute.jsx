import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const ProtectRoute = ({ children, role}) => {
    const { user } = useSelector((state) => state.auth);

    if (!user) {
    return <Navigate to="/login"  replace />;
  }

  // If a role is required and the user doesn't match
  if (role && user.role !== role) {
    return <Navigate to="/login" replace />;
  }

    // if(!user || (role && user.role)){
    //     return <Navigate to="login" replace />
    // }
  return children;
}

export default ProtectRoute