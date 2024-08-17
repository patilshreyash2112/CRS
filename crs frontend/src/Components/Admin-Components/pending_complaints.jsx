import React, { useState, useEffect } from 'react';
import { getAllComplaints, updateComplaint } from '../../services/User-Services/complaint';
import { fetchPoliceStationById, fetchUserById, fetchOfficersByStationId } from '../../services/User-Services/fetch-data';
import { fetchPoliceOfficers } from '../../services/Admin-Services/police_officer';
import { fetchPoliceStations } from '../../services/Admin-Services/police_station';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { toast } from 'react-toastify';

const PendingComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [policeStations, setPoliceStations] = useState([]);
    const [policeOfficers, setPoliceOfficers] = useState([]);
    const [selectedPoliceStationId, setSelectedPoliceStationId] = useState(null);
    const [selectedPoliceOfficerId, setSelectedPoliceOfficerId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllComplaints();
                const allPoliceStations = await fetchPoliceStations();
                setPoliceStations(allPoliceStations);

                const updatedComplaints = await Promise.all(
                    data
                        .filter(complaint => complaint.statusName.toLowerCase() === 'pending')
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

        fetchData();
    }, []);

    const handleShow = (complaint) => {
        setSelectedComplaint(complaint);
        setShow(true);
    };

    const handleClose = () => setShow(false);

    const handleAssignStation = async (complaint) => {
        try {
            // console.log('Selected Police Station ID:', selectedPoliceStationId);
            // console.log('Complaint ID:', complaint.id);

            const updatedComplaint = {
                ...complaint,
                assignedPoliceStationId: selectedPoliceStationId,
                statusName: 'ASSIGNED'
            };
            await updateComplaint(complaint.id, updatedComplaint);
            toast.success('Police station assigned successfully.');

            // Fetch updated list of officers in the selected police station
            const officers = await fetchOfficersByStationId(selectedPoliceStationId);
            setPoliceOfficers(officers);

            // Update the complaints list
            setComplaints(prevComplaints => prevComplaints.map(c => c.id === complaint.id ? updatedComplaint : c));
        } catch (error) {
            console.error('Error assigning police station:', error);
            toast.error('Error assigning police station.');
        }
    };
    // eslint-disable-next-line
    const handleAssignOfficer = async (complaint) => {
        try {
            console.log('Selected Police Officer ID:', selectedPoliceOfficerId);
            console.log('Complaint ID:', complaint.id);

            const updatedComplaint = {
                ...complaint,
                assignedPoliceOfficerId: selectedPoliceOfficerId
            };
            await updateComplaint(complaint.id, updatedComplaint);
            toast.success('Police officer assigned successfully.');

            // Update the complaints list
            setComplaints(prevComplaints => prevComplaints.map(c => c.id === complaint.id ? updatedComplaint : c));
        } catch (error) {
            console.error('Error assigning police officer:', error);
            toast.error('Error assigning police officer.');
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
                                <th>Location</th>
                                <th>Status</th>
                                <th>Assign Police Station</th>
                                {/* <th>Assign Police Officer</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {complaints.map((complaint, index) => (
                                <tr key={complaint.id}>
                                    <td onClick={() => handleShow(complaint)} style={{ cursor: 'pointer' }}>{index + 1}</td>
                                    <td onClick={() => handleShow(complaint)} style={{ cursor: 'pointer' }}>{complaint.title}</td>
                                    <td onClick={() => handleShow(complaint)} style={{ cursor: 'pointer' }}>{complaint.complaintType}</td>
                                    <td onClick={() => handleShow(complaint)} style={{ cursor: 'pointer' }}>{complaint.crimeDate}</td>
                                    <td onClick={() => handleShow(complaint)} style={{ cursor: 'pointer' }}>{complaint.location}</td>
                                    <td onClick={() => handleShow(complaint)} style={{ cursor: 'pointer' }}>{complaint.statusName}</td>
                                    <td>
                                        <select onChange={(e) => setSelectedPoliceStationId(e.target.value)} disabled={complaint.statusName !== 'PENDING'}>
                                            <option value="">Select Police Station</option>
                                            {policeStations.map(station => (
                                                <option key={station.id} value={station.id}>{station.stationName}</option>
                                            ))}
                                        </select>
                                        
                                        <Button variant="outline-success" onClick={() => handleAssignStation(complaint)} disabled={!selectedPoliceStationId || complaint.statusName !== 'PENDING'}>
                                            Assign
                                        </Button>
                                    </td>
                                    {/* <td>
                                        <select onChange={(e) => setSelectedPoliceOfficerId(e.target.value)} disabled={complaint.statusName !== 'assigned'}>
                                            <option value="">Select Police Officer</option>
                                            {policeOfficers.map(officer => (
                                                <option key={officer.id} value={officer.id}>{officer.officerName}</option>
                                            ))}
                                        </select>
                                        <Button variant="outline-success" onClick={() => handleAssignOfficer(complaint)} disabled={!selectedPoliceOfficerId || complaint.statusName !== 'assigned'}>
                                            Assign
                                        </Button>
                                    </td> */}
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

export default PendingComplaints;
