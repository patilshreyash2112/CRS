import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPoliceStationById, updatePoliceStation } from '../../services/Admin-Services/police_station'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Button, Modal } from 'react-bootstrap';

const UpdatePoliceStation = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [show, setShow] = useState(true);
    const [station, setStation] = useState({
        stationName: '',
        location: '',
        contactNumber: '',
        address: {
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            pincode: ''
        }
    });

    useEffect(() => {
        const loadStation = async () => {
            try {
                const data = await fetchPoliceStationById(id);
                setStation(data);
            } catch (error) {
                console.error('Error fetching police station:', error);
                toast.error('Failed to fetch police station');
            }
        };

        loadStation();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('address.')) {
            const addressKey = name.split('.')[1];
            setStation(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    [addressKey]: value
                }
            }));
        } else {
            setStation(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updatePoliceStation(id, station);
            toast.success('Police station updated successfully');
            navigate('/admin-police-stations');
        } catch (error) {
            console.error('Error updating police station:', error);
            toast.error('Failed to update police station');
        }
    };

    return (
        <Modal show={show} onHide={() => setShow(false)} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Update Police Station</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formStationName">
                        <Form.Label>Station Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="stationName"
                            value={station.stationName}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formLocation">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            name="location"
                            value={station.location}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formContactNumber">
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control
                            type="text"
                            name="contactNumber"
                            value={station.contactNumber}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formAddressLine1">
                        <Form.Label>Address Line 1</Form.Label>
                        <Form.Control
                            type="text"
                            name="addressLine1"
                            value={station.address.addressLine1}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formAddressLine2">
                        <Form.Label>Address Line 2</Form.Label>
                        <Form.Control
                            type="text"
                            name="addressLine2"
                            value={station.address.addressLine2}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            name="city"
                            value={station.address.city}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formState">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                            type="text"
                            name="state"
                            value={station.address.state}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPinCode">
                        <Form.Label>Pin Code</Form.Label>
                        <Form.Control
                            type="text"
                            name="pinCode"
                            value={station.address.pincode}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3">
                        Update Police Station
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdatePoliceStation;
