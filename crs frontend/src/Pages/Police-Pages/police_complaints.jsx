import React from 'react'
import PoliceNavBar from '../../Components/Police-Components/police_navbar'
import Footer from '../../Components/User-Components/footer';
import { useState } from 'react';
import StatusComponent from '../../Components/Police-Components/status_components';
import RenderComponent from '../../Components/Police-Components/render_complaint_component';
const button = [
    'Complaints', 'Assign Officer', 'Change Status'
]

const PoliceComplaints = () => {
    const [isSelected, setIsSelected] = useState(0)
  return (
    <div>
      <PoliceNavBar/>
      <div className="home-container">
        <header className="home-header">
            <h1>Complaints</h1>
        </header>

        <section className="home-section">
            
            {/* Buttons for pending and assigned */}
            
            <StatusComponent buttons={button} isSelected={isSelected} setIsSelected={setIsSelected}/>
            <RenderComponent index={isSelected}/>    

            
        </section>
    </div>
      <Footer/>
    </div>
  )
}

export default PoliceComplaints
