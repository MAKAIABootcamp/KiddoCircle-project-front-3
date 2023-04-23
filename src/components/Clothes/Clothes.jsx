import React, { useEffect, useState } from "react";
import Card from "../cards/Card";
import arrowUp from "../../assets/icons/pink_arrow_up.svg";
import xIcon from "../../assets/icons/x_pink.svg";
import filterIcon from "../../assets/icons/filterIcon.svg";
import whiteArrow from "../../assets/icons/white_arrow_up.svg";
import "animate.css";
import { motion } from "framer-motion";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Clothes = () => {
  const [showSubCategory, setShowSubCategory] = useState(false);
  const [showGender, setShowGender] = useState(false);
  const [showSize, setShowSize] = useState(false);
  const [showState, setShowState] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showFilterFlex, setShowFilterFlex] = useState(false);
  const [showOrdersMobile, setShowOrdersMobile] = useState(false);
  const [optionSelected, setOptionSelected] = useState("Más reciente");
  const [range, setRange] = useState([0, 200000]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [filter, setFilter] = useState([
    {
      name: "sub_category",
      items: [],
    },
    {
      name: "genero",
      items: [],
    },
    {
      name: "talla",
      items: [],
    },
    {
      name: "estado",
      items: [],
    },
    {
      name: "price",
      items: [],
    },
  ]);

  const products = [
    {
      name: "cochesito",
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
      photo: ["1", "2", "3"],
    },
    {
      name: "cochesito",
      description: "cochesito en buen estado marca x",
      category: "ropa",
      sub_category: "camisas",
      genero: "niño",
      talla: "6M",
      estado: 7,
      donation: false,
      sale: true,
      price: 50000,
      id_publisher: "FSERG51WER65G41WTR5G1VRF5",
      photo: ["1", "2", "3"],
    },
    {
      name: "cuna",
      description: "cochesito en buen estado marca xxxxx",
      category: "ropa",
      sub_category: "faldas",
      genero: "niña",
      talla: "9M",
      estado: 10,
      donation: true,
      sale: false,
      price: 80000,
      id_publisher: "FSERG51WER65G41WTR5G1VRF565",
      photo: ["1", "2", "3"],
    },
    {
      name: "cuna",
      description: "cochesito en buen estado marca xxxxx",
      category: "ropa",
      sub_category: "faldas",
      genero: "niña",
      talla: "12M",
      estado: 10,
      donation: true,
      sale: false,
      price: 80000,
      id_publisher: "FSERG51WER65G41WTR5G1VRF565",
      photo: ["1", "2", "3"],
    },
    {
      name: "tenis",
      description: "tenia en buen estado marca xxxxx",
      category: "ropa",
      sub_category: "zapatos",
      genero: "unisex",
      talla: "18M",
      estado: 10,
      donation: true,
      sale: false,
      price: 80000,
      id_publisher: "FSERG51WER65G41WTR5G1VRF565",
      photo: ["1", "2", "3"],
    },
  ];

  const subCategory = [
    "Camisas",
    "Faldas",
    "Leggings, shorts y joggers",
    "Vestidos",
    "Buzos y Chaquetas",
    "Zapatos",
    "Trajes de baño",
    "Conjuntos",
    "Medias",
    "Bodys",
    "Gorros",
    "Pijama",
    "Otros",
  ];

  const gender = ["Niña", "Niño", "Unisex"];

  const sizes = [
    "RN",
    "3M",
    "6M",
    "9M",
    "12M",
    "18M",
    "24M",
    "2T",
    "3T",
    "4T",
    "5T",
    "4",
    "6",
    "8",
    "10",
    "12",
    "14",
    "16",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
  ];

  const state = [6, 7, 8, 9, 10];

  const orderOptions = [
    "Alfabéticamente, A-Z",
    "Alfabéticamente, Z-A",
    "Precio, menor a mayor",
    "Precio, mayor a menor",
    "Estado, menor a mayor",
    "Estado, mayor a menor",
    "Más antiguo",
    "Más reciente",
  ];

  //Función para limpiar los filtros
  const clearFilters = () => {
    setFilter([
      {
        name: "sub_category",
        items: [],
      },
      {
        name: "genero",
        items: [],
      },
      {
        name: "talla",
        items: [],
      },
      {
        name: "estado",
        items: [],
      },
      {
        name: "price",
        items: [],
      },
    ]);
  };

  const toogleSelectFilter = (name, item) => {
    setFilter((prevFilter) => {
      // Buscar el objeto dentro del array filter que tenga el nombre especificado
      const objIndex = prevFilter.findIndex((obj) => obj.name === name);
      if (objIndex === -1) {
        // Si el objeto no existe en el array, no hagas nada
        return prevFilter;
      }
      const obj = prevFilter[objIndex];
      const items = obj.items.slice();
      // Verificar si el item ya existe en el array de items
      const itemIndex = items.indexOf(item);
      if (itemIndex === -1) {
        // Si el item no existe en el array, agregarlo
        items.push(item);
      } else {
        // Si el item ya existe en el array, eliminarlo
        items.splice(itemIndex, 1);
      }
      // Crear un nuevo array filter que incluya el objeto actualizado
      const updatedFilter = prevFilter.slice();
      updatedFilter[objIndex] = { ...obj, items };
      return updatedFilter;
    });
  };

  const formatPrice = (value) => {
    return `$${value}`;
  };

  const handleOrderOption = (item) => {
    setOptionSelected(item);
    setShowOrders(!showOrders);
  };

  const handleOrderOptionMobile = (item) => {
    setOptionSelected(item);
    setShowOrdersMobile(!showOrdersMobile);
  };

  useEffect(() => {
    setProductsFiltered(products);
  }, []);

  useEffect(() => {
    console.log(filter);
    filterProducts(filter, products);
  }, [filter]);

  useEffect(() => {
    console.log(productsFiltered);
  }, [productsFiltered]);

  //

  const filterProducts = (filters, products) => {
    // Filtramos los productos basados en las propiedades del objeto de filtrado
    const filteredProducts = products.filter((product) => {
      // Verificamos que la subcategoría del producto se encuentre en el array de subcategorías filtradas
      if (
        filters.some(
          (item) =>
            item.name === "sub_category" &&
            item.items.some(
              (subCategory) =>
                subCategory.toLowerCase() === product.sub_category.toLowerCase()
            )
        )
      ) {
        // Verificamos que el género del producto se encuentre en el array de géneros filtrados
        if (
          filters.some(
            (item) =>
              item.name === "genero" &&
              item.items.some(
                (subCategory) =>
                  subCategory.toLowerCase() === product.genero.toLowerCase()
              )
          )
        ) {
          // Verificamos que la talla del producto se encuentre en el array de tallas filtradas
          if (
            filters.some(
              (item) =>
                item.name === "talla" &&
                item.items.some(
                  (subCategory) =>
                    subCategory.toLowerCase() === product.talla.toLowerCase()
                )
            )
          ) {
            return true;
            // Verificamos que el estado del producto se encuentre en el array de estados filtrados
            // if (
            //     filter.some(
            //         (item) =>
            //             item.name === "estado" &&
            //             item.items.includes(product.estado)
            //     )
            // ) {
            //     return true; // Si todas las condiciones se cumplen, devolvemos el producto
            // }
          }
        }
      }
      return false; // Si no se cumplen todas las condiciones, no devolvemos el producto
    });

    console.log(productsFiltered);

    setProductsFiltered(filteredProducts);
  };

  return (
    <section className="clothes">
      <header className="clothes__header">
        <h1>ROPA</h1>
      </header>
      <section className="clothes__asideYMain">
        <aside className="clothes__asideYMain__aside">
          <div className="clothes__asideYMain__aside__tittle">
            <h2>FILTROS</h2>
            <span onClick={clearFilters}>LIMPIAR TODO</span>
          </div>
          <div className="clothes__asideYMain__aside__options">
            <p>Filtrado Por:</p>
            <div className="clothes__asideYMain__aside__options__container">
              {filter.map((obj, index) =>
                obj.items.length
                  ? obj.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="clothes__asideYMain__aside__options__option"
                      >
                        <div
                          style={{
                            backgroundColor: "#FA897B",
                          }}
                        ></div>
                        <p>{item}</p>
                      </div>
                    ))
                  : null
              )}
            </div>
          </div>
          <div className="clothes__asideYMain__aside__filter">
            <p>Sub-Categoría</p>
            <i>
              <img
                src={arrowUp}
                alt="arrow up icon"
                onClick={() => setShowSubCategory(!showSubCategory)}
                style={{
                  transform: showSubCategory ? "none" : "rotate(180deg)",
                }}
              />
            </i>
          </div>
          {showSubCategory ? (
            <motion.div
              className="clothes__asideYMain__aside__options__selectsScroller"
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: 1,
                y: showSubCategory ? 0 : -20,
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="clothes__asideYMain__aside__options__selectsScroller__scroll">
                {subCategory.map((item, index) =>
                  filter.some(
                    (obj) =>
                      obj.name === "sub_category" && obj.items.includes(item)
                  ) ? (
                    <div
                      className="clothes__asideYMain__aside__options__option"
                      key={index}
                    >
                      <div
                        onClick={() => toogleSelectFilter("sub_category", item)}
                        style={{
                          backgroundColor: "#FA897B",
                        }}
                      ></div>
                      <p>{item}</p>
                    </div>
                  ) : (
                    <div
                      className="clothes__asideYMain__aside__options__option"
                      key={index}
                    >
                      <div
                        onClick={() => toogleSelectFilter("sub_category", item)}
                      ></div>
                      <p>{item}</p>
                    </div>
                  )
                )}
              </div>
            </motion.div>
          ) : (
            <></>
          )}
          <div className="clothes__asideYMain__aside__filter">
            <p>Género</p>
            <i>
              <img
                src={arrowUp}
                alt="arrow up icon"
                onClick={() => setShowGender(!showGender)}
                style={{
                  transform: showGender ? "none" : "rotate(180deg)",
                }}
              />
            </i>
          </div>
          {showGender ? (
            <motion.div
              className="clothes__asideYMain__aside__multipleOp"
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: 1,
                y: showGender ? 0 : -20,
              }}
              transition={{ duration: 0.5 }}
            >
              {gender.map((item, index) =>
                filter.some(
                  (obj) => obj.name === "genero" && obj.items.includes(item)
                ) ? (
                  <div
                    className="clothes__asideYMain__aside__options__option"
                    key={index}
                  >
                    <div
                      onClick={() => toogleSelectFilter("genero", item)}
                      style={{
                        backgroundColor: "#FA897B",
                      }}
                    ></div>
                    <p>{item}</p>
                  </div>
                ) : (
                  <div
                    className="clothes__asideYMain__aside__options__option"
                    key={index}
                  >
                    <div
                      onClick={() => toogleSelectFilter("genero", item)}
                    ></div>
                    <p>{item}</p>
                  </div>
                )
              )}
            </motion.div>
          ) : (
            <></>
          )}
          <div className="clothes__asideYMain__aside__filter">
            <p>Talla</p>
            <i>
              <img
                src={arrowUp}
                alt="arrow up icon"
                onClick={() => setShowSize(!showSize)}
                style={{
                  transform: showSubCategory ? "none" : "rotate(180deg)",
                }}
              />
            </i>
          </div>
          {showSize ? (
            <motion.div
              className="clothes__asideYMain__aside__options__selectsScroller"
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: 1,
                y: showSize ? 0 : -20,
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="clothes__asideYMain__aside__options__selectsScroller__scroll">
                {sizes.map((item, index) =>
                  filter.some(
                    (obj) => obj.name === "talla" && obj.items.includes(item)
                  ) ? (
                    <div
                      className="clothes__asideYMain__aside__options__option"
                      key={index}
                    >
                      <div
                        onClick={() => toogleSelectFilter("talla", item)}
                        style={{
                          backgroundColor: "#FA897B",
                        }}
                      ></div>
                      <p>{item}</p>
                    </div>
                  ) : (
                    <div
                      className="clothes__asideYMain__aside__options__option"
                      key={index}
                    >
                      <div
                        onClick={() => toogleSelectFilter("talla", item)}
                      ></div>
                      <p>{item}</p>
                    </div>
                  )
                )}
              </div>
            </motion.div>
          ) : (
            <></>
          )}
          <div className="clothes__asideYMain__aside__filter">
            <p>Estado</p>
            <i>
              <img
                src={arrowUp}
                alt="arrow up icon"
                onClick={() => setShowState(!showState)}
                style={{
                  transform: showState ? "none" : "rotate(180deg)",
                }}
              />
            </i>
          </div>
          {showState ? (
            <motion.div
              className="clothes__asideYMain__aside__multipleOp"
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: 1,
                y: showState ? 0 : -20,
              }}
              transition={{ duration: 0.5 }}
            >
              {state.map((item, index) =>
                filter.some(
                  (obj) =>
                    obj.name === "estado" && obj.items.includes(`${item}/10`)
                ) ? (
                  <div
                    className="clothes__asideYMain__aside__options__option"
                    key={index}
                  >
                    <div
                      onClick={() => toogleSelectFilter("estado", `${item}/10`)}
                      style={{
                        backgroundColor: "#FA897B",
                      }}
                    ></div>
                    <p>{item}/10</p>
                  </div>
                ) : (
                  <div
                    className="clothes__asideYMain__aside__options__option"
                    key={index}
                  >
                    <div
                      onClick={() => toogleSelectFilter("estado", `${item}/10`)}
                    ></div>
                    <p>{item}/10</p>
                  </div>
                )
              )}
            </motion.div>
          ) : (
            <></>
          )}
          <div className="clothes__asideYMain__aside__multipleOp">
            {filter.some(
              (obj) => obj.name === "price" && obj.items.includes("Donación")
            ) ? (
              <div className="clothes__asideYMain__aside__options__option">
                <div
                  onClick={() => toogleSelectFilter("price", "Donación")}
                  style={{
                    backgroundColor: "#FA897B",
                  }}
                ></div>
                <p>Donación</p>
              </div>
            ) : (
              <div className="clothes__asideYMain__aside__options__option">
                <div
                  onClick={() => toogleSelectFilter("price", "Donación")}
                ></div>
                <p>Donación</p>
              </div>
            )}
            {filter.some(
              (obj) =>
                obj.name === "price" && obj.items.includes("Rango de precio")
            ) ? (
              <div className="clothes__asideYMain__aside__options__option">
                <div
                  onClick={() => toogleSelectFilter("price", "Rango de precio")}
                  style={{
                    backgroundColor: "#FA897B",
                  }}
                ></div>
                <p>Rango de precio</p>
              </div>
            ) : (
              <div className="clothes__asideYMain__aside__options__option">
                <div
                  onClick={() => toogleSelectFilter("price", "Rango de precio")}
                ></div>
                <p>Rango de precio</p>
              </div>
            )}
            <div>
              <Slider
                min={0}
                max={300}
                range={true}
                value={range}
                onChange={setRange}
                railStyle={{ backgroundColor: "#EFEFEF" }}
                trackStyle={{ backgroundColor: "#FA897B" }}
                handleStyle={{
                  backgroundColor: "#FA897B",
                  border: "none",
                  borderRadius: "50%",
                  boxShadow: "0 0 3px rgba(255, 0, 0, 0.5)",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>{formatPrice(range[0])}</span>
                <span>{formatPrice(range[1])}</span>
              </div>
            </div>
          </div>
        </aside>
        {showFilterFlex ? (
          <section className="clothes__asideYMain__asideMobile">
            <figure className="clothes__asideYMain__asideMobile__x">
              <img
                src={xIcon}
                alt="x icon"
                onClick={() => {
                  setShowFilterFlex(false);
                }}
              />
            </figure>
            <div className="clothes__asideYMain__aside__tittle">
              <h2>FILTROS</h2>
              <span onClick={clearFilters}>LIMPIAR TODO</span>
            </div>
            <div className="clothes__asideYMain__aside__options">
              <p>Filtrado Por:</p>
              <div className="clothes__asideYMain__aside__options__container">
                {filter.map((obj, index) =>
                  obj.items.length
                    ? obj.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="clothes__asideYMain__aside__options__option"
                        >
                          <div
                            style={{
                              backgroundColor: "#FA897B",
                            }}
                          ></div>
                          <p>{item}</p>
                        </div>
                      ))
                    : null
                )}
              </div>
            </div>
            <div className="clothes__asideYMain__aside__filter">
              <p>Sub-Categoría</p>
              <i>
                <img
                  src={arrowUp}
                  alt="arrow up icon"
                  onClick={() => setShowSubCategory(!showSubCategory)}
                  style={{
                    transform: showSubCategory ? "none" : "rotate(180deg)",
                  }}
                />
              </i>
            </div>
            {showSubCategory ? (
              <motion.div
                className="clothes__asideYMain__aside__options__selectsScroller"
                initial={{ opacity: 0, y: -20 }}
                animate={{
                  opacity: 1,
                  y: showSubCategory ? 0 : -20,
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="clothes__asideYMain__aside__options__selectsScroller__scroll">
                  {subCategory.map((item, index) =>
                    filter.some(
                      (obj) =>
                        obj.name === "sub_category" && obj.items.includes(item)
                    ) ? (
                      <div
                        className="clothes__asideYMain__aside__options__option"
                        key={index}
                      >
                        <div
                          onClick={() =>
                            toogleSelectFilter("sub_category", item)
                          }
                          style={{
                            backgroundColor: "#FA897B",
                          }}
                        ></div>
                        <p>{item}</p>
                      </div>
                    ) : (
                      <div
                        className="clothes__asideYMain__aside__options__option"
                        key={index}
                      >
                        <div
                          onClick={() =>
                            toogleSelectFilter("sub_category", item)
                          }
                        ></div>
                        <p>{item}</p>
                      </div>
                    )
                  )}
                </div>
              </motion.div>
            ) : (
              <></>
            )}
            <div className="clothes__asideYMain__aside__filter">
              <p>Género</p>
              <i>
                <img
                  src={arrowUp}
                  alt="arrow up icon"
                  onClick={() => setShowGender(!showGender)}
                  style={{
                    transform: showGender ? "none" : "rotate(180deg)",
                  }}
                />
              </i>
            </div>
            {showGender ? (
              <motion.div
                className="clothes__asideYMain__aside__multipleOp"
                initial={{ opacity: 0, y: -20 }}
                animate={{
                  opacity: 1,
                  y: showGender ? 0 : -20,
                }}
                transition={{ duration: 0.5 }}
              >
                {gender.map((item, index) =>
                  filter.some(
                    (obj) => obj.name === "genero" && obj.items.includes(item)
                  ) ? (
                    <div
                      className="clothes__asideYMain__aside__options__option"
                      key={index}
                    >
                      <div
                        onClick={() => toogleSelectFilter("genero", item)}
                        style={{
                          backgroundColor: "#FA897B",
                        }}
                      ></div>
                      <p>{item}</p>
                    </div>
                  ) : (
                    <div
                      className="clothes__asideYMain__aside__options__option"
                      key={index}
                    >
                      <div
                        onClick={() => toogleSelectFilter("genero", item)}
                      ></div>
                      <p>{item}</p>
                    </div>
                  )
                )}
              </motion.div>
            ) : (
              <></>
            )}
            <div className="clothes__asideYMain__aside__filter">
              <p>Talla</p>
              <i>
                <img
                  src={arrowUp}
                  alt="arrow up icon"
                  onClick={() => setShowSize(!showSize)}
                  style={{
                    transform: showSubCategory ? "none" : "rotate(180deg)",
                  }}
                />
              </i>
            </div>
            {showSize ? (
              <motion.div
                className="clothes__asideYMain__aside__options__selectsScroller"
                initial={{ opacity: 0, y: -20 }}
                animate={{
                  opacity: 1,
                  y: showSize ? 0 : -20,
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="clothes__asideYMain__aside__options__selectsScroller__scroll">
                  {sizes.map((item, index) =>
                    filter.some(
                      (obj) => obj.name === "talla" && obj.items.includes(item)
                    ) ? (
                      <div
                        className="clothes__asideYMain__aside__options__option"
                        key={index}
                      >
                        <div
                          onClick={() => toogleSelectFilter("talla", item)}
                          style={{
                            backgroundColor: "#FA897B",
                          }}
                        ></div>
                        <p>{item}</p>
                      </div>
                    ) : (
                      <div
                        className="clothes__asideYMain__aside__options__option"
                        key={index}
                      >
                        <div
                          onClick={() => toogleSelectFilter("talla", item)}
                        ></div>
                        <p>{item}</p>
                      </div>
                    )
                  )}
                </div>
              </motion.div>
            ) : (
              <></>
            )}
            <div className="clothes__asideYMain__aside__filter">
              <p>Estado</p>
              <i>
                <img
                  src={arrowUp}
                  alt="arrow up icon"
                  onClick={() => setShowState(!showState)}
                  style={{
                    transform: showState ? "none" : "rotate(180deg)",
                  }}
                />
              </i>
            </div>
            {showState ? (
              <motion.div
                className="clothes__asideYMain__aside__multipleOp"
                initial={{ opacity: 0, y: -20 }}
                animate={{
                  opacity: 1,
                  y: showState ? 0 : -20,
                }}
                transition={{ duration: 0.5 }}
              >
                {state.map((item, index) =>
                  filter.some(
                    (obj) =>
                      obj.name === "estado" && obj.items.includes(`${item}/10`)
                  ) ? (
                    <div
                      className="clothes__asideYMain__aside__options__option"
                      key={index}
                    >
                      <div
                        onClick={() =>
                          toogleSelectFilter("estado", `${item}/10`)
                        }
                        style={{
                          backgroundColor: "#FA897B",
                        }}
                      ></div>
                      <p>{item}/10</p>
                    </div>
                  ) : (
                    <div
                      className="clothes__asideYMain__aside__options__option"
                      key={index}
                    >
                      <div
                        onClick={() =>
                          toogleSelectFilter("estado", `${item}/10`)
                        }
                      ></div>
                      <p>{item}/10</p>
                    </div>
                  )
                )}
              </motion.div>
            ) : (
              <></>
            )}
            <div className="clothes__asideYMain__aside__multipleOp">
              {filter.some(
                (obj) => obj.name === "price" && obj.items.includes("Donación")
              ) ? (
                <div className="clothes__asideYMain__aside__options__option">
                  <div
                    onClick={() => toogleSelectFilter("price", "Donación")}
                    style={{
                      backgroundColor: "#FA897B",
                    }}
                  ></div>
                  <p>Donación</p>
                </div>
              ) : (
                <div className="clothes__asideYMain__aside__options__option">
                  <div
                    onClick={() => toogleSelectFilter("price", "Donación")}
                  ></div>
                  <p>Donación</p>
                </div>
              )}
              {filter.some(
                (obj) =>
                  obj.name === "price" && obj.items.includes("Rango de precio")
              ) ? (
                <div className="clothes__asideYMain__aside__options__option">
                  <div
                    onClick={() =>
                      toogleSelectFilter("price", "Rango de precio")
                    }
                    style={{
                      backgroundColor: "#FA897B",
                    }}
                  ></div>
                  <p>Rango de precio</p>
                </div>
              ) : (
                <div className="clothes__asideYMain__aside__options__option">
                  <div
                    onClick={() =>
                      toogleSelectFilter("price", "Rango de precio")
                    }
                  ></div>
                  <p>Rango de precio</p>
                </div>
              )}
              <div>
                <Slider
                  min={0}
                  max={300}
                  range={true}
                  value={range}
                  onChange={setRange}
                  railStyle={{ backgroundColor: "#EFEFEF" }}
                  trackStyle={{ backgroundColor: "#FA897B" }}
                  handleStyle={{
                    backgroundColor: "#FA897B",
                    border: "none",
                    borderRadius: "50%",
                    boxShadow: "0 0 3px rgba(255, 0, 0, 0.5)",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{formatPrice(range[0])}</span>
                  <span>{formatPrice(range[1])}</span>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <></>
        )}
        <main className="clothes__asideYMain__main">
          <section className="clothes__asideYMain__main__menuMobile">
            <p className="clothes__asideYMain__main__menuMobile__products">
              {productsFiltered.length} productos
            </p>
            <div className="clothes__asideYMain__main__menuMobile__container">
              <div
                className="clothes__asideYMain__main__menuMobile__container__filter"
                onClick={() => {
                  setShowFilterFlex(true);
                }}
              >
                <p>Filtros</p>
                <figure>
                  <img src={filterIcon} alt="filter icon" />
                </figure>
              </div>
              <div className="clothes__asideYMain__main__menuMobile__container__order">
                <div
                  className="clothes__asideYMain__main__menuMobile__container__order__div1"
                  onClick={() => setShowOrdersMobile(!showOrdersMobile)}
                >
                  <p>Ordenar Por: {optionSelected}</p>
                  <figure>
                    <img
                      src={whiteArrow}
                      alt="arrow icon"
                      style={{
                        transform: showOrdersMobile ? "none" : "rotate(180deg)",
                      }}
                    />
                  </figure>
                </div>
                {showOrdersMobile ? (
                  <div className="clothes__asideYMain__main__header__order__options">
                    {orderOptions.map((item, index) => (
                      <p
                        key={index}
                        style={{
                          textDecoration:
                            item === optionSelected ? "underline" : "none",
                          color: item === optionSelected ? "#FA897B" : "black",
                        }}
                        onClick={() => handleOrderOptionMobile(item)}
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </section>
          <div className="clothes__asideYMain__main__header">
            <p>{productsFiltered.length} productos</p>
            <div className="clothes__asideYMain__main__header__order">
              <div className="clothes__asideYMain__main__header__order__div">
                <p>{`Ordenar por:     ${optionSelected}`}</p>
                <i>
                  <img
                    src={arrowUp}
                    alt="arrow icon"
                    onClick={() => setShowOrders(!showOrders)}
                    style={{
                      transform: showOrders ? "none" : "rotate(180deg)",
                    }}
                  />
                </i>
              </div>
              {showOrders ? (
                <div className="clothes__asideYMain__main__header__order__options">
                  {orderOptions.map((item, index) => (
                    <p
                      key={index}
                      style={{
                        textDecoration:
                          item === optionSelected ? "underline" : "none",
                        color: item === optionSelected ? "#FA897B" : "black",
                      }}
                      onClick={() => handleOrderOption(item)}
                    >
                      {item}
                    </p>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <section className="clothes__asideYMain__main__cards">
            {/* <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card /> */}
                      {products.map((product, index) => (
                          <Card
                              product={product}
                              key={index}
                              type={product.donation}
                          />
                      ))}
                  </section>
              </main>
          </section>
      </section>
  );
};

export default Clothes;
