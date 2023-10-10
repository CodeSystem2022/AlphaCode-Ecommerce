import {useState, useEffect, useContext} from 'react';
import {Container, Row, Col, Card, Button} from 'react-bootstrap';
import {Link, useNavigate, useParams} from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';
import './ItemView.css';

export default function ItemView(){

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

	const {user} = useContext(UserContext);

	const history = useNavigate();

	const {itemId} = useParams();

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");

	// const addToCart = (itemId) => {
		
	// 	fetch("http://localhost:4000/users/addToCart", {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type" : "application/json",
	// 			Authorization : `Bearer ${localStorage.getItem("token")}`
	// 		},
	// 		body: JSON.stringify({
	// 			itemId: itemId
	// 		})
			
	// 	})
	// 	.then(res => res.json())
	// 	.then(data => {
	// 		console.log(data)

	// 		if(data){
	// 			Swal.fire({
	// 			  icon: 'success',
	// 			  title: 'Item added to cart.',
	// 			  text: 'Continue shopping, sneakerhead!',
	// 			})

	// 			history("/catalog")

	// 		} else {
	// 			Alert.fire({
	// 			  icon: 'error',
	// 			  title: 'Something went wrong'
	// 			})
	// 		}
	// 	})
	// }


	const addToCart = () => {
		Alert.fire({
			icon: 'error',
			title: 'Feature not yet available'
		});
	}

	useEffect(() => {

		fetch(`${baseURL}/items/getSingleItem/${itemId}`)
		.then(res => res.json())
		.then(data => {
			console.log(data)

			setName(data.name);
			setPrice(data.price);
			setDescription(data.description);
		})

	}, [itemId, baseURL])

	return(

		<Container className="mt-5">
		<Row>
			<Col lg={{span: 5, offset: 2}}>
				<Card>
				<Card.Body className="shoe-text">

					<Card.Title>{name}</Card.Title>

					<Card.Subtitle>Description:</Card.Subtitle>
					<Card.Text>{description}</Card.Text>

					<Card.Subtitle>Price:</Card.Subtitle>
					<Card.Text>₱{price}</Card.Text>

					{user.id !== null ?

					<Button variant="success" onClick={() => addToCart(itemId)}>Add to cart</Button>

					 :

					<Link className="btn btn-danger" to="/login">Log In</Link>

					}

				</Card.Body>
				</Card>
			</Col>

			<Col>
				<img src={`./../shoes/${itemId}.png`} alt="" className="shoeCart w-50"/>
			</Col>

		</Row>
		</Container>
	)
}
