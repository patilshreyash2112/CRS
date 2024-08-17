import React, { useState, useEffect } from 'react';
import AdminNavBar from "../../Components/Admin-Components/admin_navbar";
import Footer from "../../Components/User-Components/footer";
import { Link } from 'react-router-dom';
import { fetchPoliceStations, deletePoliceStation, updatePoliceStation } from '../../services/Admin-Services/police_station'; // Adjust the path as needed
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Modal, Form } from 'react-bootstrap';
import PoliceStationBanner from '../../Images/policeBanner.jpg';
import AdminHomeProtection from './admin_Protection';

const AdminPoliceStations = () => {
    const [stations, setStations] = useState([]);
    const [selectedStation, setSelectedStation] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editStation, setEditStation] = useState({
        stationName: '',
        address: {
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            pinCode: ''
        },
        contactNumber: '',
        imageUrl: ''
    });

    useEffect(() => {
        const loadStations = async () => {
            try {
                const data = await fetchPoliceStations();
                setStations(data);
            } catch (error) {
                console.error('Error fetching police stations:', error);
                toast.error('Failed to fetch police stations');
            }
        };

        loadStations();
    }, []);

    const handleDelete = async (stationId) => {
        try {
            await deletePoliceStation(stationId);
            setStations(stations.filter(station => station.id !== stationId));
            toast.success('Police station deleted successfully');
        } catch (error) {
            console.error('Error deleting police station:', error);
            toast.error('Failed to delete police station');
        }
    };

    const handleShowDetails = (station) => {
        setSelectedStation(station);
        setShowDetailsModal(true);
    };

    const handleShowEdit = (station) => {
        setEditStation(station);
        setShowEditModal(true);
    };

    const handleCloseDetailsModal = () => {
        setShowDetailsModal(false);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditStation({
            ...editStation,
            [name]: value
        });
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setEditStation({
            ...editStation,
            address: {
                ...editStation.address,
                [name]: value
            }
        });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await updatePoliceStation(editStation.id, editStation);
            setStations(stations.map(station => station.id === editStation.id ? editStation : station));
            toast.success('Police station updated successfully');
            handleCloseEditModal();
        } catch (error) {
            console.error('Error updating police station:', error);
            toast.error('Failed to update police station');
        }
    };

    return (
        <>
            <AdminHomeProtection>
                <AdminNavBar />

                <div className="home-container">
                    <header className="home-header">
                        <h1>Police Stations</h1>
                    </header>

                    <section className="home-section">
                        <div className="row mb-3">
                            <div className="col-md-12">
                                <div className="card text-center">
                                    <Link to="/admin-police-stations"><img src={PoliceStationBanner} className="card-img-top" alt="Report Crime" /></Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="home-section">
                        <Link to={'/add-police-station'}>
                            <Button variant="outline-primary">Add Police Station</Button>
                        </Link>
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered text-center">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Name</th>
                                        <th>Address</th>
                                        <th>Contact Number</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stations.map((station, index) => (
                                        <tr key={station.id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <Button
                                                    variant="link"
                                                    onClick={() => handleShowDetails(station)}
                                                >
                                                    {station.stationName}
                                                </Button>
                                            </td>
                                            <td>{station.address.city}</td>
                                            <td>{station.contactNumber}</td>
                                            <td>
                                                <Button
                                                    variant="outline-warning"
                                                    onClick={() => handleShowEdit(station)}
                                                >
                                                    Edit
                                                </Button>
                                            </td>
                                            <td>
                                                <Button
                                                    variant="outline-danger"
                                                    onClick={() => handleDelete(station.id)}
                                                    disabled={true}
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>

                <Footer />

                {/* Details Modal */}
                <Modal show={showDetailsModal} onHide={handleCloseDetailsModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Police Station Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedStation && (
                            <>
                                <h5>{selectedStation.stationName}</h5>
                                <p><strong>Address:</strong> {selectedStation.address.addressLine1}, {selectedStation.address.addressLine2}, {selectedStation.address.city}, {selectedStation.address.state} - {selectedStation.address.pinCode}</p>
                                <p><strong>Contact Number:</strong> {selectedStation.contactNumber}</p>
                                {selectedStation.imageUrl && (
                                    <img src={selectedStation.imageUrl} alt={selectedStation.stationName} style={{ width: '100%', height: 'auto' }} />
                                )}
                            </>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDetailsModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Edit Modal */}
                <Modal show={showEditModal} onHide={handleCloseEditModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Police Station</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleEditSubmit}>
                            <Form.Group className="mb-3" controlId="formStationName">
                                <Form.Label>Station Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter station name"
                                    name="stationName"
                                    value={editStation.stationName}
                                    onChange={handleEditChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formAddressLine1">
                                <Form.Label>Address Line 1</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter address line 1"
                                    name="addressLine1"
                                    value={editStation.address.addressLine1}
                                    onChange={handleAddressChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formAddressLine2">
                                <Form.Label>Address Line 2</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter address line 2"
                                    name="addressLine2"
                                    value={editStation.address.addressLine2}
                                    onChange={handleAddressChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter city"
                                    name="city"
                                    value={editStation.address.city}
                                    onChange={handleAddressChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formState">
                                <Form.Label>State</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter state"
                                    name="state"
                                    value={editStation.address.state}
                                    onChange={handleAddressChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPinCode">
                                <Form.Label>Pin Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter pin code"
                                    name="pinCode"
                                    value={editStation.address.pinCode}
                                    onChange={handleAddressChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formContactNumber">
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter contact number"
                                    name="contactNumber"
                                    value={editStation.contactNumber}
                                    onChange={handleEditChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formImageUrl">
                                <Form.Label>Image URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter image URL"
                                    name="imageUrl"
                                    value={editStation.imageUrl}
                                    onChange={handleEditChange}
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseEditModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

            </AdminHomeProtection>
        </>
    );
};

export default AdminPoliceStations;
