import Carousel from 'react-bootstrap/Carousel';

export default function HomeCarousel() {
  return (
    <div className="carouselDiv">
    <Carousel className="center carousel w-100 d-none d-md-block">

      <Carousel.Item>
        <img
          className="w-100"
          src="./carousel/shoe2.png"
          alt="First slide"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="w-100"
          src="./carousel/shoe1.png"
          alt="Second slide"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="w-100"
          src="./carousel/shoe3.png"
          alt="Third slide"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="w-100"
          src="./carousel/shoe6.png"
          alt="Third slide"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="w-100"
          src="./carousel/shoe5.png"
          alt="Third slide"
        />
      </Carousel.Item>

    </Carousel>
    </div>
  );
}
