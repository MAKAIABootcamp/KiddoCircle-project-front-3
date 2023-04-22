import React from "react";
import product from "../../../../assets/coche.png";
import heart from "../../../../assets/icons/heart_mini.svg";
import eye from "../../../../assets/icons/eye_mini.svg";
import Card from "../../../cards/Card";
import { motion } from "framer-motion";

const CardPost = ({product}) => {

    const formatPriceColombian = (number) => {
        // Añadir separador de miles
        if (number) {
            return number
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }
    }

    return (
        <motion.div className="cardPost" whileHover={{ y: -12 }}>
            <div className="cardPost__main">
                <figure>
                    <img
                        src={product?.fotos[0]}
                        alt="product-image"
                        className="cardPost__productImg"
                    />
                </figure>
                <p className="cardPost__mainLetter">{product?.nombre}</p>
                <div className="cardPost__div">
                    <figure>
                        <img src={heart} alt="icono corazon" />
                    </figure>
                    <p>12 favoritos</p>
                </div>
                <div className="cardPost__div">
                    <figure>
                        <img src={eye} alt="icono corazon" />
                    </figure>
                    <p>{`${product?.vistas} vistas`}</p>
                </div>
                {product?.donar ? (
                    <p className="cardPost__donacion">DONACION</p>
                ) : (
                    <p className="cardPost__mainLetter">
                        ${formatPriceColombian(product?.precio)}
                    </p>
                )}
            </div>
            <div>
                {/* <button
                    className="edit__button"
                    onClick={() => setShowClothesForm(!showClothesForm)}
                >
                    Editar publicación
                </button> */}
                {product?.disponibilidad ? (
                    <button className="card__footer-button">Eliminar</button>
                ) : (
                    <p className="cardPost__disponibilidad">
                        NO DISPONIBLE
                    </p>
                )}
            </div>
        </motion.div>
    );
};

export default CardPost;
