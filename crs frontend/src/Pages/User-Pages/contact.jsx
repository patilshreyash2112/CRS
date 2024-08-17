import Footer from "../../Components/User-Components/footer";
import NavBar from "../../Components/User-Components/navbar";
import ContactBanner from '../../Images/ContactBanner.jpg';
import ContactInfo from "../../Components/User-Components/contactInfo";
import { useState } from "react";
import { toast } from "react-toastify";
import { postContactInformation } from '../../services/User-Services/contact';

function Contact() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [reasonOfContact, setReasonOfContact] = useState('');

    const onContactUs = async (event) => {
        event.preventDefault();

        if (firstName.length === 0) {
            toast.warn('Enter First Name');
        } else if (lastName.length === 0) {
            toast.warn("Enter the Last Name");
        } else if (contactNumber.length !== 10) {
            toast.warn("Enter a valid Contact Number");
        } else if (emailAddress.length === 0) {
            toast.warn("Enter the Email Address");
        } else if (reasonOfContact.length === 0) {
            toast.warn("Enter the Reason for Contact");
        } else {
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
                // Clear form fields after successful submission
                setFirstName('');
                setLastName('');
                setContactNumber('');
                setEmailAddress('');
                setReasonOfContact('');
            } catch (error) {
                toast.error('Error submitting contact information');
            }
        }
    };

    return (
        <>
            <NavBar />
            <div className="home-container">
                <header className="home-header">
                    <h1>Contact Us</h1>
                </header>

                <section className="home-section">
                    <div className="row mb-3">
                        <div className="col-md-12">
                            <div className="card text-center">
                                <img src={ContactBanner} className="card-img-top" alt="Contact Banner" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="home-section contactBack">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <hr />
                        <h2 className="text-dark mt-5 mb-5">Get a call back from us</h2>
                        <form onSubmit={onContactUs}>
                            <div className="row">
                                <div className="col form-floating mb-3 p-1">
                                    <input
                                        onChange={(e) => setFirstName(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        id="floatingInputFirstName"
                                        placeholder="First Name"
                                        value={firstName}
                                    />
                                    <label htmlFor="floatingInputFirstName">First Name</label>
                                </div>
                                <div className="col form-floating mb-3 p-1">
                                    <input
                                        onChange={(e) => setLastName(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        id="floatingInputLastName"
                                        placeholder="Last Name"
                                        value={lastName}
                                    />
                                    <label htmlFor="floatingInputLastName">Last Name</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-group flex-nowrap mb-3">
                                    <span className="input-group-text" id="addon-wrapping">+91</span>
                                    <input
                                        onChange={(e) => setContactNumber(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        placeholder="Contact No."
                                        aria-label="Contact Number"
                                        aria-describedby="addon-wrapping"
                                        value={contactNumber}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-group mb-3">
                                    <input
                                        onChange={(e) => setEmailAddress(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        placeholder="Email Address"
                                        aria-label="Email Address"
                                        aria-describedby="basic-addon2"
                                        value={emailAddress}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Reason for Contact</label>
                                    <textarea
                                        onChange={(e) => setReasonOfContact(e.target.value)}
                                        className="form-control"
                                        id="exampleFormControlTextarea1"
                                        rows="3"
                                        value={reasonOfContact}
                                    ></textarea>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-md-4"></div>
                                <div className="col-md-4">
                                    <div className="col-12 p-4">
                                        <button
                                            className="btn btn-primary"
                                            type="submit"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                                <div className="col-md-4"></div>
                                <hr />
                            </div>
                        </form>
                    </div>
                    <div className="col-md-2"></div>
                </section>

                <ContactInfo />
            </div>
            <Footer />
        </>
    );
}

export default Contact;
