import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import {faFacebook, faTwitter, faInstagram} from '@fortawesome/free-brands-svg-icons'

export default function Footer(){

	return(
		<div className="div-footer p-2 text-center">
			<FontAwesomeIcon className="logo px-3" icon={faFacebook}></FontAwesomeIcon>
			<FontAwesomeIcon className="logo px-3" icon={faTwitter}></FontAwesomeIcon>
			<FontAwesomeIcon className="logo px-3" icon={faInstagram}></FontAwesomeIcon>
			
		</div>
	)
}
