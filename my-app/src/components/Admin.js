import {useState} from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function Admin({adminProp, itemId}){

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

	const {name, description, price, isActive} = adminProp
	console.log(adminProp);

	const [updateName, setUpdateName] = useState(name);
	const [updateDesc, setUpdateDesc] = useState(description);
	const [updatePrice, setUpdatePrice] = useState(price);
	const [updateArchive, setUpdateArchive] = useState(false);
	const [updateActivate, setUpdateActivate] = useState(true);

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	function updateItem(e){

		e.preventDefault();

		fetch(`${baseURL}/items/updateItem/${itemId}`, {
			method: "PUT",
			headers: {
				"Content-Type" : "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}` 
			},
			body: JSON.stringify({
				name: updateName,
				description: updateDesc,
				price: updatePrice
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			if(data.name){
				Alert.fire({
				  icon: 'success',
				  title: 'Logged in successfully'
				})

				window.location.reload()

			} else {
				Alert.fire({
				  icon: 'error',
				  title: 'Something went wrong'
				})
			}

		})

		setUpdateName("");
		setUpdateDesc("");
		setUpdatePrice("");
	}

	function archiveItem(e){

		e.preventDefault();

		fetch(`${baseURL}/items/archiveItem/${itemId}`, {
			method: "PUT",
			headers: {
				"Content-Type" : "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}` 
			},
			body: JSON.stringify({
				isActive: updateArchive
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			if(data.name){
				Alert.fire({
				  icon: 'success',
				  title: 'Item archived'
				})

				window.location.reload()

			} else {
				Alert.fire({
				  icon: 'error',
				  title: 'Something went wrong'
				})
			}
		})

		setUpdateArchive(false);
	}

	function activateItem(e){

		e.preventDefault();

		fetch(`${baseURL}/items/activateItem/${itemId}`, {
			method: "PUT",
			headers: {
				"Content-Type" : "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}` 
			},
			body: JSON.stringify({
				isActive: updateActivate
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			if(data.name){
				Alert.fire({
				  icon: 'success',
				  title: 'Item activated'
				})

				window.location.reload()

			} else {
				Alert.fire({
				  icon: 'error',
				  title: 'Something went wrong'
				})
			}
		})

		setUpdateActivate(true);
	}

	return(

		<>
	        <tr className="width"> 
	          <td className="width1">{name}</td>
	          <td className="width2">{description}</td>
	          <td className="width3">₱{price}</td>
	          <td className="width4">{isActive ? "Available" : "Not Available"}</td>
	          <td className="width5">
	          <Button className="me-3" variant="success" onClick={handleShow}>Update</Button>

	          { isActive ?

	          <Button variant="danger" onClick={e => archiveItem(e)}>Archive</Button>

	           :

	          <Button variant="secondary" onClick={e => activateItem(e)}>Activate</Button> 

	          }

	          </td>
	        </tr>

	    <Modal show={show} onHide={handleClose}>
	        <Modal.Header>
	          <Modal.Title>UPDATE PRODUCT</Modal.Title>
	        </Modal.Header>
	        <Modal.Body>
	        	<Form>
	        	      <Form.Group className="mb-2" controlId="formBasicEmail">
	        	        <Form.Label>Name</Form.Label>
	        	        <Form.Control 
	        	        type="text" 
	        	        placeholder="Enter item name."
	        	        required
	        	        value={updateName}
	        	        onChange={e => setUpdateName(e.target.value)} 
	        	        />
	        	      </Form.Group>

	        	      <Form.Group className="mb-2" controlId="formBasicPassword">
	        	        <Form.Label>Description</Form.Label>
	        	        <Form.Control 
	        	        type="text" 
	        	        placeholder="Enter description."
	        	        required
	        	        value={updateDesc}
	        	        onChange={e => setUpdateDesc(e.target.value)} 
	        	        />
	        	      </Form.Group>

	        	      <Form.Group className="mb-3" controlId="formBasicPassword">
	        	        <Form.Label>Price</Form.Label>
	        	        <Form.Control 
	        	        type="number" 
	        	        placeholder="Enter price."
	        	        required
	        	        value={updatePrice}
	        	        onChange={e => setUpdatePrice(e.target.value)} 
	        	        />
	        	      </Form.Group>

      	    </Form>
	        </Modal.Body>
	        <Modal.Footer>
	          <Button variant="secondary" onClick={handleClose}>
	            Close
	          </Button>
	          <Button variant="success" onClick={e => updateItem(e)}>
	            Update
	          </Button>
	        </Modal.Footer>
	      </Modal>
	    </>

	)
}
