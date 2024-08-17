import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import NavBar from '../../Components/User-Components/navbar';
import image from '../../Images/laptop1.jpeg'; 
import { login } from '../../redux/authSlice'; 

const LoginUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth); 

  const onLogin = async (event) => {
    event.preventDefault();

    if (email.length === 0) {
      toast.warning('Enter email');
    } else if (password.length === 0) {
      toast.warning('Enter password');
    } else if (!isValidEmail(email)) {
      toast.warning('Email is not valid');
    } else {
      try {
        const action = await dispatch(login({ email, password }));
        if (login.fulfilled.match(action)) {
          toast.success('Welcome to the application');
          navigate('/home');
        } else {
          toast.error('Invalid email or password');
        }
      } catch (error) {
        toast.error('An error occurred during login');
      }
    }
  };

  // Simple email validation function
  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const backgroundStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    overflow: 'hidden'
  };

  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    border: 'none',
    boxShadow: 'none',
    padding: '1rem', 
    width: '100%',
    maxWidth: '500px', 
    borderRadius: '8px' 
  };

  useEffect(() => {
    if (status === 'failed' && error) {
      toast.error(error);
    }
  }, [status, error]);

  return (
    <>
      <NavBar />
      <div style={backgroundStyle}>
        <div className="card border-0 shadow rounded-3" style={cardStyle}>
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">USER</h5>
            <form onSubmit={onLogin}>
              <div className="form-floating mb-3">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Email"
                  value={email}
                />
                <label htmlFor="floatingInput">Email Address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  value={password}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>

              <div className="mb-3 mt-4">
                Don't have an account yet?{' '}
                <Link to="/register">Register here</Link>
                <br />
              </div>
              <div className="d-grid mt-2">
                <button
                  className="btn btn-success btn-login text-uppercase fw-bold"
                  type="submit"
                  disabled={status === 'loading'}
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </>
  );
};

export default LoginUser;
