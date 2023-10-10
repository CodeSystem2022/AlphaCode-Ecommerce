import {Row, Col, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function ItemCard({itemProp}){

	const {name, description, price, _id} = itemProp

	return(
		<div className="catalogbg">
		<Row>
			<Col>
				<Card className="mb-4">
				<Card.Body className="cards">
					
					<h3>{name}</h3>
					<Card.Subtitle>Description:</Card.Subtitle>
					<Card.Text>{description}</Card.Text>
					<Card.Subtitle>Price:</Card.Subtitle>
					<Card.Text>₱{price}</Card.Text>

					<Link className="btn btn-secondary" to={`/itemView/${_id}`}>View Details</Link>

				</Card.Body>
				</Card>
			</Col>
		</Row>
		</div>
	)
}
