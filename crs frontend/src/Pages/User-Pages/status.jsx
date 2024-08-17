import React, { useState, useEffect } from 'react';
import NavBar from '../../Components/User-Components/navbar';
import track from '../../Images/track.jpg';
import Footer from '../../Components/User-Components/footer';
import { getComplaints } from '../../services/User-Services/complaint';
import { fetchPoliceOfficers, fetchPoliceStationById } from '../../services/User-Services/fetch-data';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ProtectedRoute from '../../redux/protectedRoute';

function Status() {
    const [complaints, setComplaints] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [policeStationName, setPoliceStationName] = useState('');
    const [policeOfficerName, setPoliceOfficerName] = useState('');
    const userId = sessionStorage.getItem('id'); 

    useEffect(() => {
        const fetchComplaints = async () => {
            if (userId) {
                try {
                    const data = await getComplaints(userId);
                    const complaintsWithDetails = await Promise.all(
                        data.data.map(async (complaint) => {
                            const policeStation = await fetchPoliceStationById(complaint.assignedPoliceStationId);
                            const policeOfficer = await fetchPoliceOfficers(complaint.assignedPoliceOfficerId);
                            return {
                                ...complaint,
                                policeStationName: policeStation.stationName,
                                policeOfficerName: policeOfficer.officerName,
                            };
                        })
                    );
                    setComplaints(complaintsWithDetails);
                } catch (error) {
                    console.error('Error fetching complaints:', error);
                }
            }
        };

        fetchComplaints();
    }, [userId]);

    const handleShow = (complaint) => {
        setSelectedComplaint(complaint);
        setPoliceStationName(complaint.policeStationName);
        setPoliceOfficerName(complaint.policeOfficerName);
        setShow(true);
    };

    const handleClose = () => setShow(false);

    return (
        <>
        <ProtectedRoute>
            <NavBar />
            <div className="home-container">
                <header className="home-header">
                    <h1>Track Your Complaint Here</h1>
                </header>

                <section className="home-section">
                    <div className="row mb-3">
                        <div className="col-md-12">
                            <div className="card text-center">
                                <img src={track} className="card-img-top" alt="Track Banner" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="home-section">
                    <center>
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered text-center">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Complaint Title</th>
                                        <th>Complaint Category</th>
                                        <th>Status</th>
                                        <th>Assigned Police Station</th>
                                        <th>Assigned Police Officer</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {complaints.map((complaint, index) => (
                                        <tr key={complaint.id}>
                                            <td>{index + 1}</td>
                                            <td>{complaint.title}</td>
                                            <td>{complaint.complaintType}</td>
                                            <td>{complaint.statusName}</td>
                                            <td>{complaint.policeStationName === 'Head Quarters' ? 'Not Assigned' : complaint.policeStationName}</td>
                                            <td>{complaint.policeOfficerName === 'Admin' ? 'Not Assigned' : complaint.policeOfficerName}</td>
                                            <td>
                                                <Button 
                                                    variant="outline-primary" 
                                                    onClick={() => handleShow(complaint)}
                                                    style={{ color: 'black', textDecoration: 'none' }}
                                                >
                                                    <b>VIEW DETAILS</b>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </center>
                </section>
            </div>
            <Footer />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Complaint Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedComplaint && (
                        <div>
                            <p><strong>Title:</strong> {selectedComplaint.title}</p>
                            <p><strong>Category:</strong> {selectedComplaint.complaintType}</p>
                            <p><strong>Description:</strong> {selectedComplaint.complaintDescription}</p>
                            <p><strong>Status:</strong> {selectedComplaint.statusName}</p>
                            <p><strong>Crime Date:</strong> {selectedComplaint.crimeDate}</p>
                            <p><strong>Suspect Name:</strong> {selectedComplaint.suspectName}</p>
                            <p><strong>Suspect Address:</strong> {selectedComplaint.suspectAddress}</p>
                            <p><strong>Police Station:</strong> {policeStationName === 'Head Quarters' ? 'Not Assigned' : policeStationName}</p>
                            <p><strong>Police Officer:</strong> {policeOfficerName === 'Admin' ? 'Not Assigned' : policeOfficerName}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </ProtectedRoute>
        </>
    );
}

export default Status;
