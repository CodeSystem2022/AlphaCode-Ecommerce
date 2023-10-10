import {useContext} from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import UserContext from '../UserContext';

export default function AppNavBar(){

	const {user} = useContext(UserContext);

	return (
		<Navbar variant="light" expand="lg" className="mainNav sticky-top px-0">
	      	<Container>

		        <Navbar.Brand as={Link} to = "/">
 		            <img
		              alt=""
		              src="./images/logo-final.png"
		              width="150"
		              height="50"
		              className="logo"
		            />
          		</Navbar.Brand>

		        <Navbar.Toggle aria-controls="basic-navbar-nav" />
		        <Navbar.Collapse id="basic-navbar-nav">
	          		<Nav className="ms-auto">
		            <Nav.Link as={Link} to = "/" className="navText px-2">Inicio</Nav.Link>
		            <Nav.Link as={Link} to = "/catalog" className="navText px-2">Catálogo (Proximamente)</Nav.Link>

		            {
		            (user.id !== null && user.isAdmin)?
		            <>
		            <Nav.Link as={Link} to = "/admin" className="navText px-2">Admin Dashboard</Nav.Link>
		            <Nav.Link as={Link} to = "/logout" className="navText px-2">Logout</Nav.Link>
		            </>:

		            (user.id !== null)?
		            <>
		            <Nav.Link as={Link} to = "/cart" className="navText px-2">Shopping Cart</Nav.Link>
		            <Nav.Link as={Link} to = "/logout" className="navText px-2">Logout</Nav.Link>
		            </>
		            :

		            <>
		            <Nav.Link as={Link} to = "/login" className="navText px-2">Login</Nav.Link>
		            <Nav.Link as={Link} to = "/register" className="navText px-2">Register</Nav.Link>
		            </>
		        	}
		          	</Nav>
		        </Navbar.Collapse>
	      	</Container>
	    </Navbar>
	)
}
