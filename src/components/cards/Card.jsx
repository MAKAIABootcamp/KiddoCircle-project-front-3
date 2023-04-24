import React, { useState, useEffect } from "react";
import iconHeart from "../../assets/icons/icon empty heart.png";
import iconHeartFull from "../../assets/icons/icon full heart.png";
import donationIcon from "../../assets/icons/forDonation.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { currentShopAction } from "../../redux/actions/shoppingActions";

const Card = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [heartFavorites, setHeartFavorites] = useState(false);
    const [disabledButton, setDisabledButton] = useState(false);
    const { currentShopping } = useSelector((store) => store.shopping);
    const user = useSelector((store) => store.user);

    useEffect(() => {
        if (currentShopping.products) {
            const isDisabled = currentShopping.products.filter(
                (item) => item.productId === product.id
            ).length;
            setDisabledButton(isDisabled > 0);
        }
    }, [currentShopping]);

    const changeHeart = () => {
        setHeartFavorites(!heartFavorites);
    };

    const handleRoute = (product) => {
        navigate(`${product.nombre}`);
    };

    const addProductCar = (product) => {
        const newShopping = { ...currentShopping };
        if (Object.keys(newShopping).length === 0) {
            newShopping.date = new Date().toISOString();
            newShopping.userId = user.id;
            newShopping.products = [];
        }
        const addProduct = {
            productId: product,
            status: "Pendiente",
        };
        newShopping.products = [
            ...(newShopping.products || []),
            {
                ...addProduct,
            },
        ];
        dispatch(currentShopAction(newShopping));
    };

    //Función para dar el formato de precio
    const formatPrice = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    return (
        <div className="card">
            <motion.div
                whileHover={{ y: -12 }}
                onClick={() => handleRoute(product)}
            >
                {product.donar ? (
                    <img
                        className="card__donation"
                        src={donationIcon}
                        alt="donation"
                    />
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
                            src={product?.fotos[0]}
                            alt="product-image"
                        />
                    </figure>
                </header>
                <footer className="card__footer">
                    <p className="card__footer-name">{product?.nombre}</p>
                    <p className="card__footer-state">{product?.estado}</p>
                    {product?.price ? (
                        <p className="card__footer-price">
                            ${formatPrice(product?.precio)}
                        </p>
                    ) : (
                        <></>
                    )}
                </footer>
            </motion.div>
            {user && user.id && (
                <button
                    className="card__footer-button"
                    onClick={() => {
                        addProductCar(product.id);
                    }}
                    disabled={disabledButton}
                >
                    Comprar
                </button>
            )}
        </div>
    );
};

export default Card;
