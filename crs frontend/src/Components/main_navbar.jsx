
// import { Button } from 'react-bootstrap';
import { useState } from "react";
// import LoginUser from '../../Pages/User-Pages/login';
// import PoliceLogin from './../../Pages/Police-Pages/police-login';
// import AdminLogin from './../../Pages/Admin-Pages/admin_login';
import RenderLogin from './render_login';


function MainNavBar(){
  const [isSelected, setIsSelected] = useState(0)
    return(
    <>

      <div>
        {/* <div className="user-options">
                <Link to='/' className="user-login-btn">User Login</Link>                
                <Link to='/admin-login' className="admin-login-btn">Admin Login</Link>
                <Link to='/police-login' className="head-login-btn">Police Login</Link>
        </div> */}
        
        <div className="user-options">
                <button onClick={() => setIsSelected(0)} className="user-login-btn">User</button>                
                <button onClick={() => setIsSelected(1)} className="admin-login-btn">Admin</button>
                <button onClick={() => setIsSelected(2)} className="head-login-btn">Police</button>
        </div>

        <hr/>
        <RenderLogin isSelected={isSelected}/>
          {/* {isSelected === 0 && <LoginUser/>}
          {isSelected === 1 && <AdminLogin/>}
          {isSelected === 2 && <PoliceLogin/>} */}
      
      </div>
     
    </>
    );
}
export default MainNavBar