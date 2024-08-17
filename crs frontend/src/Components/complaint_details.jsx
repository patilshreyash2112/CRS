import React from 'react'
import AdminNavBar from './Admin-Components/admin_navbar'
import Footer from './User-Components/footer'

const ComplaintDetails = () => {
    return (
        <div>
            <AdminNavBar />
            <div className="home-container">
                <header className="home-header">
                    <h1>Complaint Details</h1>
                </header>

                <section className="home-section">
                    <div className="row mb-3">

                        <div className="col-md-12">
                            <div className="card text-center">
                            <div className="table-responsive">
                <table className="table table-striped table-bordered text-center" >
                    <thead>
                        <tr>
                            <th>Sr. No</th>
                            <th>Titles</th>
                            <th>Descriptons</th>            
                        </tr>
                    </thead>
                    <tbody>
                        
                            <tr>
                                <td>1</td>
                                <td>Complaint ID</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Registered By</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Registered At</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>Title</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>Type</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>Details</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>7</td>
                                <td>Crime Date</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>8</td>
                                <td>Location</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>9</td>
                                <td>Suspect Name</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>Suspect Address</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>11</td>
                                <td>Proof</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>12</td>
                                <td>Status</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>13</td>
                                <td>Assigned To</td>
                                <td></td>
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
    )
}

export default ComplaintDetails
