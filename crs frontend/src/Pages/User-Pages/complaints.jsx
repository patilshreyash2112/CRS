import jailImage from "../../Images/jail-with-hands.jpg";
import NavBar from "../../Components/User-Components/navbar";
import { registerComplaint } from "../../services/User-Services/complaint";
import { Link } from "react-router-dom";
import Footer from "../../Components/User-Components/footer";
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "../../redux/protectedRoute";

function Complaints() {
    const [title, setTitle] = useState('');
    const [complaintType, setComplaintType] = useState('');
    const [complaintDescription, setComplaintDescription] = useState('');
    const [crimeDate, setCrimeDate] = useState('');
    const [suspectName, setSuspectName] = useState('');
    const [suspectAddress, setSuspectAddress] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const userId = sessionStorage.getItem("id");
    const assignedPoliceStationId = 6;
    const assignedPoliceOfficerId = 5;
    const statusName = "PENDING";
    const isDeleted = false;
    // const navigate = useNavigate();

    const onComplaintForm = async () => {
        if (!isChecked) {
            toast.warning('Please accept the terms and conditions');
            return;
        }

        // Client-side validation
        if (title.length === 0) {
            toast.warning('Enter title');
        } else if (complaintType.length === 0 || complaintType === '0') {
            toast.warning('Choose complaint Type');
        } else if (complaintDescription.length === 0) {
            toast.warning('Enter Complaint Description');
        } else if (crimeDate.length === 0) {
            toast.warning('Enter Crime Date');
        } else if (suspectName.length === 0) {
            toast.warning('Enter Suspect Name');
        } else if (suspectAddress.length === 0) {
            toast.warning('Enter Suspect Address');
        } else {
            // Create complaintDTO JSON object
            const complaintDTO = {
                title,
                complaintType,
                complaintDescription,
                crimeDate,
                suspectName,
                suspectAddress,
                userId,
                assignedPoliceStationId,
                assignedPoliceOfficerId,
                statusName,
                isDeleted
            };

            try {
                const result = await registerComplaint(complaintDTO);
                if (result.title === title) {
                    toast.success('Successfully Registered a Complaint');
                    setTitle('');
                    setComplaintType('');
                    setComplaintDescription('');
                    setCrimeDate('');
                    setSuspectName('');
                    setSuspectAddress('');
                    // navigate('/complaints');
                } else {
                    toast.error('Failed to register the complaint');
                }
            } catch (error) {
                toast.error('Error registering the complaint');
            }
        }
    }

    return (
        <>
        <ProtectedRoute>
            <NavBar />
            <div className="home-container">
                <header className="home-header">
                    <h1>Register Complaint Here</h1>
                </header>
                <section className="home-section">
                    <div className="row mb-3">
                        <div className="col-md-12">
                            <div className="card text-center">
                                <Link to="/complaints"><img src={jailImage} className="card-img-top" alt="Report Crime" /></Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="home-section">
                    <div className="home-container">
                        <div className="register mb-0 text-dark">
                            <div className="container-fluid">
                                <div>
                                    <h1 className="text-center p-3 text-light">Complaint Form</h1>
                                </div>
                                <table>
                                    <thead></thead>
                                    <tbody>
                                        <tr>
                                            <td><h6 className="text-light">Title</h6></td>
                                            <td>
                                                <div className="col form-floating">
                                                    <input 
                                                        value={title}
                                                        onChange={(e) => setTitle(e.target.value)} 
                                                        type="text" 
                                                        className="form-control" 
                                                        id="ComplaintTitle" 
                                                        placeholder="Title of Complaint" 
                                                    />
                                                    <label htmlFor="ComplaintTitle">Title of Complaint</label>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><h6 className="text-light">Complaint Type</h6></td>
                                            <td>
                                                <Form.Select 
                                                    value={complaintType} 
                                                    onChange={(e) => setComplaintType(e.target.value)}
                                                >
                                                    <option value="0">Choose from below menu</option>
                                                    <option value="ACCIDENTS">Accidents</option>
                                                    <option value="ASSAULT">Assault</option>
                                                    <option value="CREDIT_CARD_FRAUD">Credit card fraud</option>
                                                    <option value="DOMESTIC_VIOLENCE">Domestic Voilence</option>
                                                    <option value="DRUG_ACTIVITY">Drug activity</option>
                                                    <option value="FINANCIAL_CRIMES">Financial Crimes</option>
                                                    <option value="FORGERY">Forgery</option>
                                                    <option value="FRAUD">Fraud</option>
                                                    <option value="MURDER">Murder</option>
                                                    <option value="PERSONAL_CRIMES">Personal crimes</option>
                                                    <option value="PROPERTY_CRIMES">Property crimes</option>
                                                    <option value="RAPE_SEXUAL_HARASSMENT">Rape, Sexual Harrasement</option>
                                                    <option value="WEAPON_LAW_VIOLATIONS">Weapon law violations</option>
                                                    <option value="OTHER">Other (if other mention it in Description)</option>
                                                </Form.Select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><h6 className="text-light">Complaint Description</h6></td>
                                            <td>
                                                <textarea 
                                                    value={complaintDescription}
                                                    onChange={(e) => setComplaintDescription(e.target.value)} 
                                                    className="form-control" 
                                                    id="ComplaintsDescription" 
                                                    rows="2"
                                                ></textarea>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><h6 className="text-light">Crime Date</h6></td>
                                            <td>
                                                <input 
                                                    value={crimeDate}
                                                    onChange={(e) => setCrimeDate(e.target.value)} 
                                                    className="col" 
                                                    type="date" 
                                                ></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><h6 className="text-light">Suspect Name</h6></td>
                                            <td>
                                                <div className="col form-floating">
                                                    <input 
                                                        value={suspectName}
                                                        onChange={(e) => setSuspectName(e.target.value)} 
                                                        type="text" 
                                                        className="form-control" 
                                                        id="SuspectName" 
                                                        placeholder="SuspectName" 
                                                    />
                                                    <label htmlFor="ComplaintTitle">Suspect Name</label>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><h6 className="text-light">Suspect Address</h6></td>
                                            <td>
                                                <div className="col form-floating">
                                                    <input 
                                                        value={suspectAddress}
                                                        onChange={(e) => setSuspectAddress(e.target.value)} 
                                                        type="text" 
                                                        className="form-control" 
                                                        id="SuspectAddress" 
                                                        placeholder="SuspectAddress" 
                                                    />
                                                    <label htmlFor="ComplaintTitle">Suspect Address</label>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input 
                                                    type="checkbox" 
                                                    checked={isChecked} 
                                                    onChange={(e) => setIsChecked(e.target.checked)} 
                                                />
                                            </td>
                                            <td>
                                                <p className="text-light">
                                                    "I hereby register my complaint and acknowledge that I have read and accept all terms and conditions. By submitting this complaint, I agree to abide by the rules and regulations outlined. I understand that my complaint will be processed in accordance with the specified procedures. This serves as my formal acknowledgment and acceptance of the terms and conditions governing the complaint resolution process."
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className='row'>
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4">
                                        <div className="col-12 mb-5">
                                            <button onClick={onComplaintForm} className="btn btn-primary" type="submit">Register Complaint</button>
                                        </div>
                                    </div>
                                    <div className="col-md-4"></div>
                                </div>    
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
            </ProtectedRoute>
        </>
    );
}

export default Complaints;
