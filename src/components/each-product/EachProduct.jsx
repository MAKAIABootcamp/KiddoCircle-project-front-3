import React, { useEffect, useState } from "react";
import coche from "../../assets/coche.png";
import iconHeart from "../../assets/icons/icon empty heart.png";
import iconHeartFull from "../../assets/icons/icon full heart.png";
import donationIcon from "../../assets/icons/forDonation.png";
import { motion } from "framer-motion";
import { useParams } from "react-router";
import Carousel from "react-bootstrap/Carousel";
import iconArrow from "../../assets/icons/iconPinkArrowRight.png";
import PopularSection from "../Home/populars-section/PopularsSection";
import { useDispatch, useSelector } from "react-redux";
import { currentShopAction } from "../../redux/actions/shoppingActions";
import { getProductsActionAsync } from "../../redux/actions/ProductsActions";
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { dataBase } from "../../firebase/firebaseConfig";
import {
    addDocument,
    filterCollectionMiltiple,
} from "../../services/filterCollection";
import Swal from "sweetalert2";

const EachProduct = ({ product, type }) => {
    const [heartFavorites, setHeartFavorites] = useState(false);
    const productsAll = useSelector((state) => state.products.products);
    const user = useSelector((store) => store.user);
    const { currentShopping } = useSelector((store) => store.shopping);
    const { idProducto } = useParams();
    const [productFind, setProductFind] = useState({});
    const dispatch = useDispatch();
    const [disabledButton, setDisabledButton] = useState(false);

    useEffect(() => {
        if (currentShopping.products && Object.keys(productFind).length !== 0) {
            const isDisabled = currentShopping.products.filter(
                (item) => item.productId === productFind.id
            ).length;
            setDisabledButton(isDisabled > 0);
        }
    }, [currentShopping, productFind]);

    useEffect(() => {
        if (productsAll.length === 0) {
            dispatch(getProductsActionAsync());
        } else {
            const productFilter = productsAll?.find(
                (product) => product.id === idProducto
            );
            setProductFind(productFilter);
        }
    }, []);

    useEffect(() => {
        if (productsAll.length === 0) {
            dispatch(getProductsActionAsync());
        } else {
            const productFilter = productsAll?.find(
                (product) => product.id === idProducto
            );
            setProductFind(productFilter);
        }
    }, [idProducto]);

    useEffect(() => {
        const productFilter = productsAll?.find(
            (product) => product.id === idProducto
        );
        setProductFind(productFilter);
    }, [productsAll]);

    useEffect(() => {
        editVistas();
        printHeart();
    }, [productFind]);

    const printHeart = async () => {
        if (user.isLogged) {
            try {
                const userFavorite = await filterCollectionMiltiple({
                    key1: "productId",
                    value1: productFind.id,
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
                    value1: productFind.id,
                    key2: "userId",
                    value2: user.uid,
                    collectionName: "favorites",
                });
                if (userFavorite.length === 0) {
                    const newProduct = {
                        productId: productFind.id,
                        userId: user.uid,
                    };
                    addDocument("favorites", newProduct)
                        .then(() => {
                            Swal.fire({
                                icon: "success",
                                title: "Prducto agregado a favoritos",
                            });
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
                            where("productId", "==", productFind.id),
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

    const goBack = () => {
        window.history.back();
    };

    //Función para dar el formato de precio
    const formatPrice = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
        Swal.fire({
            icon: "success",
            title: "Producto agregado al carrito!",
            confirmButtonText: "Ok",
        });
    };

    //Función para agregar un view al producto
    const editVistas = async () => {
        console.log(productFind);
        try {
            // Crear una referencia al documento del producto
            const productoRef = doc(dataBase, "products", productFind.id);
            // Actualizar las vistas del producto en Firestore
            const addView = parseInt(productFind.vistas) + 1;
            console.log(addView);
            await updateDoc(productoRef, { vistas: addView });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <figure className="arrow-home-figure">
                <img
                    className="arrow-home"
                    src={iconArrow}
                    alt="icon-come-home"
                    onClick={goBack}
                />
            </figure>
            {productFind ? (
                <main className="main-each-product">
                    <aside className="main-each-product__aside">
                        {productFind.donar ? (
                            <img
                                //className="card__donation"
                                className="icon-donation"
                                src={donationIcon}
                                alt="donation"
                            />
                        ) : (
                            <></>
                        )}
                        <Carousel>
                            {Object.keys(productFind).length !== 0 ? (
                                productFind.fotos.map((foto, index) => (
                                    <Carousel.Item interval={null} key={index}>
                                        <figure className="main-each-product__figure">
                                            <img
                                                className="main-each-product__img"
                                                src={foto}
                                                alt="product"
                                            />
                                        </figure>
                                    </Carousel.Item>
                                ))
                            ) : (
                                <></>
                            )}
                        </Carousel>
                    </aside>
                    <section className="main-each-product__section">
                        <h2>{productFind.nombre}</h2>
                        {productFind?.precio ? (
                            <p className="main-each-product__section-price">
                                ${formatPrice(productFind?.precio)}
                            </p>
                        ) : (
                            <></>
                        )}
                        <p className="main-each-product__section-p">
                            {productFind.descripcion}
                        </p>
                        <p style={{ fontSize: "15px", fontWeight: "bold" }}>
                            Estado: {productFind.estado}
                        </p>
                        {productFind?.talla ? (
                            <p
                                style={{
                                    fontSize: "15px",
                                    fontWeight: "bold",
                                }}
                            >
                                Talla: {productFind.talla}
                            </p>
                        ) : (
                            <></>
                        )}
                        {productFind?.edad ? (
                            <p
                                style={{
                                    fontSize: "1.2rem",
                                    fontWeight: "bold",
                                }}
                            >
                                Edad: {productFind.edad}
                            </p>
                        ) : (
                            <></>
                        )}
                        <div className="buttons-container">
                            {user &&
                                user.id &&
                                productFind.disponibilidad && (
                                    <button
                                        className="sell-button"
                                        onClick={() => {
                                            addProductCar(productFind.id);
                                        }}
                                        disabled={disabledButton}
                                    >
                                        Comprar
                                    </button>
                                )}
                            <motion.button
                                onClick={changeHeart}
                                className="button-favorite"
                                whileTap={{ scale: 0.9 }}
                                whileHover={{ scale: 1.1 }}
                            >
                                <img
                                    className="card__header-heart"
                                    src={
                                        heartFavorites
                                            ? iconHeartFull
                                            : iconHeart
                                    }
                                    alt="heart-icon"
                                />
                            </motion.button>
                        </div>
                    </section>
                </main>
            ) : (
                <></>
            )}
            <PopularSection />
        </>
    );
};

export default EachProduct;
