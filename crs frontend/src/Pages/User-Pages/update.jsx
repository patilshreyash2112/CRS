import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../../Components/User-Components/navbar';
import Footer from '../../Components/User-Components/footer';
import { getComplaintById, updateComplaint } from '../../services/User-Services/complaint';

const UpdateComplaint = () => {
    const [title, setTitle] = useState('');
    const [complaintType, setComplaintType] = useState('');
    const [complaintDescription, setComplaintDescription] = useState('');
    const [crimeDate, setCrimeDate] = useState('');
    const [suspectName, setSuspectName] = useState('');
    const [suspectAddress, setSuspectAddress] = useState('');
    const [imageProof, setImageProof] = useState(null);

    const { complaintId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchComplaintDetails = async () => {
            try {
                const complaint = await getComplaintById(complaintId);
                setTitle(complaint.title);
                setComplaintType(complaint.complaintType);
                setComplaintDescription(complaint.complaintDescription);
                setCrimeDate(complaint.crimeDate);
                setSuspectName(complaint.suspectName);
                setSuspectAddress(complaint.suspectAddress);
                setImageProof(complaint.imageProof); // Assuming it's a URL or base64 data
            } catch (error) {
                console.error('Error fetching complaint details:', error);
            }
        };

        fetchComplaintDetails();
    }, [complaintId]);

    const handleFileChange = (event) => {
        setImageProof(event.target.files[0]); // Set the file object
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const complaintData = {
            title,
            complaintType,
            complaintDescription,
            crimeDate,
            suspectName,
            suspectAddress,
            imageProof
        };

        try {
            await updateComplaint(complaintId, complaintData);
            navigate('/status'); // Redirect to the status page after successful update
        } catch (error) {
            console.error('Error updating complaint:', error);
        }
    };

    return (
        <>
            <NavBar />
            <div className="home-container">
                <header className="home-header">
                    <h1>Update Complaint</h1>
                </header>

                <section className="home-section">
                    <div className="row mb-3">
                        <div className="col-md-12">
                            <div className="card text-center">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="title">Title</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="title"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="complaintType">Complaint Type</label>
                                            <select
                                                id="complaintType"
                                                className="form-control"
                                                value={complaintType}
                                                onChange={(e) => setComplaintType(e.target.value)}
                                                required
                                            >
                                                <option value="">Select</option>
                                                <option value="1">Accidents</option>
                                                <option value="2">Assault</option>
                                                <option value="3">Credit card fraud</option>
                                                <option value="4">Domestic Violence</option>
                                                <option value="5">Drug activity</option>
                                                <option value="6">Financial Crimes</option>
                                                <option value="7">Forgery</option>
                                                <option value="8">Fraud</option>
                                                <option value="9">Murder</option>
                                                <option value="10">Personal crimes</option>
                                                <option value="11">Property crimes</option>
                                                <option value="12">Rape, Sexual Harassment</option>
                                                <option value="13">Weapon law violations</option>
                                                <option value="14">Other</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="complaintDescription">Description</label>
                                            <textarea
                                                className="form-control"
                                                id="complaintDescription"
                                                value={complaintDescription}
                                                onChange={(e) => setComplaintDescription(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="crimeDate">Crime Date</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="crimeDate"
                                                value={crimeDate}
                                                onChange={(e) => setCrimeDate(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="suspectName">Suspect Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="suspectName"
                                                value={suspectName}
                                                onChange={(e) => setSuspectName(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="suspectAddress">Suspect Address</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="suspectAddress"
                                                value={suspectAddress}
                                                onChange={(e) => setSuspectAddress(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="imageProof">Image Proof</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="imageProof"
                                                onChange={handleFileChange}
                                            />
                                        </div>

                                        <button type="submit" className="btn btn-primary">Update Complaint</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default UpdateComplaint;
