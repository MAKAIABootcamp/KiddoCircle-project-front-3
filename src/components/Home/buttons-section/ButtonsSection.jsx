import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./buttonsSection.scss";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ButtonsSection = () => {
  const navigate = useNavigate();
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
    <section className="buttons-section">
      {/* <Carousel responsive={responsive} style={{ justifyContent: "center" }}> */}
      <motion.div
        onClick={() => navigate("/ropa")}
        whileHover={{ rotate: 10 }}
        className="buttons-section__button"
      >
        <h1 className="buttons-section__title">Ropa</h1>
      </motion.div>
      <motion.div
        onClick={() => navigate("/juguetes")}
        className="buttons-section__button2"
        whileHover={{ rotate: 10 }}
      >
        <h1 className="buttons-section__title">Juguetes</h1>
      </motion.div>
      <motion.div
        onClick={() => navigate("/articulos")}
        className="buttons-section__button3"
        whileHover={{ rotate: 10 }}
      >
        <h1 className="buttons-section__title">Artículos</h1>
      </motion.div>
      {/* </Carousel> */}
    </section>
  );
};

export default ButtonsSection;
