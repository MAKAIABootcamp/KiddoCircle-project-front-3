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
import { useDispatch, useSelector } from "react-redux";
import LottieNoResult from "../Toys/lottieAnimation/LottieNoResults";
import { getProductsActionAsync } from "../../redux/actions/ProductsActions";

const Items = () => {
    const dispatch = useDispatch();
    const [showSubCategory, setShowSubCategory] = useState(false);
    const [showGender, setShowGender] = useState(false);
    const [showSize, setShowSize] = useState(false);
    const [showState, setShowState] = useState(false);
    const [showOrders, setShowOrders] = useState(false);
    const [showFilterFlex, setShowFilterFlex] = useState(false);
    const [showOrdersMobile, setShowOrdersMobile] = useState(false);
    const [optionSelected, setOptionSelected] = useState("Más reciente");
    const [range, setRange] = useState([0, 1]);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const products = useSelector((state) => state.products.products);
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
            name: "edad",
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

    const subCategory = [
        "Morrales",
        "Coches",
        "Biberones",
        "Extractor de leche",
        "Ollas",
        "Canguros",
        "Pañaleras",
        "Pañales",
        "Pañitos húmedos",
        "Cremas",
        "Útiles escolares",
        "Toallas",
        "Fórmula",
        "Esterilizador de biberones",
        "Calienta biberones",
        "Cuna",
        "Colchón de cuna",
        "Sabanas y Edredones",
        "Almohada",
        "Monitor para bebes",
        "Asiento para carro",
        "Asiento para baño",
        "Cepillos y peines",
        "Cortaúñas",
        "Cambiador de pañales",
        "Pañales de tela",
        "Lociones",
        "Aseo",
        "Almohada de lactancia",
        "Caminador",
        "Otros",
    ];

    const gender = ["Niña", "Niño", "Unisex"];

    const age = ["0-12M", "1-3A", "4-6A", "7-9A", "10-12A"];

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
                name: "edad",
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

    //Función para actualizar el array de filtros
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

    //Función para dar el formato de precio
    const formatPrice = (value) => {
        if (value) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
    };

    const handleOrderOption = (item) => {
        setOptionSelected(item);
        setShowOrders(!showOrders);
    };

    const handleOrderOptionMobile = (item) => {
        setOptionSelected(item);
        setShowOrdersMobile(!showOrdersMobile);
    };

    //Función para filtrar los productos
    const doFilter = (products, filters) => {
        return products.filter((product) => {
            const subCategoryFilter = filters
                .find((filter) => filter.name === "sub_category")
                .items.map((item) => item.toLowerCase());

            const genderFilter = filters
                .find((filter) => filter.name === "genero")
                .items.map((item) => item.toLowerCase());

            const ageFilter = filters
                .find((filter) => filter.name === "edad")
                .items.map((item) => item.toLowerCase());

            const stateFilter = filters
                .find((filter) => filter.name === "estado")
                .items.map((item) => item.toLowerCase());

            const donacionFilter = filters
                .find((filter) => filter.name === "price")
                .items.map((item) => item.toLowerCase());

            if (
                subCategoryFilter.length === 0 ||
                subCategoryFilter.includes(product.subcategoria.toLowerCase())
            ) {
                if (
                    genderFilter.length === 0 ||
                    genderFilter.includes(product.genero.toLowerCase())
                ) {
                    if (
                        ageFilter.length === 0 ||
                        ageFilter.includes(product.edad.toLowerCase())
                    ) {
                        if (
                            stateFilter.length === 0 ||
                            stateFilter.includes(product.estado.toLowerCase())
                        ) {
                            if (
                                donacionFilter.length === 0 ||
                                (donacionFilter.includes("donación") &&
                                    product.donar === true) ||
                                (donacionFilter.includes("rango de precio") &&
                                    product?.precio >= range[0] &&
                                    product?.precio <= range[1])
                            ) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        });
    };

    //Función para establecer el rango min y max de precios
    const createPriceRange = (productsCategory) => {
        const productsWithPrice = productsCategory.filter((product) =>
            product.hasOwnProperty("precio")
        );
        console.log(productsWithPrice);
        const lowestPrice = productsWithPrice.reduce((lowest, product) => {
            return product.precio < lowest ? product.precio : lowest;
        }, productsWithPrice[0]?.precio);
        const highestPrice = productsWithPrice.reduce((highest, product) => {
            return product.precio > highest ? product.precio : highest;
        }, productsWithPrice[0]?.precio);
        setMin(lowestPrice);
        setMax(highestPrice);
        setRange([lowestPrice, highestPrice]);
        console.log();
    };

    //Función para ordenar el array
    function ordenarArray(array, opcion) {
        switch (opcion) {
            case "Alfabéticamente, A-Z":
                array.sort((a, b) => a.nombre.localeCompare(b.nombre));
                break;
            case "Alfabéticamente, Z-A":
                array.sort((a, b) => b.nombre.localeCompare(a.nombre));
                break;
            case "Precio, menor a mayor":
                array.sort((a, b) => {
                    // Si a y b no tienen precio, no cambian de posición
                    if (
                        !a.hasOwnProperty("precio") &&
                        !b.hasOwnProperty("precio")
                    )
                        return 0;
                    // Si a no tiene precio, se coloca primero
                    if (!a.hasOwnProperty("precio")) return -1;
                    // Si b no tiene precio, se coloca primero
                    if (!b.hasOwnProperty("precio")) return 1;
                    // Si ambos tienen precio, se ordenan normalmente
                    return a.precio - b.precio;
                });
                break;
            case "Precio, mayor a menor":
                array.sort((a, b) => {
                    if (!a.precio && !b.precio) {
                        return 0;
                    } else if (!a.precio) {
                        return 1;
                    } else if (!b.precio) {
                        return -1;
                    } else {
                        return b.precio - a.precio;
                    }
                });
                break;
            case "Estado, menor a mayor":
                array.sort((a, b) => {
                    const parseState = (str) => {
                        const [x, y] = str.split("/");
                        return parseInt(x) / parseInt(y);
                    };
                    return parseState(a.estado) - parseState(b.estado);
                });
                break;
            case "Estado, mayor a menor":
                array.sort((a, b) => {
                    const parseState = (str) => {
                        const [x, y] = str.split("/");
                        return parseInt(x) / parseInt(y);
                    };
                    return parseState(b.estado) - parseState(a.estado);
                });
                break;
            case "Más antiguo":
                array.sort((a, b) => {
                    const parseDate = (str) => {
                        const [day, month, year] = str.split("/");
                        return new Date(year, month - 1, day);
                    };
                    return parseDate(a.fecha) - parseDate(b.fecha);
                });
                break;
            case "Más reciente":
                array.sort((a, b) => {
                    const parseDate = (str) => {
                        const [day, month, year] = str.split("/");
                        return new Date(year, month - 1, day);
                    };
                    return parseDate(b.fecha) - parseDate(a.fecha);
                });
                break;
            default:
                break;
        }
        return array;
    }

    useEffect(() => {
        if (products.length === 0) {
            dispatch(getProductsActionAsync());
        } else {
            const toyProducts = products.filter(
                (product) => product.categoria === "articulos"
            );
            createPriceRange(toyProducts);
            const arrayOrdenado = ordenarArray(toyProducts, optionSelected);
            setProductsFiltered(arrayOrdenado);
        }
    }, []);

    useEffect(() => {
        const toyProducts = products.filter(
            (product) => product.categoria === "articulos"
        );
        createPriceRange(toyProducts);
        const arrayOrdenado = ordenarArray(toyProducts, optionSelected);
        setProductsFiltered(arrayOrdenado);
    }, [products]);

  useEffect(() => {
      const toyProducts = products.filter(
          (product) => product.categoria === "articulos"
      );
      const resultFilter = doFilter(toyProducts, filter);
      const arrayOrdenado = ordenarArray(resultFilter, optionSelected);
      setProductsFiltered(arrayOrdenado);
  }, [range]);

    useEffect(() => {
        const toyProducts = products.filter(
            (product) => product.categoria === "articulos"
        );
        const resultFilter = doFilter(toyProducts, filter);
        const arrayOrdenado = ordenarArray(resultFilter, optionSelected);
        setProductsFiltered(arrayOrdenado);
    }, [filter]);

    useEffect(() => {
        const toyProducts = products.filter(
            (product) => product.categoria === "articulos"
        );
        const resultFilter = doFilter(toyProducts, filter);
        const arrayOrdenado = ordenarArray(resultFilter, optionSelected);
        setProductsFiltered(arrayOrdenado);
    }, [optionSelected]);

    return (
        <section className="clothes">
            <header className="clothes__header">
                <h1>ARTICULOS</h1>
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
                                                      backgroundColor:
                                                          "#FA897B",
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
                                onClick={() =>
                                    setShowSubCategory(!showSubCategory)
                                }
                                style={{
                                    transform: showSubCategory
                                        ? "none"
                                        : "rotate(180deg)",
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
                                            obj.name === "sub_category" &&
                                            obj.items.includes(item)
                                    ) ? (
                                        <div
                                            className="clothes__asideYMain__aside__options__option"
                                            key={index}
                                        >
                                            <div
                                                onClick={() =>
                                                    toogleSelectFilter(
                                                        "sub_category",
                                                        item
                                                    )
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
                                                    toogleSelectFilter(
                                                        "sub_category",
                                                        item
                                                    )
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
                                    transform: showGender
                                        ? "none"
                                        : "rotate(180deg)",
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
                                    (obj) =>
                                        obj.name === "genero" &&
                                        obj.items.includes(item)
                                ) ? (
                                    <div
                                        className="clothes__asideYMain__aside__options__option"
                                        key={index}
                                    >
                                        <div
                                            onClick={() =>
                                                toogleSelectFilter(
                                                    "genero",
                                                    item
                                                )
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
                                                toogleSelectFilter(
                                                    "genero",
                                                    item
                                                )
                                            }
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
                        <p>Edad</p>
                        <i>
                            <img
                                src={arrowUp}
                                alt="arrow up icon"
                                onClick={() => setShowSize(!showSize)}
                                style={{
                                    transform: showSubCategory
                                        ? "none"
                                        : "rotate(180deg)",
                                }}
                            />
                        </i>
                    </div>
                    {showSize ? (
                        <motion.div
                            className="clothes__asideYMain__aside__multipleOp"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{
                                opacity: 1,
                                y: showSize ? 0 : -20,
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            {age.map((item, index) =>
                                filter.some(
                                    (obj) =>
                                        obj.name === "edad" &&
                                        obj.items.includes(item)
                                ) ? (
                                    <div
                                        className="clothes__asideYMain__aside__options__option"
                                        key={index}
                                    >
                                        <div
                                            onClick={() =>
                                                toogleSelectFilter("edad", item)
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
                                                toogleSelectFilter("edad", item)
                                            }
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
                        <p>Estado</p>
                        <i>
                            <img
                                src={arrowUp}
                                alt="arrow up icon"
                                onClick={() => setShowState(!showState)}
                                style={{
                                    transform: showState
                                        ? "none"
                                        : "rotate(180deg)",
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
                                        obj.name === "estado" &&
                                        obj.items.includes(`${item}/10`)
                                ) ? (
                                    <div
                                        className="clothes__asideYMain__aside__options__option"
                                        key={index}
                                    >
                                        <div
                                            onClick={() =>
                                                toogleSelectFilter(
                                                    "estado",
                                                    `${item}/10`
                                                )
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
                                                toogleSelectFilter(
                                                    "estado",
                                                    `${item}/10`
                                                )
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
                            (obj) =>
                                obj.name === "price" &&
                                obj.items.includes("Donación")
                        ) ? (
                            <div className="clothes__asideYMain__aside__options__option">
                                <div
                                    onClick={() =>
                                        toogleSelectFilter("price", "Donación")
                                    }
                                    style={{
                                        backgroundColor: "#FA897B",
                                    }}
                                ></div>
                                <p>Donación</p>
                            </div>
                        ) : (
                            <div className="clothes__asideYMain__aside__options__option">
                                <div
                                    onClick={() =>
                                        toogleSelectFilter("price", "Donación")
                                    }
                                ></div>
                                <p>Donación</p>
                            </div>
                        )}
                        {filter.some(
                            (obj) =>
                                obj.name === "price" &&
                                obj.items.includes("Rango de precio")
                        ) ? (
                            <div className="clothes__asideYMain__aside__options__option">
                                <div
                                    onClick={() =>
                                        toogleSelectFilter(
                                            "price",
                                            "Rango de precio"
                                        )
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
                                        toogleSelectFilter(
                                            "price",
                                            "Rango de precio"
                                        )
                                    }
                                ></div>
                                <p>Rango de precio</p>
                            </div>
                        )}
                        <div>
                            <Slider
                                min={min}
                                max={max}
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
                                <span>${formatPrice(range[0])}</span>
                                <span>${formatPrice(range[1])}</span>
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
                                                          backgroundColor:
                                                              "#FA897B",
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
                                    onClick={() =>
                                        setShowSubCategory(!showSubCategory)
                                    }
                                    style={{
                                        transform: showSubCategory
                                            ? "none"
                                            : "rotate(180deg)",
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
                                                obj.name === "sub_category" &&
                                                obj.items.includes(item)
                                        ) ? (
                                            <div
                                                className="clothes__asideYMain__aside__options__option"
                                                key={index}
                                            >
                                                <div
                                                    onClick={() =>
                                                        toogleSelectFilter(
                                                            "sub_category",
                                                            item
                                                        )
                                                    }
                                                    style={{
                                                        backgroundColor:
                                                            "#FA897B",
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
                                                        toogleSelectFilter(
                                                            "sub_category",
                                                            item
                                                        )
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
                                        transform: showGender
                                            ? "none"
                                            : "rotate(180deg)",
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
                                        (obj) =>
                                            obj.name === "genero" &&
                                            obj.items.includes(item)
                                    ) ? (
                                        <div
                                            className="clothes__asideYMain__aside__options__option"
                                            key={index}
                                        >
                                            <div
                                                onClick={() =>
                                                    toogleSelectFilter(
                                                        "genero",
                                                        item
                                                    )
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
                                                    toogleSelectFilter(
                                                        "genero",
                                                        item
                                                    )
                                                }
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
                                        transform: showSubCategory
                                            ? "none"
                                            : "rotate(180deg)",
                                    }}
                                />
                            </i>
                        </div>
                        {showSize ? (
                            <motion.div
                                className="clothes__asideYMain__aside__multipleOp"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{
                                    opacity: 1,
                                    y: showSize ? 0 : -20,
                                }}
                                transition={{ duration: 0.5 }}
                            >
                                {age.map((item, index) =>
                                    filter.some(
                                        (obj) =>
                                            obj.name === "edad" &&
                                            obj.items.includes(item)
                                    ) ? (
                                        <div
                                            className="clothes__asideYMain__aside__options__option"
                                            key={index}
                                        >
                                            <div
                                                onClick={() =>
                                                    toogleSelectFilter(
                                                        "edad",
                                                        item
                                                    )
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
                                                    toogleSelectFilter(
                                                        "edad",
                                                        item
                                                    )
                                                }
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
                            <p>Estado</p>
                            <i>
                                <img
                                    src={arrowUp}
                                    alt="arrow up icon"
                                    onClick={() => setShowState(!showState)}
                                    style={{
                                        transform: showState
                                            ? "none"
                                            : "rotate(180deg)",
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
                                            obj.name === "estado" &&
                                            obj.items.includes(`${item}/10`)
                                    ) ? (
                                        <div
                                            className="clothes__asideYMain__aside__options__option"
                                            key={index}
                                        >
                                            <div
                                                onClick={() =>
                                                    toogleSelectFilter(
                                                        "estado",
                                                        `${item}/10`
                                                    )
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
                                                    toogleSelectFilter(
                                                        "estado",
                                                        `${item}/10`
                                                    )
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
                                (obj) =>
                                    obj.name === "price" &&
                                    obj.items.includes("Donación")
                            ) ? (
                                <div className="clothes__asideYMain__aside__options__option">
                                    <div
                                        onClick={() =>
                                            toogleSelectFilter(
                                                "price",
                                                "Donación"
                                            )
                                        }
                                        style={{
                                            backgroundColor: "#FA897B",
                                        }}
                                    ></div>
                                    <p>Donación</p>
                                </div>
                            ) : (
                                <div className="clothes__asideYMain__aside__options__option">
                                    <div
                                        onClick={() =>
                                            toogleSelectFilter(
                                                "price",
                                                "Donación"
                                            )
                                        }
                                    ></div>
                                    <p>Donación</p>
                                </div>
                            )}
                            {filter.some(
                                (obj) =>
                                    obj.name === "price" &&
                                    obj.items.includes("Rango de precio")
                            ) ? (
                                <div className="clothes__asideYMain__aside__options__option">
                                    <div
                                        onClick={() =>
                                            toogleSelectFilter(
                                                "price",
                                                "Rango de precio"
                                            )
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
                                            toogleSelectFilter(
                                                "price",
                                                "Rango de precio"
                                            )
                                        }
                                    ></div>
                                    <p>Rango de precio</p>
                                </div>
                            )}
                            <div>
                                <Slider
                                    min={min}
                                    max={max}
                                    range={true}
                                    value={range}
                                    onChange={setRange}
                                    railStyle={{ backgroundColor: "#EFEFEF" }}
                                    trackStyle={{ backgroundColor: "#FA897B" }}
                                    handleStyle={{
                                        backgroundColor: "#FA897B",
                                        border: "none",
                                        borderRadius: "50%",
                                        boxShadow:
                                            "0 0 3px rgba(255, 0, 0, 0.5)",
                                    }}
                                />
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <span>${formatPrice(range[0])}</span>
                                    <span>${formatPrice(range[1])}</span>
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
                                    onClick={() =>
                                        setShowOrdersMobile(!showOrdersMobile)
                                    }
                                >
                                    <p>Ordenar Por: {optionSelected}</p>
                                    <figure>
                                        <img
                                            src={whiteArrow}
                                            alt="arrow icon"
                                            style={{
                                                transform: showOrdersMobile
                                                    ? "none"
                                                    : "rotate(180deg)",
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
                                                        item === optionSelected
                                                            ? "underline"
                                                            : "none",
                                                    color:
                                                        item === optionSelected
                                                            ? "#FA897B"
                                                            : "black",
                                                }}
                                                onClick={() =>
                                                    handleOrderOptionMobile(
                                                        item
                                                    )
                                                }
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
                                        onClick={() =>
                                            setShowOrders(!showOrders)
                                        }
                                        style={{
                                            transform: showOrders
                                                ? "none"
                                                : "rotate(180deg)",
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
                                                    item === optionSelected
                                                        ? "underline"
                                                        : "none",
                                                color:
                                                    item === optionSelected
                                                        ? "#FA897B"
                                                        : "black",
                                            }}
                                            onClick={() =>
                                                handleOrderOption(item)
                                            }
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
                    <section
                        className="clothes__asideYMain__main__cards"
                        style={{
                            display: "flex",
                            justifyContent: `${
                                productsFiltered.length
                                    ? "space-between"
                                    : "center"
                            }`,
                        }}
                    >
                        {productsFiltered.length === 0 ? (
                            <div>
                                <LottieNoResult play={true} />
                                <span
                                    style={{
                                        fontSize: "14px",
                                        color: "rgb(250, 137, 123)",
                                        fontWeight: "700",
                                    }}
                                >
                                    No hay resultados para tu búsqueda
                                </span>
                            </div>
                        ) : (
                            productsFiltered.map((product, index) => (
                                <Card product={product} key={index} />
                            ))
                        )}
                    </section>
                </main>
            </section>
        </section>
    );
};

export default Items;
