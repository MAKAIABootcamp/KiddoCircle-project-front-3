import React, { useEffect, useState } from "react";
import Card from "../../cards/Card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";

export const FavoritesSection = () => {

  const products = useSelector((state) => state.products.products);
  const [productsFiltered, setProductsFiltered] = useState([]);

  useEffect(() => {
      const filterProducts = products.filter(
          (product) => product.categoria === "articulos"
      );
      console.log(filterProducts);
      setProductsFiltered(filterProducts);
  }, [products]);

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
          <p className="title-text">Artículos favoritos</p>
          <Carousel
              responsive={responsive}
              style={{ justifyContent: "center" }}
          >
              {productsFiltered.map((product, index) => (
                  <Card product={product} key={index} />
              ))}
          </Carousel>
      </section>
  );
};

export default FavoritesSection;
