import {Link} from 'react-router-dom';
import { useContext } from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import UserContext from '../UserContext';


export default function AppNavbar(){

    const {user} = useContext(UserContext);

    return(
        <Navbar className="navbar navbar-dark bg-primary navbarPadding" expand='lg'>
        <Container className='navbarScrollHeight'>

            <Navbar.Brand as={Link} to="/" className='d-flex pt-2'>

            <h3 className='text-white ms-1'> Utak.io</h3>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll" className='navbarScrollLinks'>

                <Nav className="ms-auto my-2 my-lg-0" defaultActiveKey="/" style={{ maxHeight: '100px' }}
                navbarScroll
                >
                    
                    <Nav.Link as={Link} to="/" eventKey="/" className='mx-1'>Home</Nav.Link>
                    
                    {
                        (user.isAdmin)
                        ?
                        <Nav.Link as={Link} to="/admin" eventKey="/admin" className='mx-1'>Admin Dashboard</Nav.Link>
                        :
                        <>
                        </>
                    }
                    
                    {
                        (user.id !== null)
                        ?
                            <>
                                {
                                    (user.isAdmin)
                                    ?
                                    <></>
                                    :
                                    <Nav.Link as={Link} to="/profile" eventKey="/profile" className='mx-1'> Profile</Nav.Link>
                                }
                            <Nav.Link as={Link} to="/logout" eventKey="/login" className='mx-1'>Logout</Nav.Link>
                            </>

                        :
                            <>
                                <Nav.Link as={Link} to="/login" eventKey="/login" className='mx-1'>Login</Nav.Link>

                                <Nav.Link as={Link} to="/register" eventKey="/register" className='mx-1'>Register</Nav.Link>
                            </>

                    }
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    )
};