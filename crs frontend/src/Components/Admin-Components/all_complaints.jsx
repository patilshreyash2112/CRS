import React, { useState, useEffect } from 'react';
import { getAllComplaints } from '../../services/User-Services/complaint';
import { fetchPoliceStationById, fetchPoliceOfficers, fetchUserById } from '../../services/User-Services/fetch-data';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { toast } from 'react-toastify';

const AllComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedComplaint, setSelectedComplaint] = useState(null);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const data = await getAllComplaints();
                // Fetch additional details
                const updatedComplaints = await Promise.all(
                    data.map(async (complaint) => {
                        const policeStation = await fetchPoliceStationById(complaint.assignedPoliceStationId);
                        const policeOfficer = await fetchPoliceOfficers(complaint.assignedPoliceOfficerId);
                        const user = await fetchUserById(complaint.userId);

                        return {
                            ...complaint,
                            assignedPoliceStationName: policeStation.stationName,
                            assignedPoliceOfficerName: policeOfficer.officerName,
                            location: user.address.city,
                        };
                    })
                );

                setComplaints(updatedComplaints);
            } catch (error) {
                console.error('Error fetching complaints:', error);
                toast.error('Error fetching complaints.');
            }
        };

        fetchComplaints();
    }, []);

    const handleShow = (complaint) => {
        setSelectedComplaint(complaint);
        setShow(true);
    };

    const handleClose = () => setShow(false);

    return (
        <div>
            <center>
            <div className="blinking-warning mt-5">
                           Click On Complaint To See Deails
                        </div>
                <div className="table-responsive">
                    <table className="table table-striped table-bordered text-center">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Title</th>
                                <th>Complaint Type</th>
                                <th>Date Of Crime</th>
                                <th>Location</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {complaints.map((complaint, index) => (
                                <tr key={complaint.id} onClick={() => handleShow(complaint)} style={{ cursor: 'pointer' }}>
                                    <td>{index + 1}</td>
                                    <td>{complaint.title}</td>
                                    <td>{complaint.complaintType}</td>
                                    <td>{complaint.crimeDate}</td>
                                    <td>{complaint.location}</td>
                                    <td>{complaint.statusName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </center>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Complaint Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedComplaint && (
                        <Container>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{selectedComplaint.title}</Card.Title>
                                    <Card.Text><strong>Type:</strong> {selectedComplaint.complaintType}</Card.Text>
                                    <Card.Text><strong>Description:</strong> {selectedComplaint.complaintDescription}</Card.Text>
                                    <Card.Text><strong>Date of Crime:</strong> {selectedComplaint.crimeDate}</Card.Text>
                                    <Card.Text><strong>Suspect Name:</strong> {selectedComplaint.suspectName}</Card.Text>
                                    <Card.Text><strong>Suspect Address:</strong> {selectedComplaint.suspectAddress}</Card.Text>
                                    <Card.Text><strong>Location:</strong> {selectedComplaint.location}</Card.Text>
                                    <Card.Text><strong>Status:</strong> {selectedComplaint.statusName}</Card.Text>
                                    <Card.Text>
                                        <strong>Assigned Police Station:</strong> 
                                        {selectedComplaint.assignedPoliceStationName === 'Head Quarters' ? 'Not Assigned' : selectedComplaint.assignedPoliceStationName}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Assigned Police Officer:</strong> 
                                        {selectedComplaint.assignedPoliceOfficerName === 'Admin' ? 'Not Assigned' : selectedComplaint.assignedPoliceOfficerName}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Container>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AllComplaints;
