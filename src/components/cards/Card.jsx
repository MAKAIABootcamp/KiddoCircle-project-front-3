import React, { useState } from "react";
import iconHeart from "../../assets/icons/icon empty heart.png";
import iconHeartFull from "../../assets/icons/icon full heart.png";
import donationIcon from "../../assets/icons/forDonation.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Card = ({ product, type }) => {
  const navigate = useNavigate();
  const [heartFavorites, setHeartFavorites] = useState(false);

  const changeHeart = () => {
    setHeartFavorites(!heartFavorites);
    console.log(product);
  };

  const handleRoute = (product) => {
    navigate(`${product.name}`);
  };

  return (
    <>
      <motion.div className="card" whileHover={{ y: -12 }}>
        {type === true ? (
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
              onClick={() => changeHeart(product)}
              className="card__header-heart"
              src={heartFavorites ? iconHeartFull : iconHeart}
              alt="heart-icon"
            />
          </motion.button>
          <figure className="card__figure">
            <img
              className="card__figure-img"
              src={product?.photo[0]}
              alt="product-image"
              onClick={() => handleRoute(product)}
            />
          </figure>
        </header>
        <footer className="card__footer">
          <p className="card__footer-name">{product?.name}</p>
          <p className="card__footer-state">{product?.status}</p>
          <p className="card__footer-price">{product?.price}</p>
          <button
            className="card__footer-button"
            onClick={() => {
              navigate("/cart-shooping");
            }}
          >
            Comprar
          </button>
        </footer>
      </motion.div>
    </>
  );
};

export default Card;
