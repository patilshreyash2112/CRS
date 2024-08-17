import React, { useEffect, useState } from 'react';
import AdminNavBar from "../../Components/Admin-Components/admin_navbar";
import Footer from "../../Components/User-Components/footer";
import { getAllContactInformation } from '../../services/User-Services/contact'; 
import AdminHomeProtection from './admin_Protection';

function AdminInquires() {
    const [contactInfos, setContactInfos] = useState([]);

    useEffect(() => {
        const fetchContactInfos = async () => {
            try {
                const data = await getAllContactInformation();
                setContactInfos(data);
            } catch (error) {
                console.error('Error fetching contact information:', error);
            }
        };

        fetchContactInfos();
    }, []);

    return (
        <>
        <AdminHomeProtection>
            <AdminNavBar />

            <div className="home-container">
                <header className="home-header">
                    <h1>Inquiries</h1>
                </header>

                <section className="home-section">
                    <div className="row mb-3">
                        <div className="col-md-12">
                            <div className="card text-center">
                                {/* <Link to="/complaints"><img src={jailImage} className="card-img-top" alt="Report Crime" /></Link> */}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="home-section">
                    <div>
                        <center>
                            <div className="table-responsive">
                                <table className="table table-striped table-bordered text-center">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Reason Of Contact</th>
                                            <th>Contact Number</th>
                                            <th>Email</th>                        
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contactInfos.map((contactInfo, index) => (
                                            <tr key={contactInfo.id}>
                                                <td>{`${contactInfo.firstName} ${contactInfo.lastName}`}</td>
                                                <td>{contactInfo.reasonOfContact}</td>
                                                <td>{contactInfo.contactNumber}</td>
                                                <td>{contactInfo.emailAddress}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </center>
                    </div>
                </section>
            </div>

            <Footer />
            </AdminHomeProtection>
        </>
    );
}

export default AdminInquires;
