import {Row, Col, Card} from 'react-bootstrap';

export default function About(){
	return(
		<div className="div-about d-sm-flex p-4">
		<Row id="about-row">

			<Col>
				<Card>
					<Card.Body className="cards-about">
						<h2 className="about-header text-center">SOBRE NOSOTROS</h2>
						<Card.Text className="text-about">
						Nosotros somos del grupo AlphaCode y realizamos este E-commerce de Zapatillas para presentar en nuestro último semestre de la TUP de UTN.
						</Card.Text>
					</Card.Body>
				</Card>

			</Col>

			<Col>
				<Card>
					<Card.Body className="cards-about">
						<h2 className="about-header text-center">INTEGRANTES</h2>
						<Card.Text className="text-about">
						Nicolás Castro, Natalia Rivarola, Eric Maturano, Gimena Pérez, Daniel Alessio, Santiago Bordón, Carla Rosales, Cintia Contreras.
						</Card.Text>
					</Card.Body>
				</Card>
			</Col>

		</Row>
		</div>
	)
}
