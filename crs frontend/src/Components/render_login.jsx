import React from 'react'
import LoginUser from '../Pages/User-Pages/login';
import PoliceLogin from '../Pages/Police-Pages/police_login';
import AdminLogin from './../Pages/Admin-Pages/admin_login';

const RenderLogin = ({isSelected}) => {

  switch (isSelected) {
    case 0:
        return <LoginUser/>
        
    case 1:
        return <AdminLogin/>
              
    case 2:       
        return <PoliceLogin/>
    default:
        <LoginUser/>
  }
}

export default RenderLogin