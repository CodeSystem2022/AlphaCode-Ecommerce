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
		<h1 className="page-header">Ingresa en Alpha SneakIn!</h1>
		<Form className="dash-text" onSubmit={e => registerUser(e)}>

		<Form.Group controlId="firstName" className="my-2">
			<Form.Label>Nombre:</Form.Label>
			<Form.Control
				type = "text"
				placeholder = "Coloca tu nombre aquí."
				required
				value={firstName}
				onChange={e => setFirstName(e.target.value)}
			/>
		</Form.Group>

		<Form.Group controlId="Apellido" className="my-2">
			<Form.Label>Apellido:</Form.Label>
			<Form.Control
				type = "text"
				placeholder = "Coloca tu apellido aquí."
				required
				value={lastName}
				onChange={e => setLastName(e.target.value)}
			/>
		</Form.Group>

		<Form.Group controlId="password" className="my-2">
			<Form.Label>Contraseña:</Form.Label>
			<Form.Control
				type = "password"
				placeholder = "Escribe tu contraseña aquí."
				required
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>
		</Form.Group>

		<Form.Group controlId="confirmPassword" className="my-2">
			<Form.Label>Confirma tu contraseña:</Form.Label>
			<Form.Control
				type = "password"
				placeholder = "Por favor confirma tu contraseña aquí."
				required
				value={confirmPassword}
				onChange={e => setConfirmPassword(e.target.value)}
			/>
		</Form.Group>

		<Form.Group controlId="email" className="my-2">
			<Form.Label>Email:</Form.Label>
			<Form.Control
				type = "email"
				placeholder = "Coloca tu email aquí."
				required
				value={email}
				onChange={e => setEmail(e.target.value)}
			/>
		</Form.Group>

		<Form.Group controlId="mobileNo" className="my-2">
			<Form.Label>Número de teléfono:</Form.Label>
			<Form.Control
				type = "text"
				placeholder = "Coloca tu número de teléfono aquí."
				required
				value={mobileNo}
				onChange={e => setMobileNo(e.target.value)}
			/>
		</Form.Group>

		{ isActive?

		<Button variant="success" type="submit" id="submitBtn" className="mt-3 mb-5">
				Regístrate
		</Button>

		  :

		<Button variant="danger" type="submit" id="submitBtn" className="mt-3 mb-5" disabled>
				Regístrate
		</Button>  
		  
		}

		</Form>
		</Container>
	)
};
