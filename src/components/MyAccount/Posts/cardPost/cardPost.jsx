import React, { useEffect, useState } from "react";
import heart from "../../../../assets/icons/heart_mini.svg";
import eye from "../../../../assets/icons/eye_mini.svg";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { dataBase } from "../../../../firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { filterCollection } from "../../../../services/filterCollection";
import { useNavigate } from "react-router-dom";

const CardPost = ({ product, onDisponibilidadChange }) => {
    const [fav, setFav] = useState(0);
    const navigate = useNavigate();

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
                text: "Hubo un error al realizar la solicitud",
            });
        }
    };

    useEffect(() => {
        getFavorites();
    }, []);

    const getFavorites = async() => {
        const resultFavorites = await filterCollection({
            key: "productId",
            value: product.id,
            collectionName: "favorites",
        });
        setFav(resultFavorites.length);
    }

    const handleRoute = (product) => {
        if (product?.disponibilidad) {
            navigate(`/producto/${product.id}`);
        } else {
            Swal.fire({
                icon: "error",
                title: "Uups...",
                text: "El producto ya no se encuentra disponible.",
            });
        }
    };

    return (
        <motion.div
            className="cardPost"
            whileHover={{ y: -12 }}
            onClick={() => handleRoute(product)}
        >
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
                    <p>{`${fav} favoritos`}</p>
                </div>
                <div className="cardPost__div">
                    <figure>
                        <img src={eye} alt="icono corazon" />
                    </figure>
                    <p>{`${product?.vistas} vistas`}</p>
                </div>
                {product?.donar ? (
                    <p className="cardPost__donacion">Donación</p>
                ) : (
                    <p className="cardPost__mainLetter">
                        ${formatPriceColombian(product?.precio)}
                    </p>
                )}
            </div>
            <div>
                {product?.disponibilidad ? (
                    <button
                        className="card__footer-button"
                        onClick={(event) => { event.stopPropagation(); editDisponibilidad(); } }
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
