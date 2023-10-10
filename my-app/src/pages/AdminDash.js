import {Table, Modal, Form, Container, Button} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import Admin from '../components/Admin'

export default function AdminDash(){

	const baseURL = process.env.REACT_APP_BASE_URL;

	const [users, setUsers] = useState([]);
	const [orders, setOrders] = useState([]);

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [showUser, setShowUser] = useState(false);
	const handleCloseUser = () => setShowUser(false);
	const handleShowUser = () => setShowUser(true);

	const [items, setItems] = useState([])

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);

	useEffect(() => {
		fetch(`${baseURL}/items`)
		.then(res => res.json())
		.then(data => {
			console.log(data)

			setItems(data)

			fetch(`${baseURL}/users`)
			.then(res => res.json())
			.then(data => {
				console.log(data)

				setUsers(data)

				fetch(`${baseURL}/orders/getAllOrders`, {
					headers: {
						Authorization : `Bearer ${localStorage.getItem("token")}`
					}
				})
				.then(res => res.json())
				.then(data => {
					console.log(data)

					setOrders(data)
					
					// const result = data.find(({userId}) => userId === "62ac1f05aef9f72c35e84dc1")
					// console.log(result);
				})

			})
		})

	}, [baseURL])


	function createItem(e){

		e.preventDefault();

		fetch(`${baseURL}/items/createItem`, {
			method: "POST",
			headers: {
				"Content-Type" : "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}` 
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			if(data.name){
				alert("Item created")

				window.location.reload()

			} else {
				alert("Something went wrong")
			}

		})

		setName("");
		setDescription("");
		setPrice("");
	}

	return(
  <> 

  <Container className="w-100">
	<h1 className="page-header text-dark pt-3 pb-2  text-center">Admin Dashboard</h1>

	<Container className="mb-3 text-center dash-text">
	<Button variant="success" className="me-3" onClick={handleShow}>Add New Product</Button>
	<Button variant="primary" onClick={handleShowUser}>Show User Orders</Button>

	</Container>

	<Table striped bordered hover className="dash-text">

	  <thead style={{
	  	backgroundColor: "#615941",
	  	color: "#f2f2f2"
	  }}>
	    <tr>
	      <th className="text-center">Name</th>
	      <th className="text-center">Description</th>
	      <th className="text-center">Price</th>
	      <th className="text-center">Availability</th>
	      <th className="text-center">Actions</th>
	    </tr>
	  </thead>

	  <tbody>
	  {
		items.map(item => {
				return(
					<Admin key = {item._id} adminProp = {item} itemId={item._id}/>
				)
			})
		}

	  </tbody>
	</Table>

	</Container>
	      <Modal show={show} onHide={handleClose}>
	        <Modal.Header>
	          <Modal.Title className="modal-title">ADD NEW PRODUCT</Modal.Title>
	        </Modal.Header>
	        <Modal.Body>
	        	<Form className="dash-text">
	        	      <Form.Group className="mb-2" controlId="formBasicEmail">
	        	        <Form.Label>Name</Form.Label>
	        	        <Form.Control 
	        	        type="text" 
	        	        placeholder="Enter item name."
	        	        required
	        	        value={name}
	        	        onChange={e => setName(e.target.value)} 
	        	        />
	        	      </Form.Group>

	        	      <Form.Group className="mb-2" controlId="formBasicPassword">
	        	        <Form.Label>Description</Form.Label>
	        	        <Form.Control 
	        	        type="text" 
	        	        placeholder="Enter description."
	        	        required
	        	        value={description}
	        	        onChange={e => setDescription(e.target.value)} 
	        	        />
	        	      </Form.Group>

	        	      <Form.Group className="mb-3" controlId="formBasicPassword">
	        	        <Form.Label>Price</Form.Label>
	        	        <Form.Control 
	        	        type="number" 
	        	        placeholder="Enter price."
	        	        required
	        	        value={price}
	        	        onChange={e => setPrice(e.target.value)} 
	        	        />
	        	      </Form.Group>

      	    </Form>
	        </Modal.Body>
	        <Modal.Footer>
	          <Button variant="secondary" onClick={handleClose}>
	            Close
	          </Button>
	          <Button variant="success" onClick={e => createItem(e)}>
	            Create
	          </Button>
	        </Modal.Footer>
	      </Modal>

	      <Modal show={showUser} onHide={handleCloseUser}>
	        <Modal.Header>
	          <Modal.Title className="modal-title">USER ORDERS</Modal.Title>
	        </Modal.Header>
	        <Modal.Body>

	        <Table striped bordered hover className="dash-text">

	      	<thead className="text-center" style={{
			  	backgroundColor: "#615941",
			  	color: "#f2f2f2"
		  	}}>
	          <tr>
		          <th>User</th>
		          <th>No. of orders</th>
		          <th>Total</th>
	          </tr>
	      	</thead>

	      	<tbody>
				{
					users.map(user => {
						if(!user.isAdmin){
		        	return(
		        		<>
		        			<tr>
		        				<td>{`${user.firstName} ${user.lastName}`}</td>

		        				<td className="text-center">{
		        					orders.map(order => {
		        						if(order.userId === user._id){
		        							return order.transactions.length
		        						}
		        					})
		        				}</td>

		        				<td className="text-center">{
		        					orders.map(order => {
		        						if(order.userId === user._id){
		        							return order.totalAmount
		        						}
		        					})
		        				}</td>
		        			</tr>
		        		</>
		        	)
		        	}
		        })
				}
		    </tbody>

		</Table>
	        	
	        </Modal.Body>
	        <Modal.Footer>
	          <Button variant="secondary" onClick={handleCloseUser}>
	            Close
	          </Button>
	        </Modal.Footer>
	      </Modal>
	</>		
	)
}
