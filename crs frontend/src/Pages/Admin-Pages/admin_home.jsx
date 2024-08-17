import AdminNavBar from "../../Components/Admin-Components/admin_navbar";
import Footer from "../../Components/User-Components/footer";
import HomeImage from '../../Images/admin-home.jpg'
import { Link } from "react-router-dom";
import AdminHomeProtection from "./admin_Protection";

function AdminHome(){
    return(
        <>
        <AdminHomeProtection>
        <AdminNavBar/>

        <div className="home-container">
                <header className="home-header">
                    <h1>Crime Management System</h1>
                </header>


                <section className="home-section">
                    <div className="row mb-3">

                        <div className="col-md-12">
                            <div className="card text-center">
                                <Link to="/admin-home"><img src={HomeImage} className="card-img-top" alt="Report Crime" /></Link>

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

        </div>

        <Footer/>
        </AdminHomeProtection>
        </>
    );
}

export default AdminHome