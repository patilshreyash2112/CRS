import jailImage from "../../Images/2ndhome.jpg"
import NavBar from "../../Components/User-Components/navbar";
import { Link } from "react-router-dom";
import CrimeCardReport from "../../Images/CrimeCardReport.png"
import CrimeCardStatus from "../../Images/CrimeCardStatus.jpeg"
import CrimeCardHistory from "../../Images/CrimeCardHistory.jpg"
import Footer from "../../Components/User-Components/footer";
import ContactInfo from "../../Components/User-Components/contactInfo";

function Home() {
    return (
        <>
            <NavBar />
            <div className="home-container">
                <header className="home-header">
                    <h1>Crime Management System</h1>
                </header>


                <section className="home-section">
                    <div className="row mb-3">

                        <div className="col-md-12">
                            <div className="card text-center">
                                <Link to="/home"><img src={jailImage} className="card-img-top" alt="Report Crime" /></Link>

                            </div>
                        </div>
                    </div>
                    
                    <h2>Overview</h2>
                    <p className="justified">
                        The Crime Management System (CMS) is a state-of-the-art platform designed to assist law enforcement agencies
                        in effectively tracking, managing, and analyzing crime data. Our system provides comprehensive tools for crime
                        reporting, investigation management, and statistical analysis, helping to enhance public safety and streamline
                        law enforcement operations.
                    </p>
                    <p className="justified">
                        CMS enables officers to quickly and accurately report crimes, manage ongoing investigations, and track case progress.
                        Advanced analytics provide insights into crime patterns and trends, aiding in strategic decision-making and resource allocation.
                    </p>
                    <p className="justified">
                        Our platform also facilitates collaboration between different law enforcement agencies, ensuring a unified and coordinated
                        approach to combating crime. Community alert and notification features keep the public informed about recent incidents
                        and safety information.
                    </p>
                    <p className="justified">
                        With a user-friendly interface and robust security measures, CMS is an essential tool for modern law enforcement,
                        providing the necessary infrastructure to protect and serve the community effectively.
                    </p>
                </section>


                <section className="home-section">

                    <h2>Services</h2>

                    <div className="row mt-2">

                        <div className="col-md-4 p-5">
                            <div className="card text-center">
                                <Link to="/complaints"><img src={CrimeCardReport} className="card-img-top" alt="Report Crime" /></Link>
                                <div className="card-body">
                                    <h5 className="card-title text-center">Report</h5>
                                    <p className="card-text">You can report crime here</p>
                                    <Link to="/complaints" className="btn btn-primary">Report</Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 p-5">
                            <div className="card text-center">
                                <Link to="/status"><img src={CrimeCardStatus} className="card-img-top" alt="Crime Status" /></Link>
                                <div className="card-body">
                                    <h5 className="card-title text-center">Track</h5>
                                    <p className="card-text">Track your Complaint Here </p>
                                    <Link to="/status" className="btn btn-primary">Track</Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 p-5">
                            <div className="card text-center">
                                <Link to="/history"><img src={CrimeCardHistory} className="card-img-top" alt="Crimes History" /></Link>
                                <div className="card-body">
                                    <h5 className="card-title text-center">History</h5>
                                    <p className="card-text">You can see update detials here</p>
                                    <Link to="/history" className="btn btn-primary">History</Link>
                                </div>
                            </div>
                        </div>

                    </div>

                </section>

            <ContactInfo/>

                


                <Footer />
            </div>

        </>
    )
}
export default Home;