import React, { useState, useEffect } from 'react';
import { getAllComplaintsOfPoliceStations, updateComplaint } from '../../services/User-Services/complaint';
import { fetchPoliceStationById, fetchPoliceOfficers, fetchUserById } from '../../services/User-Services/fetch-data';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';

const ChangeStatus = () => {
    const [complaints, setComplaints] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState({});

    useEffect(() => {
        const fetchComplaints = async () => {
            const policeStationId = sessionStorage.getItem('policeStationId');
            try {
                const data = await getAllComplaintsOfPoliceStations(policeStationId);
                const updatedComplaints = await Promise.all(
                    data
                        .filter(complaint => complaint.statusName.toLowerCase() !== 'assigned' && complaint.statusName.toLowerCase() !== 'pending')
                        .map(async (complaint) => {
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

    const handleStatusChange = (event, complaintId) => {
        const status = event.target.value;
        setSelectedStatus((prev) => ({
            ...prev,
            [complaintId]: status,
        }));
    };

    const handleChangeStatus = async (complaint) => {
        try {
            const statusName = selectedStatus[complaint.id];
            const updatedComplaint = {
                ...complaint,
                statusName: statusName,
            };
            await updateComplaint(complaint.id, updatedComplaint);
            toast.success('Status updated successfully.');

            // Refresh complaints data
            const policeStationId = sessionStorage.getItem('policeStationId');
            const updatedComplaints = await getAllComplaintsOfPoliceStations(policeStationId);
            setComplaints(updatedComplaints);
        } catch (error) {
            console.error('Error changing status:', error);
            toast.error('Error changing status.');
        }
    };

    return (
        <div>
            <center>
                <div className="blinking-warning mt-5">
                    Click On Complaint To See Details
                </div>
                <div className="table-responsive">
                    <table className="table table-striped table-bordered text-center">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Title</th>
                                <th>Complaint Type</th>
                                <th>Date Of Crime</th>
                                <th>Assigned Officer</th>
                                <th>Status</th>
                                <th>Change Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {complaints.map((complaint, index) => (
                                <tr key={complaint.id}>
                                    <td>{index + 1}</td>
                                    <td onClick={() => handleShow(complaint)} style={{ cursor: 'pointer' }}>{complaint.title}</td>
                                    <td onClick={() => handleShow(complaint)} style={{ cursor: 'pointer' }}>{complaint.complaintType}</td>
                                    <td onClick={() => handleShow(complaint)} style={{ cursor: 'pointer' }}>{complaint.crimeDate}</td>
                                    <td onClick={() => handleShow(complaint)} style={{ cursor: 'pointer' }}>
                                        {complaint.assignedPoliceOfficerName === 'Admin' ? 'Not Assigned' : complaint.assignedPoliceOfficerName}
                                    </td>
                                    <td onClick={() => handleShow(complaint)} style={{ cursor: 'pointer' }}>{complaint.statusName}</td>
                                    <td>
                                        <Form.Select 
                                            value={selectedStatus[complaint.id] || ''} 
                                            onChange={(e) => handleStatusChange(e, complaint.id)}
                                        >
                                            <option value="">Select Status</option>
                                            <option value="INVESTIGATION">INVESTIGATION</option>
                                            <option value="SOLVED">SOLVED</option>
                                            <option value="CLOSED">CLOSED</option>
                                        </Form.Select>
                                        <Button 
                                            variant="outline-success" 
                                            onClick={() => handleChangeStatus(complaint)}
                                            disabled={!selectedStatus[complaint.id]}
                                            className="mt-2"
                                        >
                                            Change
                                        </Button>
                                    </td>
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

export default ChangeStatus;
