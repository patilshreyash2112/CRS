import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown'; 
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

function AdminNavBar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('admin');
        toast.success('Successfully logged out');
        navigate('/login/admin'); // Use navigate for redirection
    };

    const adminName = JSON.parse(sessionStorage.getItem('admin'))?.adminName || 'Admin';

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand>CRIME REPORT</Navbar.Brand>
                <Navbar.Toggle aria-controls="admin-navbar-nav" />
                <Navbar.Collapse id="admin-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/admin-home" className="text-light">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/admin-complaints" className="text-light">Complaints</Nav.Link>
                        <Nav.Link as={NavLink} to="/admin-police-stations" className="text-light">Stations</Nav.Link>
                        <Nav.Link as={NavLink} to="/admin-police-officers" className="text-light">Officers</Nav.Link>
                        <Nav.Link as={NavLink} to="/admin-users-inquires" className="text-light">Inquires</Nav.Link>
                        <NavDropdown title={adminName} id="admin-nav-dropdown" align="end" className="text-light">
                            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AdminNavBar;
