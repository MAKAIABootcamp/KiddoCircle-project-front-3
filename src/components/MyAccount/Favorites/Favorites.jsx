import React, { useState, useEffect } from "react";
import { filterCollection } from "../../../services/filterCollection";
import { useSelector } from "react-redux";
import Card from "../../cards/Card";
import LottieNoFav from "./LottieNoFav";

const Favorites = () => {
    const [productFavorites, setProductFavorites] = useState([]);
    const user = useSelector((store) => store.user);
    const products = useSelector((state) => state.products.products);

    useEffect(() => {
        printFavorites();
    }, []);

    const printFavorites = async () => {
        try {
            const getFavorites = await filterCollection({
                key: "userId",
                value: user.uid,
                collectionName: "favorites",
            });
            const favoritesIds = getFavorites.map(
                (favorite) => favorite.productId
            );
            const filteredProducts = products.filter((product) =>
                favoritesIds.includes(product.id)
            );
            setProductFavorites(filteredProducts);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section
            className="posts__cards__container"
            style={{
                display: "flex",
                justifyContent: `${
                    productFavorites.length ? "flex-start" : "center"
                }`,
            }}
        >
            {productFavorites.length === 0 ? (
                <div className="posts__cards__container__lottie">
                    <LottieNoFav play={true} />
                    <p className="posts__cards__container__lottie">
                        Aún no tienes productos favoritos, cuando los tengas
                        podrás verlos aquí.
                    </p>
                </div>
            ) : (
                productFavorites.map((product, index) => (
                    <Card
                        product={product}
                        key={index}
                        onFavoriteChange={printFavorites}
                    />
                ))
            )}
        </section>
    );
};

export default Favorites;
