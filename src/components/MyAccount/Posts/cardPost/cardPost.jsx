import React from "react";
import heart from "../../../../assets/icons/heart_mini.svg";
import eye from "../../../../assets/icons/eye_mini.svg";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { dataBase } from "../../../../firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

const CardPost = ({ product, onDisponibilidadChange }) => {
    const formatPriceColombian = (number) => {
        // Añadir separador de miles
        if (number) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
    };

    const editDisponibilidad = async () => {
        try {
            // Crear una referencia al documento del producto
            const productoRef = doc(dataBase, "products", product.id);
            // Actualizar la disponibilidad del producto en Firestore
            await updateDoc(productoRef, { disponibilidad: false });
            onDisponibilidadChange();
            Swal.fire({
                icon: "success",
                title: "Solicitud exitosa. El producto ya no se encontrará disponible.",
                confirmButtonText: "Ok",
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Uups...",
                text: "Hubo un error al realizar la solictud",
            });
        }
    };

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
                    <button
                        className="card__footer-button"
                        onClick={editDisponibilidad}
                    >
                        Eliminar
                    </button>
                ) : (
                    <p className="cardPost__disponibilidad">NO DISPONIBLE</p>
                )}
            </div>
            {product?.disponibilidad ? (
                ""
            ) : (
                <div className="cardPost__fill"></div>
            )}
        </motion.div>
    );
};

export default CardPost;
