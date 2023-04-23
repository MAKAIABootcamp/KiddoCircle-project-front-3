import React, { useState } from "react";
import coche from "../../assets/coche.png";
import iconHeart from "../../assets/icons/icon empty heart.png";
import iconHeartFull from "../../assets/icons/icon full heart.png";
import donationIcon from "../../assets/icons/forDonation.png";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router";
import Carousel from "react-bootstrap/Carousel";
import iconArrow from "../../assets/icons/iconPinkArrowRight.png";
import PopularSection from "../Home/populars-section/PopularsSection";

const EachProduct = ({ product, type }) => {
  const navigate = useNavigate();
  const [heartFavorites, setHeartFavorites] = useState(false);
  let { productName } = useParams();

  const products = [
    {
      name: "Cochesito",
      id: "oHCpmQmjk9yWcFj12cEd",
      description: "cochesito en buen estado marca x",
      category: "ropa",
      sub_category: "camisas",
      genero: "niño",
      talla: "3M",
      estado: 7,
      donation: false,
      sale: true,
      price: 50000,
      id_publisher: "FSERG51WER65G41WTR5G1VRF5",
      photo: [
        "https://babymania.com.co/wp-content/uploads/2021/01/ALIZZE-Negro_imagen6.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR85biEYHshUtteR0klyQy_af1BlrKlLXtVez3PAVqp-7mZj55vSHObS0RoQcFTnYwoNNs&usqp=CAU",
        "https://babymania.com.co/wp-content/uploads/2021/01/ALIZZE-Negro_imagen10.jpg",
      ],
    },
    {
      name: "pañalera",
      description: "pañalera en buen estado, poco uso marca bebé",
      category: "items",
      sub_category: "Morrales",
      genero: "Unisex",
      talla: "",
      estado: 7,
      donation: false,
      sale: true,
      price: 50000,
      id_publisher: "FSERG51WER65G41WTR5G1VRF5",
      photo: [
        "https://http2.mlstatic.com/D_NQ_NP_650231-MCO45188082656_032021-O.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS68IxpZ8QbDQysEY7ikYaw6u4nMkBfGT_ZtfgL97A_AydyKxblmYpnHm4CBiBzvh6-6TM&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHNc4C2pKFiAFYz8uJAY2y6aHPswzTKWW3yC0hKDG08e6i7MXolm-o4dVeurAAPP7oV5w&usqp=CAU",
      ],
    },
    {
      name: "cuna",
      description: "Cuna en muy buen estado",
      category: "items",
      sub_category: "cuna",
      genero: "Unisex",
      talla: "",
      estado: 10,
      donation: true,
      sale: false,
      price: 80000,
      id_publisher: "FSERG51WER65G41WTR5G1VRF565",
      photo: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5N7EnmOKg27R9mOjY9A48U8V1PO_dZEcsynvTau6HBKt5rhySndAOL6mJYVhqufaaLMM&usqp=CAU",
        "https://babyexplorer.co/wp-content/uploads/2019/05/cuna-madera-bebe2.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPUKl2PgR6Ygh9lnHT2qAO5Xd4-6TJK3PBXexrJ0TakcpeMwR1QNKmzABcTmVohodsuZw&usqp=CAU",
      ],
    },
    {
      name: "camiseta",
      description: "camiseta para niña con poco uso",
      category: "ropa",
      sub_category: "camisas",
      genero: "Niña",
      talla: "12M",
      estado: 10,
      donation: true,
      sale: false,
      price: 80000,
      id_publisher: "FSERG51WER65G41WTR5G1VRF565",
      photo: [
        "https://falabella.scene7.com/is/image/FalabellaCO/882367109_1?wid=1004&hei=1500&crop=248,0,1004,1500&qlt=70",
        "https://falabella.scene7.com/is/image/FalabellaCO/882367109_1?wid=1004&hei=1500&crop=248,0,1004,1500&qlt=70",
        "https://falabella.scene7.com/is/image/FalabellaCO/882367109_1?wid=1004&hei=1500&crop=248,0,1004,1500&qlt=70",
      ],
    },
    {
      name: "tenis",
      description: "tenis en buen estado marca xxxxx",
      category: "ropa",
      sub_category: "zapatos",
      genero: "Niño",
      talla: "18M",
      estado: 10,
      donation: true,
      sale: false,
      price: 80000,
      id_publisher: "FSERG51WER65G41WTR5G1VRF565",
      photo: [
        "https://carulla.vtexassets.com/arquivos/ids/10015923/Tenis-Nino-Velcro-PEOPLE-SA0415K-3176473_a.jpg?v=638054755304070000",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-8h8TdG5FvefjXmIvdvJEYdZOgvCVKLgNnMqUyZaHf88Xdk2XXfX1hnWOVOX4SaNBJt8&usqp=CAU",
        "3https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-8h8TdG5FvefjXmIvdvJEYdZOgvCVKLgNnMqUyZaHf88Xdk2XXfX1hnWOVOX4SaNBJt8&usqp=CAU",
      ],
    },
  ];

  let productFind = products?.find((product) => product.name === productName);
  // console.log(productFind);

  const changeHeart = () => {
    setHeartFavorites(!heartFavorites);
    console.log(product);
  };

  return (
    <>
      <figure className="arrow-home-figure">
        <img
          className="arrow-home"
          src={iconArrow}
          alt="icon-come-home"
          onClick={() => navigate("/")}
        />
      </figure>
      {productFind ? (
        <main className="main-each-product">
          <aside className="main-each-product__aside">
            {productFind.donation === true ? (
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
              <Carousel.Item interval={null}>
                <figure className="main-each-product__figure">
                  <img
                    className="main-each-product__img"
                    src={productFind?.photo[0]}
                    alt="product"
                  />
                </figure>
              </Carousel.Item>
              <Carousel.Item interval={null}>
                <figure className="main-each-product__figure">
                  <img
                    className="main-each-product__img"
                    src={productFind?.photo[1]}
                    alt="product"
                  />
                </figure>
              </Carousel.Item>
              <Carousel.Item interval={null}>
                <figure className="main-each-product__figure">
                  <img
                    className="main-each-product__img"
                    src={productFind?.photo[2]}
                    alt="product"
                  />
                </figure>
              </Carousel.Item>
            </Carousel>
          </aside>
          <section className="main-each-product__section">
            <h2>{productFind.name}</h2>
            <p className="main-each-product__section-price">
              $ {productFind.price}
            </p>
            <p className="main-each-product__section-p">
              {productFind.description}
            </p>
            <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              Estado: {productFind.estado}/10
            </p>
            {productFind.talla !== "" ? (
              <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                Talla: {productFind.talla}
              </p>
            ) : (
              <></>
            )}
            <div className="buttons-container">
              <button className="sell-button">Comprar</button>
              <motion.button
                onClick={changeHeart}
                className="button-favorite"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
              >
                <img
                  className="card__header-heart"
                  src={heartFavorites ? iconHeartFull : iconHeart}
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
