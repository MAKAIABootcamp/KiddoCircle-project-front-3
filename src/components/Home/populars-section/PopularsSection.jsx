import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import carritoProduct from "../../../assets/carrito.png";
import cochesitoProduct from "../../../assets/coche.png";
import Card from "../../cards/Card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";

const PopularsSection = () => {

  const products = useSelector((state) => state.products.products);
  const [productsFiltered, setProductsFiltered] = useState([]);

  useEffect(() => {
    print();
  }, [products]);

  const print = () => {
      const filterProducts = products.filter(
          (product) =>
              product.categoria === "articulos" &&
              product.disponibilidad === true
      );
      setProductsFiltered(filterProducts);
  };

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
          <Carousel
              responsive={responsive}
              style={{ justifyContent: "center" }}
          >
              {productsFiltered.map((product, index) => (
                  <Card
                      product={product}
                      key={index}
                      onFavoriteChange={print}
                  />
              ))}
          </Carousel>
      </section>
  );
};

export default PopularsSection;
