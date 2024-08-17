import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../../services/Admin-Services/admin'; 
import { toast } from 'react-toastify';
import NavBar from '../../Components/User-Components/navbar';
import image from '../../Images/laptop1.jpeg';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (email.length === 0) {
            toast.warning('Enter email');
        } else if (password.length === 0) {
            toast.warning('Enter password');
        } else if (!isValidEmail(email)) {
            toast.warning('Email is not valid');
        } else {
            try {
                const admin = await loginAdmin(email, password);
                if (admin) {
                    sessionStorage.clear();
                    sessionStorage.setItem('admin', JSON.stringify(admin));
                    toast.success('Login successful.');
                    navigate('/admin-home');
                } else {
                    toast.error('Invalid email or password.');
                }
            } catch (error) {
                toast.error('Login failed. Please try again.');
            }
        }
    };

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

    return (
        <>
            <NavBar />
            <div style={backgroundStyle}>
                <div className="card border-0 shadow rounded-3" style={cardStyle}>
                    <div className="card-body p-4 p-sm-5">
                        <h5 className="card-title text-center mb-5 fw-light fs-5">ADMIN</h5>
                        <form onSubmit={handleLogin}>
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label htmlFor="floatingInput">Email Address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="floatingPassword"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>

                            <div className="d-grid mt-2">
                                <button
                                    className="btn btn-primary btn-login text-uppercase fw-bold"
                                    type="submit"
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

export default AdminLogin;
