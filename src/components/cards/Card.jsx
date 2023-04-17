import React, { useState } from "react";
import iconHeart from "../../assets/icons/icon empty heart.png";
import iconHeartFull from "../../assets/icons/icon full heart.png";
import donationIcon from "../../assets/icons/forDonation.png";
import { motion } from "framer-motion";

const Card = ({ product, type }) => {
  const [heartFavorites, setHeartFavorites] = useState(false);

  const changeHeart = () => {
    setHeartFavorites(!heartFavorites);
    console.log(product);
  };

  return (
    <motion.div className="card" whileHover={{ y: -12 }}>
      {type === "donation" ? (
        <img className="card__donation" src={donationIcon} alt="donation" />
      ) : (
        <></>
      )}
      <header className="card__header">
        <motion.button
          className="card__header-container"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
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
            src={product.img}
            alt="product-image"
          />
        </figure>
      </header>
      <footer className="card__footer">
        <p className="card__footer-name">{product.name}</p>
        <p className="card__footer-state">{product.status}</p>
        <p className="card__footer-price">{product.price}</p>
        <button className="card__footer-button">Comprar</button>
      </footer>
    </motion.div>
  );
};

export default Card;
