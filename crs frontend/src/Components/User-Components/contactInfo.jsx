import { Link } from "react-router-dom";
import HeadQuarter from '../../Images/policeHeadQuarters.jpg'
import Station from '../../Images/policeStation.jpg'
import CrimeBranch from '../../Images/policeCrimeBranch.jpg'

function ContactInfo() {
    return (
        <>
        
            <section className="home-section">

                <h2>Emergency Contact Numbers</h2>

                <div className="row mt-2">

                    <div className="col-md-4 p-5">
                        <div className="card text-center">

                            <div className="card-body">
                                <p className="card-text">
                                    Citizen Wall : 103
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 p-5">
                        <div className="card text-center">

                            <div className="card-body">
                                <p className="card-text">
                                    Control Room : 100
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 p-5">
                        <div className="card text-center">

                            <div className="card-body">
                                <p className="card-text">
                                    Elder Line : 1090
                                </p>
                            </div>
                        </div>
                    </div>



                </div>



            </section>

            <section className="home-section">

                <h2>Contact Us</h2>

                <div className="row mt-2">

                    <div className="col-md-4 p-5">
                        <div className="card text-center">
                            <Link to="/contact"><img src={Station} className="card-img-top" alt="Police Station" /></Link>
                            <div className="card-body">
                                <h5 className="card-title text-center">Police Station</h5>
                                <p className="card-text">HPRQ+JGH, Hinjawadi Phase 2 Rd, Hinjawadi Village, Hinjawadi, Pimpri-Chinchwad, Maharashtra 411057</p>
                                <a href="https://maps.app.goo.gl/RfacZawRbBnoiris7" className="btn btn-outline-danger" target="_blank" rel="noopener noreferrer">Location</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 p-5">
                        <div className="card text-center">
                            <Link to="/contact"><img src={HeadQuarter} className="card-img-top" alt="HeadQuarters" /></Link>
                            <div className="card-body">
                                <h5 className="card-title text-center"> Police Headquarters</h5>
                                <p className="card-text">WRGM+38J, Chhatrapati Shivaji Maharaj Marg, Colaba, Mumbai, Maharashtra 400001 </p>
                                <a href="https://maps.app.goo.gl/7fv7aSpD5s2z6ySs8" className="btn btn-outline-danger" target="_blank" rel="noopener noreferrer">Location</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 p-5">
                        <div className="card text-center">
                            <Link to="/contact"><img src={CrimeBranch} className="card-img-top" alt="Crime Branch" /></Link>
                            <div className="card-body">
                                <h5 className="card-title text-center">Mumbai Crime Branch</h5>
                                <p className="card-text"> 2VMW+4GG, Jay Bhavani Marg, Wasi Naka, Gurudwara, S V Patel Nagar, Chembur, Mumbai, Maharashtra 400074</p>
                                <a href="https://maps.app.goo.gl/MgzCfkWfcpPC65827" className="btn btn-outline-danger" target="_blank" rel="noopener noreferrer">Location</a>
                            </div>
                        </div>
                    </div>

                </div>



            </section>
        </>
    )
}

export default ContactInfo