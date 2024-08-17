import React, { useState, useEffect } from 'react';
import NavBar from '../../Components/User-Components/navbar';
import historyBanner from '../../Images/history.png';
import Footer from '../../Components/User-Components/footer';
import { getComplaints, deleteComplaint, updateComplaint } from '../../services/User-Services/complaint';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { toast} from "react-toastify";
import ProtectedRoute from '../../redux/protectedRoute';

function History() {
    const [complaints, setComplaints] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [editFormData, setEditFormData] = useState({
        title: '',
        complaintType: '',
        complaintDescription: '',
        crimeDate: '',
        suspectName: '',
        suspectAddress: ''
    });
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [complaintToDelete, setComplaintToDelete] = useState(null);
    const userId = sessionStorage.getItem('id'); 

    useEffect(() => {
        const fetchComplaints = async () => {
            if (userId) {
                try {
                    const data = await getComplaints(userId);
                    setComplaints(data.data);
                } catch (error) {
                    console.error('Error fetching complaints:', error);
                }
            }
        };

        fetchComplaints();
    }, [userId]);

    const handleShow = (complaint) => {
        setSelectedComplaint(complaint);
        setEditFormData({
            title: complaint.title,
            complaintType: complaint.complaintType,
            complaintDescription: complaint.complaintDescription,
            crimeDate: complaint.crimeDate,
            suspectName: complaint.suspectName,
            suspectAddress: complaint.suspectAddress
        });
        setShow(true);
    };

    const handleClose = () => setShow(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({
            ...editFormData,
            [name]: value
        });
    };

    const validateForm = () => {
        let isValid = true;
        Object.keys(editFormData).forEach(key => {
            if (!editFormData[key]) {
                toast.warning(`Please enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
                isValid = false;
            }
        });
        return isValid;
    };

    const handleSave = async () => {
        if (!validateForm()) return;

        try {
            await updateComplaint(selectedComplaint.id, {
                ...editFormData,
                userId: selectedComplaint.userId,
                assignedPoliceStationId: selectedComplaint.assignedPoliceStationId,
                assignedPoliceOfficerId: selectedComplaint.assignedPoliceOfficerId,
                statusName: selectedComplaint.statusName,
                isDeleted: selectedComplaint.isDeleted
            });
            toast.success('Successfully Updated Complaint !!');
            setComplaints(complaints.map((complaint) => 
                complaint.id === selectedComplaint.id ? { ...complaint, ...editFormData } : complaint
            ));
            handleClose();
        } catch (error) {
            toast.error('Error updating complaint');
            console.error('Error updating complaint:', error);
        }
    };

    const handleDeleteClick = (complaint) => {
        if (complaint.statusName.toLowerCase() !== 'pending') {
            setShowDeleteWarning(true);
            setComplaintToDelete(complaint);
        } else {
            setComplaintToDelete(complaint);
            setShowDeleteWarning(true);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteComplaint(complaintToDelete.id);
            toast.success('Successfully Deleted Complaint');
            setComplaints(complaints.filter(complaint => complaint.id !== complaintToDelete.id));
            setShowDeleteWarning(false);
        } catch (error) {
            toast.error('Error deleting complaint');
            console.error('Error deleting complaint:', error);
        }
    };

    return (
        <>
        <ProtectedRoute>
            <NavBar />
            <div className="home-container">
                <header className="home-header">
                    <h1>Previous Complaints</h1>
                </header>

                <section className="home-section">
                    <div className="row mb-3">
                        <div className="col-md-12">
                            <div className="card text-center">
                                <img src={historyBanner} className="card-img-top" alt="History Banner" />
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
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {complaints.map((complaint, index) => (
                                        <tr key={complaint.id}>
                                            <td>{index + 1}</td>
                                            <td>{complaint.title}</td>
                                            <td>{complaint.complaintType}</td>
                                            <td>
                                                <button
                                                    className="btn btn-warning"
                                                    onClick={() => handleShow(complaint)}
                                                    disabled={complaint.statusName.toLowerCase() !== 'pending'}
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => handleDeleteClick(complaint)}
                                                    disabled={complaint.statusName.toLowerCase() !== 'pending'}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="blinking-warning">
                            You can delete and edit the complaint only if status is "Pending".
                        </div>
                        </div>
                    </center>
                </section>
            </div>
            <Footer />

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Complaint</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedComplaint && (
                        <Container>
                            <Card>
                                <Card.Body>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="title"
                                                value={editFormData.title}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Category</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="complaintType"
                                                value={editFormData.complaintType}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="complaintDescription"
                                                value={editFormData.complaintDescription}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Crime Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="crimeDate"
                                                value={editFormData.crimeDate}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Suspect Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="suspectName"
                                                value={editFormData.suspectName}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Suspect Address</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="suspectAddress"
                                                value={editFormData.suspectAddress}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Container>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal show={showDeleteWarning} onHide={() => setShowDeleteWarning(false)} centered>
    <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        {complaintToDelete && (
            <>
                <p>Are you sure you want to delete the following complaint?</p>
                <ul>
                    <li><strong>Title:</strong> {complaintToDelete.title}</li>
                    <li><strong>Category:</strong> {complaintToDelete.complaintType}</li>
                    <li><strong>Description:</strong> {complaintToDelete.complaintDescription}</li>
                    <li><strong>Crime Date:</strong> {complaintToDelete.crimeDate}</li>
                    <li><strong>Suspect Name:</strong> {complaintToDelete.suspectName}</li>
                    <li><strong>Suspect Address:</strong> {complaintToDelete.suspectAddress}</li>
                </ul>
            </>
        )}
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowDeleteWarning(false)}>
            Close
        </Button>
        <Button variant="danger" onClick={handleDelete}>
            Delete Complaint
        </Button>
    </Modal.Footer>
</Modal>
</ProtectedRoute>
 </>
    );
}
export default History;