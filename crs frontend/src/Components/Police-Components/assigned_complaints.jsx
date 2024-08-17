import React, { useState, useEffect } from 'react';
import { getAllComplaintsOfPoliceStations, updateComplaint } from '../../services/User-Services/complaint';
import { fetchOfficersByStationId, fetchUserById, fetchPoliceOfficers, fetchPoliceStationById } from '../../services/User-Services/fetch-data';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';

const AssignOfficer = () => {
    const [complaints, setComplaints] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [officers, setOfficers] = useState([]);
    const [selectedOfficer, setSelectedOfficer] = useState({});

    useEffect(() => {
        const fetchComplaints = async () => {
            const policeStationId = sessionStorage.getItem('policeStationId');
            try {
                const data = await getAllComplaintsOfPoliceStations(policeStationId);
                const filteredData = data.filter(complaint => complaint.statusName.toLowerCase() === 'assigned');
                const updatedComplaints = await Promise.all(
                    filteredData.map(async (complaint) => {
                        const user = await fetchUserById(complaint.userId);
                        const officer = complaint.assignedPoliceOfficerId ? await fetchPoliceOfficers(complaint.assignedPoliceOfficerId) : null;
                        const station = complaint.assignedPoliceStationId ? await fetchPoliceStationById(complaint.assignedPoliceStationId) : null;
                        return {
                            ...complaint,
                            location: user.address.city,
                            assignedPoliceOfficerName: officer ? officer.officerName : 'Not Assigned',
                            assignedPoliceStationName: station ? station.stationName : 'Not Assigned',
                        };
                    })
                );

                setComplaints(updatedComplaints);

                // Fetch police officers of the same station
                const officersData = await fetchOfficersByStationId(policeStationId);
                setOfficers(officersData);
            } catch (error) {
                console.error('Error fetching complaints:', error);
                toast.error('Error fetching complaints.');
            }
        };

        fetchComplaints();
    }, []);

    const handleShow = (complaint) => {
        setSelectedComplaint(complaint);
        setSelectedOfficer({});
        setShow(true);
    };

    const handleClose = () => setShow(false);

    const handleOfficerChange = (event, complaintId) => {
        const officerId = event.target.value;
        setSelectedOfficer((prev) => ({
            ...prev,
            [complaintId]: officerId,
        }));
    };

    const handleAssignOfficer = async (complaint) => {
        try {
            const officerId = selectedOfficer[complaint.id];
            const updatedComplaint = {
                ...complaint,
                assignedPoliceOfficerId: officerId,
                statusName: 'INVESTIGATION',
            };
            await updateComplaint(complaint.id, updatedComplaint);
            toast.success('Officer assigned and status updated successfully.');

            // Refresh complaints data
            const policeStationId = sessionStorage.getItem('policeStationId');
            const updatedComplaints = await getAllComplaintsOfPoliceStations(policeStationId);
            setComplaints(updatedComplaints);
            handleClose();
        } catch (error) {
            console.error('Error assigning officer:', error);
            toast.error('Error assigning officer.');
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
                                <th>Assigned Officer</th>
                                <th>Assign Officer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {complaints.map((complaint, index) => (
                                <tr key={complaint.id}>
                                    <td>{index + 1}</td>
                                    <td onClick={() => handleShow(complaint)} style={{ cursor: 'pointer' }}>{complaint.title}</td>
                                    <td onClick={() => handleShow(complaint)} style={{ cursor: 'pointer' }}>{complaint.complaintType}</td>
                                    <td onClick={() => handleShow(complaint)} style={{ cursor: 'pointer' }}>
                                        {complaint.assignedPoliceOfficerName === 'Admin' ? 'Not Assigned' : complaint.assignedPoliceOfficerName}
                                    </td>
                                    <td>
                                        <Form.Select 
                                            value={selectedOfficer[complaint.id] || ''} 
                                            onChange={(e) => handleOfficerChange(e, complaint.id)}
                                        >
                                            <option value="">Select Officer</option>
                                            {officers.map((officer) => (
                                                <option key={officer.id} value={officer.id}>
                                                    {officer.officerName}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        <Button 
                                            variant="outline-success" 
                                            onClick={() => handleAssignOfficer(complaint)}
                                            disabled={!selectedOfficer[complaint.id]}
                                            className="mt-2"
                                        >
                                            Assign
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
                                        {selectedComplaint.assignedPoliceStationName}
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

export default AssignOfficer;
