import React from "react";
import { useNavigate } from "react-router";
import carritoProduct from "../../../assets/carrito.png";
import cochesitoProduct from "../../../assets/coche.png";
import Card from "../../cards/Card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const PopularsSection = () => {
  const navigate = useNavigate();
  const products = [
    {
      name: "Cochesito",
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
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1024, min: 400 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  return (
    <section className="popular-section">
      <p className="title-text">Productos más populares</p>
      <Carousel responsive={responsive} style={{ justifyContent: "center" }}>
        {products.map((product, index) => (
          <Card
            product={product}
            key={index}
            type={product.donation}
            //onClick={() => navigate(`${product.name}`)}
          />
        ))}
      </Carousel>
    </section>
  );
};

export default PopularsSection;
