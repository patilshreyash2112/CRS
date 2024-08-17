import React, { useState, useEffect } from 'react';
import Footer from '../User-Components/footer';
import AdminNavBar from './admin_navbar';
import Form from 'react-bootstrap/Form';
import { registerPoliceOfficer } from '../../services/Admin-Services/police_officer'; // Adjust the path as needed
import { fetchPoliceStations } from '../../services/Admin-Services/police_station'; // Adjust the path as needed
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const AddPoliceOfficer = () => {
    const [officerName, setOfficerName] = useState('');
    const [designation, setDesignation] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [policeStationId, setPoliceStationId] = useState('');
    // const [image, setImage] = useState(null);
    const [policeStations, setPoliceStations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStations = async () => {
            try {
                const data = await fetchPoliceStations();
                setPoliceStations(data);
            } catch (error) {
                console.error('Error fetching police stations:', error);
            }
        };

        fetchStations();
        
    }, []);

    const validateForm = () => {
        if (officerName.length === 0) {
            toast.warning('Enter Officer Name');
            return false;
        }
        if (designation.length === 0) {
            toast.warning('Select Designation');
            return false;
        }
        if (contactNumber.length === 0) {
            toast.warning('Enter Contact Number');
            return false;
        }
        if (!/^\d{10}$/.test(contactNumber)) {
            toast.warning('Please enter a valid 10-digit contact number');
            return false;
        }
        if (email.length === 0) {
            toast.warning('Enter Email');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.warning('Enter a valid email address');
            return false;
        }
        if (policeStationId.length === 0) {
            toast.warning('Select Police Station');
            return false;
        }
        // if (!image) {
        //     toast.warning('Upload Image of Police Officer');
        //     return false;
        // }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateForm()) {
            return;
        }
    
        const officerData = {
            officerName,
            designation,
            contactNumber,
            email,
            policeStationId
        };
    
        try {
            const data = await registerPoliceOfficer(officerData);
            console.log(data);
            toast.success('Police officer registered successfully');
            navigate('/admin-police-officers');
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Failed to register police officer');
        }
    };
    

    return (
        <div>
            <AdminNavBar />
            <div className="home-container">
                <header className="home-header">
                    <h1>ADD POLICE OFFICER</h1>
                </header>
                <section className='home-section'>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-10 col-md-9 col-lg-7 mx-auto">
                                <div className="card border-0 shadow rounded-3 my-5">
                                    <div className="card-body p-4 p-sm-5">
                                        <h5 className="card-title text-center mb-5 fw-light fs-5">POLICE OFFICER INFO</h5>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-floating mb-3">
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="floatingInput" 
                                                    placeholder="Officer Name" 
                                                    value={officerName}
                                                    onChange={(e) => setOfficerName(e.target.value)}
                                                />
                                                <label htmlFor="floatingInput">Officer Name</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <Form.Group controlId="formDesignation">
                                                {/* <Form.Label>Designation</Form.Label> */}
                                                    <Form.Select 
                                                        className="form-control"
                                                        value={designation}
                                                        onChange={(e) => setDesignation(e.target.value)}
                                                    >
                                                        <option value="">Select Designation</option>
                                                        <option value="HEAD">HEAD</option>
                                                        <option value="INSPECTOR">INSPECTOR</option>
                                                        <option value="CONSTABLE">CONSTABLE</option>
                                                    </Form.Select>
                                                    
                                                </Form.Group>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="floatingInput" 
                                                    placeholder="Contact Number" 
                                                    value={contactNumber}
                                                    onChange={(e) => setContactNumber(e.target.value)}
                                                />
                                                <label htmlFor="floatingInput">Contact Number</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input 
                                                    type="email" 
                                                    className="form-control" 
                                                    id="floatingInput" 
                                                    placeholder="Email" 
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                <label htmlFor="floatingInput">Email</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <Form.Group controlId="formPoliceStation">
                                                    <Form.Select 
                                                        className="form-control"
                                                        value={policeStationId}
                                                        onChange={(e) => setPoliceStationId(e.target.value)}
                                                    >
                                                        <option value="">Select Police Station</option>
                                                        {policeStations.map((station) => (
                                                            <option key={station.id} value={station.id}>{station.stationName}</option>
                                                        ))}
                                                    </Form.Select>
                                                    <Form.Label>Police Station</Form.Label>
                                                </Form.Group>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <div className='row'>
                                                    <div className='col'>
                                                        <input 
                                                            type="text" 
                                                            disabled 
                                                            className="form-control" 
                                                            id="floatingInput" 
                                                            placeholder="Upload Image of Police Officer" 
                                                        />
                                                        {/* <Form.Group controlId="formFile">
                                                            <Form.Control 
                                                                type="file" 
                                                                placeholder="Image of Police Officer"
                                                                onChange={(e) => setImage(e.target.files[0])}
                                                            />
                                                        </Form.Group> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-grid mt-4">
                                                <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">ADD OFFICER</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

 

            <ToastContainer />
            <Footer />
        </div>
    );
}

export default AddPoliceOfficer;
