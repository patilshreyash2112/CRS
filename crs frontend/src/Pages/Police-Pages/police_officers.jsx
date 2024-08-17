import React, { useEffect, useState } from 'react';
import PoliceNavBar from '../../Components/Police-Components/police_navbar';
import Footer from '../../Components/User-Components/footer';
import policeImage from '../../Images/Officers.jpeg';
import constableImage from '../../Images/constable.jpg';
import inspectorImage from '../../Images/inspector.jpg';
import headImage from '../../Images/head.jpg';
import { Link } from 'react-router-dom';
import { fetchOfficersByStationId } from '../../services/User-Services/fetch-data'; 
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';

const PoliceOfficers = () => {
  const [officers, setOfficers] = useState([]);

  useEffect(() => {
    const fetchOfficers = async () => {
      const policeStationId = sessionStorage.getItem('policeStationId');
      try {
        const data = await fetchOfficersByStationId(policeStationId);
        setOfficers(data);
      } catch (error) {
        console.error('Error fetching police officers:', error);
        toast.error('Error fetching police officers.');
      }
    };

    fetchOfficers();
  }, []);

  const getImageByDesignation = (designation) => {
    switch (designation.toLowerCase()) {
      case 'constable':
        return constableImage;
      case 'inspector':
        return inspectorImage;
      case 'head':
        return headImage;
      default:
        return policeImage;
    }
  };

  return (
    <div>
      <PoliceNavBar />

      <div className="home-container">
        <header className="home-header">
          <h1>Police Officers</h1>
        </header>

        <section className="home-section">
          <div className="row mb-3">
            <div className="col-md-12">
              <div className="card text-center">
                <Link to="/police-officers">
                  <img src={policeImage} className="card-img-top" alt="Report Crime" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Container>
          <Row>
            {officers.map((officer) => (
              <Col md={4} key={officer.id} className="mb-4 mt-4">
                <Card>
                <Card.Img className="mt-2"
  variant="top"
  src={getImageByDesignation(officer.designation)}
  alt={officer.designation}
  style={{
    width: '200px',
    height: '200px',
    objectFit: 'contain',
    display: 'block',
    margin: '0 auto',
  }}
/>


                  <Card.Body>
                    <Card.Title>{officer.officerName}</Card.Title>
                    <Card.Text><strong>Designation:</strong> {officer.designation}</Card.Text>
                    <Card.Text><strong>Email:</strong> {officer.email}</Card.Text>
                    <Card.Text><strong>Contact Number:</strong> {officer.contactNumber}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      <Footer />
    </div>
  );
};

export default PoliceOfficers;
