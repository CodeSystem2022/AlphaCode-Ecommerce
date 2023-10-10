import {Row, Col} from 'react-bootstrap';

import {Link} from 'react-router-dom';

export default function Error(){
	return(
		<Row className="text-center">
			<Col className = "p-5">
				<img
		              alt=""
		              src="./images/error.png"
		              width="500"
		              height="375"
		              className="d-inline-block align-top me-3"
		              id="error"
		        />
				<h1>404 Page Not Found</h1>
				<p className="mb-3">The page you were looking for does not exist.</p>
				<p>Go back to the <Link to="/">homepage</Link>.</p>
				
			</Col>
		</Row>
	)
}