import {Table, Container, Button} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import Cart from '../components/Cart'
import Swal from 'sweetalert2';

export default function CartDash(){

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

	const [items, setItems] = useState([]);

	let totalAmount = 0;

	// useEffect(() => {
	// 	fetch("http://localhost:4000/users/getItemsFromCart", {
	// 		headers: {
	// 			Authorization : `Bearer ${localStorage.getItem("token")}`
	// 		}
	// 	})
	// 	.then(res => res.json())
	// 	.then(data => {
	// 		console.log(data)

	// 		setItems(data.transactions)

	// 	})

	// }, [])

	const checkout = () => {
		Alert.fire({
			icon: 'error',
			title: 'Feature not yet available'
		});
	}

	return(
		<div>
		<Container>
		<h1 className="page-header text-dark py-3">Shopping Cart</h1>
			

			<Table striped bordered hover className="dash-text">

	      	<thead style={{
			  	backgroundColor: "#615941",
			  	color: "#f2f2f2"
		  	}}>
	          <tr>
		          <th>Name</th>
		          <th className="text-center">Price</th>
		          <th className="text-center">Subtotal</th>
		          <th className="text-center">Action</th>
	          </tr>
	      	</thead>

	      	<tbody>
		        {
		        	items.map(item => {
		        	totalAmount += item.price
		        	return(
		        		<Cart key = {item._id} cartProp = {item}/>
		        	)
		        })
		        }
		      <tr>
		      <td><Button id="check-btn" onClick={checkout}>CHECKOUT</Button></td>
		      <td className="text-center" colspan="3"><h3>Total: ₱{totalAmount}</h3></td>
		      </tr>  
		    </tbody>

		</Table>
		</Container>	

		</div>
	)
};
