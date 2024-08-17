import React from 'react'
import PoliceNavBar from '../../Components/Police-Components/police_navbar';
import Footer from '../../Components/User-Components/footer';
import { useState } from "react";
import { toast } from "react-toastify";
import { postContactInformation } from '../../services/User-Services/contact'

const PoliceInquires = () => {

    const[firstName,setFirstName]=useState('');
    const[lastName,setLastName]=useState('');
    const[contactNumber,setContactnumber]=useState('');
    const[emailAddress,setEmailAddress]=useState('');
    const[reasonOfContact,setReasonOfContact]=useState('');

    const onContactUs = async (event) => {
        event.preventDefault();

        if(firstName.length===0){
           toast.warn('Enter First Name')
        }
        
        else if(lastName.length===0){
          toast.warn("Enter the Last Name")
        }
        else if(contactNumber.length!==10){
            toast.warn("Enter the Contact Number")
        }
        else if(emailAddress.length===0){
            toast.warn("Enter the Email Address")
        }
        else if(reasonOfContact.length===0){
            toast.warn("Enter the Reason of Contact")
        }

        else{

            const contactInfo = {
                firstName,
                lastName,
                contactNumber,
                emailAddress,
                reasonOfContact,
            };

            try {
                await postContactInformation(contactInfo);
                toast.success('Contact information submitted successfully');
                
            } catch (error) {
                toast.error('Error submitting contact information');
                
            }

        }
    }

  return (
    <div>
      <PoliceNavBar/>

      <div className="home-container">
        <header className="home-header">
            <h1>Inquiry</h1>
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

        <section className="home-section contactBack">
                    <div className="col-md-2"></div>

                    <div className="col-md-8">
                        <hr />
                        <h2 className="text-dark mt-5 mb-5" >Contact To Head Quarters</h2>
                        <div className="row">
                            <div className="col form-floating mb-3 p-1">
                                <input onChange={(e) => setFirstName(e.target.value)} type="text" className="form-control" id="floatingInput" placeholder="First Name" />
                                <label htmlFor="floatingInput">First Name</label>
                            </div>
                            <div className="col form-floating mb-3 p-1">
                                <input onChange={(e) => setLastName(e.target.value)} type="text" className="form-control" id="floatingInput" placeholder="Last Name" />
                                <label htmlFor="floatingInput">Last Name</label>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="input-group flex-nowrap mb-3">
                                <span className="input-group-text" id="addon-wrapping">+91</span>
                                <input onChange={(e) => setContactnumber(e.target.value)} type="text" className="form-control" placeholder="Contact No." aria-label="Username" aria-describedby="addon-wrapping" />

                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group mb-3">
                                <input onChange={(e) => setEmailAddress(e.target.value)} type="text" className="form-control" placeholder="Email Address" aria-label="email" aria-describedby="basic-addon2" />

                            </div>

                        </div>
                        <div className="row">
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Reason of contact</label>
                                <textarea onChange={(e) => setReasonOfContact(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-md-4"></div>
                            <div className="col-md-4">
                                <div className="col-12 p-4 ">
                                    <button onClick={onContactUs} className="btn btn-primary" type="submit">Submit</button>
                                </div>
                            </div>
                            <div className="col-md-4"></div>
                            <hr />

                        </div>


                    </div>

                    <div className="col-md-2"></div>

                </section>
    </div>

      <Footer/>

    </div>
  )
}

export default PoliceInquires
