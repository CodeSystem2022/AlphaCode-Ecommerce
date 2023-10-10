import {useState, useEffect, useContext} from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import {Navigate, useNavigate} from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function Register(){

	const baseURL = process.env.REACT_APP_BASE_URL;

	const {user} = useContext(UserContext);

	const history = useNavigate();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [email, setEmail] = useState("");
	const [mobileNo, setMobileNo] = useState("");
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {

		if((firstName !== "" && lastName !== "" &&  password !== "" && email !== "" && mobileNo.length === 11) && (password === confirmPassword)){

			setIsActive(true);

		} else {

			setIsActive(false);
		}

	}, [firstName, lastName, password, confirmPassword, email, mobileNo])

	function registerUser(e){

		e.preventDefault();

		fetch(`${baseURL}/users/checkEmailExists`, {
			method: "POST",
			headers: {
				"Content-Type" : "application/json"
			},
			body: JSON.stringify({
				email: email
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			if(data){
				Swal.fire({
				  icon: 'warning',
				  title: 'Email is already registered.',
				})

			} else {

				fetch(`${baseURL}/users`, {
					method: "POST",
					headers: {
						"Content-Type" : "application/json"
					},
					body: JSON.stringify({
						firstName: firstName,
						lastName: lastName,
						password: password, 
						email: email,
						mobileNo: mobileNo
					})
				})
				.then(res => res.json())
				.then(data => {
					console.log(data)

					if(data.email){
						Swal.fire({
						  icon: 'success',
						  title: 'Registration Successful!',
						})

						history("/login");

					} else {
						Swal.fire({
						  icon: 'error',
						  title: 'Registration failed.',
						})
					}
				})
			}
		})

		setFirstName("");
		setLastName("");
		setPassword("");
		setConfirmPassword("");
		setEmail("");
		setMobileNo("");
	}

	return(

		(user.id !== null) ?
		<Navigate to="/catalog"/>

		:

		<Container className="mt-5 w-50">
		<h1 className="page-header">Join the community!</h1>
		<Form className="dash-text" onSubmit={e => registerUser(e)}>

		<Form.Group controlId="firstName" className="my-2">
			<Form.Label>First Name:</Form.Label>
			<Form.Control
				type = "text"
				placeholder = "Please input your first name here."
				required
				value={firstName}
				onChange={e => setFirstName(e.target.value)}
			/>
		</Form.Group>

		<Form.Group controlId="lastName" className="my-2">
			<Form.Label>Last Name:</Form.Label>
			<Form.Control
				type = "text"
				placeholder = "Please input your kast name here."
				required
				value={lastName}
				onChange={e => setLastName(e.target.value)}
			/>
		</Form.Group>

		<Form.Group controlId="password" className="my-2">
			<Form.Label>Password:</Form.Label>
			<Form.Control
				type = "password"
				placeholder = "Please input your password here."
				required
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>
		</Form.Group>

		<Form.Group controlId="confirmPassword" className="my-2">
			<Form.Label>Confirm Password:</Form.Label>
			<Form.Control
				type = "password"
				placeholder = "Please input your password here."
				required
				value={confirmPassword}
				onChange={e => setConfirmPassword(e.target.value)}
			/>
		</Form.Group>

		<Form.Group controlId="email" className="my-2">
			<Form.Label>Email Address:</Form.Label>
			<Form.Control
				type = "email"
				placeholder = "Please input your email here."
				required
				value={email}
				onChange={e => setEmail(e.target.value)}
			/>
		</Form.Group>

		<Form.Group controlId="mobileNo" className="my-2">
			<Form.Label>Mobile Number:</Form.Label>
			<Form.Control
				type = "text"
				placeholder = "Please input your 11-digit mobile number here."
				required
				value={mobileNo}
				onChange={e => setMobileNo(e.target.value)}
			/>
		</Form.Group>

		{ isActive?

		<Button variant="success" type="submit" id="submitBtn" className="mt-3 mb-5">
				Register
		</Button>

		  :

		<Button variant="danger" type="submit" id="submitBtn" className="mt-3 mb-5" disabled>
				Register
		</Button>  
		  
		}

		</Form>
		</Container>
	)
};
