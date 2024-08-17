import { registerPoliceStation } from '../../services/Admin-Services/police_station';
import React, { useState } from 'react';
import Footer from '../User-Components/footer';
import AdminNavBar from './admin_navbar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AddPoliceStation = () => {
    const [stationName, setStationName] = useState('');
    const [location, setLocation] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const navigate = useNavigate();
    const validateForm = () => {
        if (stationName.length === 0) {
            toast.warning('Enter Station Name');
            return false;
        } else if (location.length === 0) {
            toast.warning('Enter Location');
            return false;
        } else if (contactNumber.length === 0) {
            toast.warning('Enter Contact Number');
            return false;
        } else if (!/^\d{10}$/.test(contactNumber)) {
            toast.warning('Enter a valid 10-digit Contact Number');
            return false;
        } else if (addressLine1.length === 0) {
            toast.warning('Enter Address Line 1');
            return false;
        } else if (city.length === 0) {
            toast.warning('Enter City');
            return false;
        } else if (state.length === 0) {
            toast.warning('Enter State');
            return false;
        } else if (pincode.length === 0) {
            toast.warning('Enter Pin Code');
            return false;
        } else if (!/^\d{6}$/.test(pincode)) {
            toast.warning('Enter a valid 6-digit Pin Code');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const policeStationDTO = {
            stationName,
            location,
            contactNumber,
            address: {
                addressLine1,
                addressLine2,
                city,
                state,
                pincode
            }
        };

        try {
            // console.log(policeStationDTO)
            await registerPoliceStation(policeStationDTO);
            toast.success('Police station registered successfully!');
            navigate('/admin-police-stations');
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Failed to register police station.');
        }
    };

    return (
        <div>
            <AdminNavBar />
            <div className="home-container">
                <header className="home-header">
                    <h1>ADD POLICE STATION</h1>
                </header>
                <section className='home-section'>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-10 col-md-9 col-lg-7 mx-auto">
                                <div className="card border-0 shadow rounded-3 my-5">
                                    <div className="card-body p-4 p-sm-5">
                                        <h5 className="card-title text-center mb-5 fw-light fs-5">POLICE STATION INFO</h5>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="stationName"
                                                    placeholder="Station Name"
                                                    value={stationName}
                                                    onChange={(e) => setStationName(e.target.value)}
                                                />
                                                <label htmlFor="stationName">Station Name</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="location"
                                                    placeholder="Location"
                                                    value={location}
                                                    onChange={(e) => setLocation(e.target.value)}
                                                />
                                                <label htmlFor="location">Location</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="contactNumber"
                                                    placeholder="Contact Number"
                                                    value={contactNumber}
                                                    onChange={(e) => setContactNumber(e.target.value)}
                                                />
                                                <label htmlFor="contactNumber">Contact Number</label>
                                            </div>
                                            <div className='row'>
                                                <div className='col'>
                                                    <div className="form-floating mb-3">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="addressLine1"
                                                            placeholder="Address Line 1"
                                                            value={addressLine1}
                                                            onChange={(e) => setAddressLine1(e.target.value)}
                                                        />
                                                        <label htmlFor="addressLine1">Address Line 1</label>
                                                    </div>
                                                </div>
                                                <div className='col'>
                                                    <div className="form-floating mb-3">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="addressLine2"
                                                            placeholder="Address Line 2"
                                                            value={addressLine2}
                                                            onChange={(e) => setAddressLine2(e.target.value)}
                                                        />
                                                        <label htmlFor="addressLine2">Address Line 2</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col'>
                                                    <div className="form-floating mb-3">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="city"
                                                            placeholder="City"
                                                            value={city}
                                                            onChange={(e) => setCity(e.target.value)}
                                                        />
                                                        <label htmlFor="city">City</label>
                                                    </div>
                                                </div>
                                                <div className='col'>
                                                    <div className="form-floating mb-3">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="state"
                                                            placeholder="State"
                                                            value={state}
                                                            onChange={(e) => setState(e.target.value)}
                                                        />
                                                        <label htmlFor="state">State</label>
                                                    </div>
                                                </div>
                                                <div className='col'>
                                                    <div className="form-floating mb-3">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="pinCode"
                                                            placeholder="Pin Code"
                                                            value={pincode}
                                                            onChange={(e) => setPincode(e.target.value)}
                                                        />
                                                        <label htmlFor="pinCode">Pin Code</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-grid mt-4">
                                                <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">ADD STATION</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}

export default AddPoliceStation;
