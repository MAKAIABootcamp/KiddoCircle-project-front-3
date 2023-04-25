import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";

import carouselImage from "../../../assets/cosas-bebes.png";
import carouselImage2 from "../../../assets/carouselImage2.jpg";
import carouselImage3 from "../../../assets/carouselImage3.png";
import carouselImage4 from "../../../assets/carouselImage4.png";
// import "./carousel.scss";

const items = [
  {
    src: carouselImage,
    altText: "Slide 1",
    caption:
      "Publicar tus artículos de segunda mano en nuestra página es muy fácil y rápido. Solo necesitas tomar algunas fotos y agregar una breve descripción del artículo. Así, otros usuarios podrán ver lo que ofreces y contactarte para realizar la compra.",
    text: "",
    key: 2,
  },
  {
    src: carouselImage2,
    altText: "Slide 2",
    caption:
      "¡Únete a nuestra comunidad y comienza a comprar y vender artículos infantiles usados hoy mismo! Además de encontrar buenos precios y artículos en buen estado, podrás conocer a otras familias y hacer nuevos amigos en el proceso. ¡Gracias por ser parte de nuestra comunidad!",
    text: "",
    key: 3,
  },
  {
    src: carouselImage3,
    altText: "Slide 3",
    caption:
      "¡Bienvenidos a nuestra comunidad de compraventa de artículos infantiles usados! Aquí podrás encontrar ropa, juguetes y otros artículos en buen estado a precios accesibles, y además, darle una segunda vida a las cosas que ya no usas.",
    text: "¡Bienvenidos!",
    key: 4,
  },
  {
    src: carouselImage4,
    altText: "Slide 3",
    caption:
      "Encontrar ropa de bebé en buen estado puede ser una tarea difícil y costosa, por eso creamos esta página para facilitar el proceso y ahorrar tiempo y dinero a las familias. Además, al vender y comprar artículos usados, estás contribuyendo al cuidado del medio ambiente.",
    text: "",
    key: 1,
  },
];

const CarouselImages = (args) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} className="img" />
        <CarouselCaption
          className="carouselText"
          captionText={item.caption}
          captionHeader={item.text}
        />
      </CarouselItem>
    );
  });

  return (
    <>
      <div className="mobile-text-container">
        <h3 className="title-mobile">¡Bienvenidos!</h3>
        <p className="text-mobile">
          ¡Encuentra ropa, juguetes y otros artículos en buen estado a precios
          accesibles! Dale una segunda vida a las cosas que ya no usas.
        </p>
      </div>
      {/* <input /> */}
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        {...args}
      >
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel>
    </>
  );
};

export default CarouselImages;
