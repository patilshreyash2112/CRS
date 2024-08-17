import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../../Components/User-Components/navbar';
import Footer from '../../Components/User-Components/footer';
import config from '../../config'; // Adjust import based on your project structure

const ComplaintDetails = ({ complaintId }) => {
    const [complaintDetails, setComplaintDetails] = useState(null);

    useEffect(() => {
        const fetchComplaintDetails = async () => {
            try {
                const response = await axios.get(`${config.url}/user/complaint/${complaintId}`);
                setComplaintDetails(response.data);
            } catch (error) {
                console.error('Error fetching complaint details:', error);
            }
        };

        fetchComplaintDetails();
    }, [complaintId]);

    if (!complaintDetails) {
        return <div>
        <NavBar />
        <div className="home-container">
                <header className="home-header">
                    <h1>Complaint Details</h1>
                </header>
        </div>
        Loading...
        <Footer/>
        </div>
        ;
    }

    return (
        <div>
            <NavBar />
            <div className="home-container">
                <header className="home-header">
                    <h1>Complaint Details</h1>
                </header>

                <section className="home-section">
                    <div className="row mb-3">
                        <div className="col-md-12">
                            <div className="card text-center">
                                <div className="table-responsive">
                                    <table className="table table-striped table-bordered text-center">
                                        <thead>
                                            <tr>
                                                <th>Sr. No</th>
                                                <th>Titles</th>
                                                <th>Descriptions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Complaint ID</td>
                                                <td>{complaintDetails.id}</td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Registered By</td>
                                                <td>{complaintDetails.registeredBy}</td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>Registered At</td>
                                                <td>{new Date(complaintDetails.registeredAt).toLocaleString()}</td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>Title</td>
                                                <td>{complaintDetails.title}</td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td>Type</td>
                                                <td>{complaintDetails.type}</td>
                                            </tr>
                                            <tr>
                                                <td>6</td>
                                                <td>Details</td>
                                                <td>{complaintDetails.details}</td>
                                            </tr>
                                            <tr>
                                                <td>7</td>
                                                <td>Crime Date</td>
                                                <td>{new Date(complaintDetails.crimeDate).toLocaleDateString()}</td>
                                            </tr>
                                            <tr>
                                                <td>8</td>
                                                <td>Location</td>
                                                <td>{complaintDetails.location}</td>
                                            </tr>
                                            <tr>
                                                <td>9</td>
                                                <td>Suspect Name</td>
                                                <td>{complaintDetails.suspectName}</td>
                                            </tr>
                                            <tr>
                                                <td>10</td>
                                                <td>Suspect Address</td>
                                                <td>{complaintDetails.suspectAddress}</td>
                                            </tr>
                                            <tr>
                                                <td>11</td>
                                                <td>Proof</td>
                                                <td>
                                                    {complaintDetails.proof && (
                                                        <a href={complaintDetails.proof} target="_blank" rel="noopener noreferrer">
                                                            View Proof
                                                        </a>
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>12</td>
                                                <td>Status</td>
                                                <td>{complaintDetails.status}</td>
                                            </tr>
                                            <tr>
                                                <td>13</td>
                                                <td>Assigned To</td>
                                                <td>{complaintDetails.assignedTo}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default ComplaintDetails;
