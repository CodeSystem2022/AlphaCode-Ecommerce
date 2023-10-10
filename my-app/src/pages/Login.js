import {useState, useEffect, useContext} from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import {Navigate, Link} from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function Login(){

	const baseURL = process.env.REACT_APP_BASE_URL;

	const Alert = Swal.mixin({
	  toast: true,
	  position: 'top',
	  showConfirmButton: false,
	  timer: 1750,
	  timerProgressBar: true,
	  didOpen: (toast) => {
	    toast.addEventListener('mouseenter', Swal.stopTimer)
	    toast.addEventListener('mouseleave', Swal.resumeTimer)
	  }
	})

	const {user, setUser} = useContext(UserContext)

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isActive, setIsActive] = useState(false);

	function loginUser(e){

		e.preventDefault();

		fetch(`${baseURL}/users/login`, {
			method: "POST",
			headers: {
				"Content-Type" : "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			if(typeof data.accessToken !== "undefined"){

				localStorage.setItem("token", data.accessToken);
				retrieveUserDetails(data.accessToken);

				Alert.fire({
				  icon: 'success',
				  title: 'Logged in successfully'
				})

			} else {
				Alert.fire({
				  icon: 'error',
				  title: 'Failed to login'
				})
			}

		})

		setEmail("");
		setPassword("");

	}

	const retrieveUserDetails = (token) => {

		fetch(`${baseURL}/users/getUserDetails`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			setUser({
				_id: data._id,
				isAdmin: data.isAdmin
			})
		})
	}

	useEffect(() => {

		if(email !== "" && password !== ""){
			setIsActive(true);

		} else {
			setIsActive(false);
		}

	}, [email, password])

	return(

		(user.id !== null) ?
		<Navigate to="/catalog"/>

		:

		<Container className="mt-5 w-50">
		<h1 className="page-header">Login Here</h1>

		<Form className="dash-text" onSubmit={e => loginUser(e)}>

		<Form.Group controlId="userEmail">
			<Form.Label>Email:</Form.Label>
			<Form.Control
				type = "email"
				placeholder = "Enter email"
				required
				value={email}
				onChange={e => setEmail(e.target.value)}
			/>
		</Form.Group>

		<Form.Group controlId="password">
			<Form.Label>Password:</Form.Label>
			<Form.Control
				type = "password"
				placeholder = "Enter password"
				required
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>
		</Form.Group>

		<p className="mt-3">Not yet registered? <Link to="/register">Register here!</Link></p>

		{ isActive?

		<Button variant="success" type="submit" id="submitBtn" className="mt-1 mb-5">
				Login
		</Button>

		  :
		<Button variant="danger" type="submit" id="submitBtn" className="mt-1 mb-5" disabled>
				Login
		</Button>  
		  
		}

		</Form>
		</Container>
	)
}
