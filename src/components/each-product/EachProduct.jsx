import React, { useState } from "react";
import coche from "../../assets/coche.png";
import iconHeart from "../../assets/icons/icon empty heart.png";
import iconHeartFull from "../../assets/icons/icon full heart.png";
import donationIcon from "../../assets/icons/forDonation.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import Carousel from "react-bootstrap/Carousel";
import iconArrow from "../../assets/icons/iconPinkArrowRight.png";

const EachProduct = ({ product, type }) => {
  const navigate = useNavigate();
  const [heartFavorites, setHeartFavorites] = useState(false);

  const changeHeart = () => {
    setHeartFavorites(!heartFavorites);
    console.log(product);
  };

  return (
    <>
      <figure className="arrow-home-figure">
        <img
          className="arrow-home"
          src={iconArrow}
          alt="icon-come-home"
          onClick={() => navigate("/")}
        />
      </figure>
      <main className="main-each-product">
        <aside className="main-each-product__aside">
          {type === true ? (
            <img className="card__donation" src={donationIcon} alt="donation" />
          ) : (
            <></>
          )}
          <Carousel>
            <Carousel.Item interval={null}>
              <img
                className="main-each-product__img"
                src={coche}
                alt="product"
              />
            </Carousel.Item>
            <Carousel.Item interval={null}>
              <img
                className="main-each-product__img"
                src={coche}
                alt="product"
              />
            </Carousel.Item>
            <Carousel.Item interval={null}>
              <img
                className="main-each-product__img"
                src={coche}
                alt="product"
              />
            </Carousel.Item>
          </Carousel>
        </aside>
        <section className="main-each-product__section">
          <h2>Cochesito bebé marca XD</h2>
          <p className="main-each-product__section-p">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat,
            molestiae eum qui natus animi id, corporis similique, beatae a quia
            iste repellendus nulla labore aspernatur! In exercitationem dolorem
            harum nemo.
          </p>
          <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Estado: 8/10</p>
          <button className="sell-button">Comprar</button>
          <motion.button
            onClick={changeHeart}
            className="button-favorite"
            whileTap={{ scale: 0.9 }}
          >
            <img
              className="card__header-heart"
              src={heartFavorites ? iconHeartFull : iconHeart}
              alt="heart-icon"
            />
            Agregar a favoritos
          </motion.button>
        </section>
      </main>
    </>
  );
};

export default EachProduct;
