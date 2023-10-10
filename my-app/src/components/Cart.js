import {Button} from 'react-bootstrap';

export default function Cart({cartProp}){
	console.log(cartProp);

	const {name, price} = cartProp

	return(	

        <tr>
          <td>{name}</td>
          <td className="text-center">₱{price}</td>
          <td className="text-center">₱{price}</td>
          <td className="text-center"><Button variant="danger">Remove</Button></td>
        </tr>
	)
}
