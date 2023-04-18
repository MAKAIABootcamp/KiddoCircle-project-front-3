import React from "react";
import carritoProduct from "../../../assets/carrito.png";
import cochesitoProduct from "../../../assets/coche.png";
import Card from "../../cards/Card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const PopularsSection = () => {
  const cards = [
    {
      id: 1,
      img: carritoProduct,
      name: "Caminador marca XDD",
      status: "8/10",
      price: 110000,
      type: "donation",
    },
    {
      id: 2,
      img: cochesitoProduct,
      name: "Cochesito marca LOL",
      status: "9/10",
      price: 150000,
      type: "sell",
    },
    {
      id: 2,
      img: cochesitoProduct,
      name: "Cochesito marca LOL",
      status: "9/10",
      price: 150000,
      type: "sell",
    },
    {
      id: 2,
      img: cochesitoProduct,
      name: "Cochesito marca LOL",
      status: "9/10",
      price: 150000,
      type: "sell",
    },
    {
      id: 2,
      img: cochesitoProduct,
      name: "Cochesito marca LOL",
      status: "9/10",
      price: 150000,
      type: "sell",
    },
    {
      id: 2,
      img: cochesitoProduct,
      name: "Cochesito marca LOL",
      status: "9/10",
      price: 150000,
      type: "sell",
    },
    {
      id: 2,
      img: cochesitoProduct,
      name: "Cochesito marca LOL",
      status: "9/10",
      price: 150000,
      type: "sell",
    },
    {
      id: 2,
      img: cochesitoProduct,
      name: "Cochesito marca LOL",
      status: "9/10",
      price: 150000,
      type: "sell",
    },
    {
      id: 2,
      img: cochesitoProduct,
      name: "Cochesito marca LOL",
      status: "9/10",
      price: 150000,
      type: "sell",
    },
    {
      id: 2,
      img: cochesitoProduct,
      name: "Cochesito marca LOL",
      status: "9/10",
      price: 150000,
      type: "sell",
    },
  ];
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1024, min: 400 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  return (
    <section className="popular-section">
      <p className="title-text">Productos más populares</p>
      <Carousel responsive={responsive} style={{ justifyContent: "center" }}>
        {cards.map((product, index) => (
          <Card product={product} key={index} type={product.type} />
        ))}
      </Carousel>
    </section>
  );
};

export default PopularsSection;
