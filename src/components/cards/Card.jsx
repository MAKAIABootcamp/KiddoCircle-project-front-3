import React, { useState } from "react";
import iconHeart from "../../assets/icons/icon empty heart.png";
import iconHeartFull from "../../assets/icons/icon full heart.png";
import imageProduct from "../../assets/carrito.png";
import { motion } from "framer-motion";

const Card = () => {
  const [heartFavorites, setHeartFavorites] = useState(false);

  const changeHeart = () => {
    setHeartFavorites(!heartFavorites);
  };

  return (
    <motion.div className="card" whileHover={{ y: -12 }}>
      <header className="card__header">
        <motion.button
          className="card__header-container"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {" "}
          <img
            onClick={changeHeart}
            className="card__header-heart"
            src={heartFavorites ? iconHeartFull : iconHeart}
            alt="heart-icon"
          />
        </motion.button>
        <figure className="card__figure">
          <img
            className="card__figure-img"
            src={imageProduct}
            alt="product-image"
          />
        </figure>
      </header>
      <footer className="card__footer">
        <p className="card__footer-name">Cochesito marca XDD</p>
        <p className="card__footer-state">Estado: 8/10</p>
        <p className="card__footer-price">$150.000</p>
        <button className="card__footer-button">Comprar</button>
      </footer>
    </motion.div>
  );
};

export default Card;
