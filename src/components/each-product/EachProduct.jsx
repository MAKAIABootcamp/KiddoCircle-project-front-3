import React, { useEffect, useState } from "react";
import coche from "../../assets/coche.png";
import iconHeart from "../../assets/icons/icon empty heart.png";
import iconHeartFull from "../../assets/icons/icon full heart.png";
import donationIcon from "../../assets/icons/forDonation.png";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router";
import Carousel from "react-bootstrap/Carousel";
import iconArrow from "../../assets/icons/iconPinkArrowRight.png";
import PopularSection from "../Home/populars-section/PopularsSection";
import { useDispatch, useSelector } from "react-redux";
import { currentShopAction } from "../../redux/actions/shoppingActions";
import { getProductsActionAsync } from "../../redux/actions/ProductsActions";

const EachProduct = ({ product, type }) => {
    const navigate = useNavigate();
    const [heartFavorites, setHeartFavorites] = useState(false);
    const productsAll = useSelector((state) => state.products.products);
    const user = useSelector((store) => store.user);
    const { currentShopping } = useSelector((store) => store.shopping);
    const { idProducto } = useParams();
    const [productFind, setProductFind] = useState({});
    const dispatch = useDispatch();

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
          const productFilter = productsAll?.find(
              (product) => product.id === idProducto
          );
          setProductFind(productFilter);
    }, [productsAll]);

    const goBack = () => {
        window.history.back();
    };

    const changeHeart = () => {
        setHeartFavorites(!heartFavorites);
        console.log(product);
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
                            {user && user.id && (
                                <button
                                    className="sell-button"
                                    onClick={() => {
                                        addProductCar(product.id);
                                    }}
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
