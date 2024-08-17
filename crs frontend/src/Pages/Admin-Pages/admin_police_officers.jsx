import React, { useState, useEffect } from 'react';
import AdminNavBar from "../../Components/Admin-Components/admin_navbar";
import Footer from "../../Components/User-Components/footer";
import policeImage from '../../Images/Officers.jpeg';
import constableImage from '../../Images/constable.jpg';
import inspectorImage from '../../Images/inspector.jpg';
import headImage from '../../Images/head.jpg';
import { Link } from 'react-router-dom';
import { fetchPoliceOfficers, deletePoliceOfficer, updatePoliceOfficer } from '../../services/Admin-Services/police_officer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Modal, Form } from 'react-bootstrap';
import AdminHomeProtection from './admin_Protection';

const AdminPoliceOfficers = () => {
    const [officers, setOfficers] = useState([]);
    const [selectedOfficer, setSelectedOfficer] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    useEffect(() => {
        const loadOfficers = async () => {
            try {
                const data = await fetchPoliceOfficers();
                setOfficers(data);
            } catch (error) {
                console.error('Error fetching police officers:', error);
                toast.error('Failed to fetch police officers');
            }
        };

        loadOfficers();
    }, []);

    const loadOfficers = async () => {
        try {
            const data = await fetchPoliceOfficers();
            setOfficers(data);
        } catch (error) {
            console.error('Error fetching police officers:', error);
            toast.error('Failed to fetch police officers');
        }
    };

    const handleDelete = async (officerId) => {
        try {
            await deletePoliceOfficer(officerId);
            setOfficers(officers.filter(officer => officer.id !== officerId));
            toast.success('Officer deleted successfully');
        } catch (error) {
            console.error('Error deleting police officer:', error);
            toast.error('Failed to delete officer');
        }
    };

    const handleEdit = (officer) => {
        setSelectedOfficer(officer);
        setShowEditModal(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updatePoliceOfficer(selectedOfficer.id, selectedOfficer);
            setShowEditModal(false);
            await loadOfficers(); // Reload the officers list
            toast.success('Officer updated successfully');
        } catch (error) {
            console.error('Error updating police officer:', error);
            toast.error('Failed to update officer');
        }
    };

    const handleShowDetails = (officer) => {
        setSelectedOfficer(officer);
        setShowDetailsModal(true);
    };

    const handleCloseDetailsModal = () => {
        setShowDetailsModal(false);
    };

    // Function to get image URL based on designation
    const getImageByDesignation = (designation) => {
        switch (designation) {
            case 'CONSTABLE':
                return constableImage;
            case 'INSPECTOR':
                return inspectorImage;
            case 'HEAD':
                return headImage;
            default:
                return policeImage;
        }
    };

    return (
        <>
        <AdminHomeProtection>
            <AdminNavBar />

            <div className="home-container">
                <header className="home-header">
                    <h1>Police Officers</h1>
                </header>

                <section className="home-section">
                    <div className="row mb-3">
                        <div className="col-md-12">
                            <div className="card text-center">
                                <Link to="/complaints">
                                    <img src={policeImage} className="card-img-top" alt="Report Crime" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="home-section">
                    <Link to={'/add-police-officer'}>
                        <button className="btn btn-outline-primary">Add Police Officer</button>
                    </Link>
                    <center>
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered text-center">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Designation</th>
                                        <th>Contact Number</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {officers.map((officer, index) => (
                                        <tr key={officer.id} onClick={() => handleShowDetails(officer)}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <img
                                                    src={getImageByDesignation(officer.designation)}
                                                    alt={officer.designation}
                                                    style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                                                />
                                            </td>
                                            <td>
                                                <span
                                                    style={{ cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}
                                                    onClick={() => handleShowDetails(officer)}
                                                >
                                                    {officer.officerName}
                                                </span>
                                            </td>
                                            <td>{officer.designation}</td>
                                            <td>{officer.contactNumber}</td>
                                            <td>
                                                <button
                                                    className="btn btn-outline-warning"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEdit(officer);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-outline-danger"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(officer.id);
                                                    }}
                                                    disabled={true}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </center>
                </section>
            </div>

            {/* Police Officer Details Modal */}
            <Modal show={showDetailsModal} onHide={handleCloseDetailsModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Police Officer Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedOfficer && (
                        <div className="card">
                            <div className="card-body">
                                <img
                                    src={getImageByDesignation(selectedOfficer.designation)}
                                    alt={selectedOfficer.designation}
                                    style={{ width: '150px', height: '150px', objectFit: 'contain', display: 'block', margin: '0 auto' }}
                                />
                                <h5 className="card-title">{selectedOfficer.officerName}</h5>
                                <p><strong>Designation:</strong> {selectedOfficer.designation}</p>
                                <p><strong>Contact Number:</strong> {selectedOfficer.contactNumber}</p>
                                <p><strong>Email:</strong> {selectedOfficer.email}</p>
                                <p><strong>Police Station:</strong> {selectedOfficer.policeStationName}</p>
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDetailsModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Police Officer Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Police Officer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedOfficer && (
                        <Form onSubmit={handleUpdate}>
                            <Form.Group controlId="formOfficerName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Officer Name"
                                    value={selectedOfficer.officerName}
                                    onChange={(e) => setSelectedOfficer({ ...selectedOfficer, officerName: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="formDesignation">
                                <Form.Label>Designation</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={selectedOfficer.designation}
                                    onChange={(e) => setSelectedOfficer({ ...selectedOfficer, designation: e.target.value })}
                                >
                                    <option value="HEAD">HEAD</option>
                                    <option value="INSPECTOR">INSPECTOR</option>
                                    <option value="CONSTABLE">CONSTABLE</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formContactNumber">
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Contact Number"
                                    value={selectedOfficer.contactNumber}
                                    onChange={(e) => setSelectedOfficer({ ...selectedOfficer, contactNumber: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    value={selectedOfficer.email}
                                    onChange={(e) => setSelectedOfficer({ ...selectedOfficer, email: e.target.value })}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Update
                            </Button>
                        </Form>
                    )}
                </Modal.Body>
            </Modal>

            </AdminHomeProtection>
            <Footer />
        </>
    );
};

export default AdminPoliceOfficers;
