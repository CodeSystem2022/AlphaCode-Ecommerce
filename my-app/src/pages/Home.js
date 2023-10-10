import SecondaryNav from '../components/SecondaryNav';
import Carousel from '../components/Carousel';
import About from '../components/About';
import Dropping from '../components/Dropping';
import Footer from '../components/Footer';

export default function Home(){

	return(
		<>
			<SecondaryNav/>
			<Carousel/>
			<Dropping/>
			<About/>
			<Footer/>
		</>
	)
}