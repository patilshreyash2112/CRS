import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown'; 
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

function PoliceNavBar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('policeOfficer');
        toast.success('Successfully logged out');
        navigate('/login/police'); // Use navigate for redirection
    };

    const policeName = JSON.parse(sessionStorage.getItem('policeOfficer'))?.officerName || 'Police Officer';

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand>CRIME REPORT</Navbar.Brand>
                <Navbar.Toggle aria-controls="police-navbar-nav" />
                <Navbar.Collapse id="police-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={NavLink} to="/police-home" className="text-light">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/police-complaints" className="text-light">Complaints</Nav.Link>
                        <Nav.Link as={NavLink} to="/police-officers" className="text-light">Officers</Nav.Link>
                        <Nav.Link as={NavLink} to="/police-users-inquires" className="text-light">Inquires</Nav.Link>
                        <NavDropdown title={policeName} id="police-nav-dropdown" align="end" className="text-light">
                            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default PoliceNavBar;
