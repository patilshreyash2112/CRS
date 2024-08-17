import { useState } from "react";
import AdminNavBar from "../../Components/Admin-Components/admin_navbar";
import StatusComponent from "../../Components/Admin-Components/status_components";
import Footer from "../../Components/User-Components/footer";
import RenderComponent from "../../Components/Admin-Components/render_complaint_component";
import { Link } from "react-router-dom";
import banner from '../../Images/3rdHome.jpg';
import AdminHomeProtection from './admin_Protection';

const button = [
    'All', 'Assigned', 'Pending'
]

function AdminComplaints(){
    const [isSelected, setIsSelected] = useState(0)
    return(
        <>
    <AdminHomeProtection>
    <AdminNavBar/>

    <div className="home-container">
        <header className="home-header">
            <h1>Complaints</h1>
        </header>

        <section className="home-section">
                    <div className="row mb-3">

                        <div className="col-md-12">
                            <div className="card text-center">
                                <Link to="/admin-home"><img src={banner} className="card-img-top" alt="Report Crime" /></Link>

                            </div>
                        </div>
                    </div>
                    </section>    
        <section className="home-section">
            
            {/* Buttons for pending and assigned */}
            {/* <div className="row mb-3">
            <div className="col-md-4">
            <button type="button" class="btn btn-outline-info">All</button>
            </div>
            <div className="col-md-4">
            <button type="button" class="btn btn-outline-info">Assigned</button>
            </div>
            <div className="col-md-4">
            <button type="button" class="btn btn-outline-info">Pending</button>
            </div>
            </div> */}
            <StatusComponent buttons={button} isSelected={isSelected} setIsSelected={setIsSelected}/>
            <RenderComponent index={isSelected}/>    

            <div className="row mb-3">
                <div className="col-md-12">
                    <div className="card text-center">
                         
                        {/* <Link to="/complaints"><img src={jailImage} className="card-img-top" alt="Report Crime" /></Link> */}

                    </div>
                </div>
            </div>
        </section>
    </div>

    <Footer/>
    </AdminHomeProtection>           
    </>
    );
}
export default AdminComplaints