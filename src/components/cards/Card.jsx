import React, { useState, useEffect } from "react";
import iconHeart from "../../assets/icons/icon empty heart.png";
import iconHeartFull from "../../assets/icons/icon full heart.png";
import donationIcon from "../../assets/icons/forDonation.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { currentShopAction } from "../../redux/actions/shoppingActions";
import Swal from "sweetalert2";
import { addDocument, filterCollectionMiltiple } from "../../services/filterCollection";
import { collection, deleteDoc, getDocs, query, where } from "firebase/firestore";
import { dataBase } from "../../firebase/firebaseConfig";

const Card = ({ product, onFavoriteChange }) => {
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

    useEffect(() => {
        printHeart();
    }, []);

    const printHeart = async () => {
        if (user.isLogged) {
            try {
                const userFavorite = await filterCollectionMiltiple({
                    key1: "productId",
                    value1: product.id,
                    key2: "userId",
                    value2: user.uid,
                    collectionName: "favorites",
                });
                console.log(userFavorite);
                if (userFavorite.length === 0) {
                    setHeartFavorites(false);
                } else {
                    setHeartFavorites(true);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const changeHeart = async () => {
        if (user.isLogged) {
            try {
                const userFavorite = await filterCollectionMiltiple({
                    key1: "productId",
                    value1: product.id,
                    key2: "userId",
                    value2: user.uid,
                    collectionName: "favorites",
                });
                if (userFavorite.length === 0) {
                    const newProduct = {
                        productId: product.id,
                        userId: user.uid,
                    };
                    addDocument("favorites", newProduct)
                        .then(() => {
                            Swal.fire({
                                icon: "success",
                                title: "Prducto agregado a favoritos",
                            });
                            if (onFavoriteChange) {
                                onFavoriteChange();
                            }
                        })
                        .catch((error) => {
                            Swal.fire({
                                icon: "error",
                                title: "Uups...",
                                text: "Hubo un error al realizar la solictud",
                            });
                        });
                    setHeartFavorites(true);
                } else {
                    const collections = collection(dataBase, "favorites");
                    const querySnapshot = await getDocs(
                        query(
                            collections,
                            where("productId", "==", product.id),
                            where("userId", "==", user.uid)
                        )
                    );
                    if (!querySnapshot.empty) {
                        const docRef = querySnapshot.docs[0].ref;
                        deleteDoc(docRef)
                            .then(() => {
                                Swal.fire({
                                    icon: "success",
                                    title: "Prducto eliminado de favoritos",
                                });
                                if (onFavoriteChange) {
                                    onFavoriteChange();
                                }
                            })
                            .catch((error) => {
                                Swal.fire({
                                    icon: "error",
                                    title: "Uups...",
                                    text: "Hubo un error al realizar la solictud",
                                });
                            });
                    }
                    setHeartFavorites(false);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleRoute = (product) => {
        navigate(`/producto/${product.id}`);
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
                            // onClick={changeHeart}
                            onClick={(event) => {
                                event.stopPropagation();
                                changeHeart();
                            }}
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
                    <p className="card__footer-state">{`Estado: ${product?.estado}`}</p>
                    {product?.precio ? (
                        <p className="card__footer-price">
                            ${formatPrice(product.precio)}
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
