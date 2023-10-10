import {Container} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import ItemCard from '../components/ItemCard'

export default function Catalog(){

	const [items, setItems] = useState([])

	const baseURL = process.env.REACT_APP_BASE_URL; 

	useEffect(() => {
		fetch(`${baseURL}/items/getAllActiveItems`)
		.then(res => res.json())
		.then(data => {
			console.log(data)

			setItems(data.map(item => {
				return(
					<ItemCard key = {item._id} itemProp = {item}/>
				)
			}))
		})

	}, [baseURL])

	return(
	<div
      style={{
        backgroundColor: "#f2f2f2",
      }}
    >	
    
    <Container className="w-75">
	<h1 className="page-header text-dark py-3">Catalog</h1>
	{items}
	</Container>

	</div>		
	)
}
