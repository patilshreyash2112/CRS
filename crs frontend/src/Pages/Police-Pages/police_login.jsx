import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginPoliceOfficer } from '../../services/Police-Services/police';
import { toast } from 'react-toastify';
import NavBar from '../../Components/User-Components/navbar';
import image from '../../Images/laptop1.jpeg'; // Import the same image

const PoliceLogin = () => {
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
                const data = await loginPoliceOfficer(email, password);
                if (data) {
                    sessionStorage.setItem('policeOfficer', JSON.stringify(data));
                    sessionStorage.setItem('officerId', JSON.stringify(data.id));
                    sessionStorage.setItem('policeStationId', JSON.stringify(data.policeStationId));
                    sessionStorage.setItem('officerName', JSON.stringify(data.officerName));
                    toast.success('Login successful.');
                    navigate('/police-home'); 
                } else {
                    toast.error('Invalid email or password.');
                }
            } catch (error) {
                toast.error('Login failed. Please try again.');
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

    return (
        <>
            <NavBar />
            <div style={backgroundStyle}>
                <div className="card border-0 shadow rounded-3" style={cardStyle}>
                    <div className="card-body p-4 p-sm-5">
                        <h5 className="card-title text-center mb-5 fw-light fs-5">POLICE</h5>
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
                                    className="btn btn-danger btn-login text-uppercase fw-bold"
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

export default PoliceLogin;
