import React, { useEffect, useState } from "react";
import plus from "../../../assets/icons/plus_white.svg";
import juguetesImg from "../../../assets/juguetes.jpg";
import ropaImg from "../../../assets/ropa.jpg";
import articulosImg from "../../../assets/articulos.jpg";
import product from "../../../assets/coche.png";
import heart from "../../../assets/icons/heart_mini.svg";
import eye from "../../../assets/icons/eye_mini.svg";
import Card from "../../cards/Card";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import * as yup from "yup";
import {
    subCategoryClothes,
    subCategoryItems,
    subCategoryToys,
    age,
    gender,
    sizes,
    state,
} from "../../../categorys";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    Form,
    Label,
    Input,
    Row,
    Col,
} from "reactstrap";
import { fileUpload, multipleFileUpload } from "../../../services/fileUpload";
import { useSelector } from "react-redux";
import { addDocument } from "../../../services/filterCollection";

const schema = yup.object({
    nombre: yup.string().required("Nombre requerido"),
    descripcion: yup.string().required("Descripción requerida"),
    subcategoria: yup.string(),
    talla: yup.string().nullable(),
    edad: yup.string().nullable(),
    genero: yup.string(),
    estado: yup.string(),
    fotos: yup.mixed().required("Foto requerida"),
    opcionSeleccionada: yup.string().required("Debe seleccionar una opción"),
    precio: yup.lazy((value) => {
        if (value.opcionSeleccionada === "vender") {
            return yup.number().nullable().required("Precio es requerido");
        } else {
            return yup.number().nullable();
        }
    }),
});

const Posts2 = () => {
    const [showModalTypes, setShowModalTypes] = useState(false);
    const [showClothesForm, setShowClothesForm] = useState(false);
    const [typeSelected, setTypeSelected] = useState("");
    // const [selectedOption, setSelectedOption] = useState("vender");
    const [errors, setErrors] = useState({});
    const user = useSelector((state) => state.user);

    //variables formulario
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [subcategoria, setSubcategoria] = useState("");
    const [genero, setGenero] = useState("");
    const [talla, setTalla] = useState("");
    const [edad, setEdad] = useState("");
    const [estado, setEstado] = useState("");
    const [fotos, setFotos] = useState([]);
    const [opcionSeleccionada, setOpcionSeleccionada] = useState("vender");
    const [precio, setPrecio] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const nombre = data.get("nombre");
        const descripcion = data.get("descripcion");
        const subcategoria = data.get("subcategoria");
        const talla = data.get("talla");
        const edad = data.get("edad");
        const genero = data.get("genero");
        const estado = data.get("estado");
        const fotos =
            data.get("fotos").size === 0 ? null : [...data.getAll("fotos")];
        const opcionSeleccionada = data.get("opcionSeleccionada");
        const precio =
            opcionSeleccionada === "vender"
                ? parseFloat(data.get("precio"))
                : 0;
        try {
            await schema.validate(
                {
                    nombre,
                    descripcion,
                    subcategoria,
                    talla,
                    edad,
                    genero,
                    estado,
                    fotos,
                    opcionSeleccionada,
                    precio,
                },
                { abortEarly: false }
            );
            console.log("Validation succeeded");
            setErrors({});
            const newProduct = {
                categoria: typeSelected,
                nombre,
                descripcion,
                subcategoria,
                genero,
                estado,
                fotos: await multipleFileUpload(fotos),
                vistas: 0,
                id_publicador: user.uid,
            };
            if (typeSelected === "ropa") {
                newProduct.talla = talla;
            } else {
                newProduct.edad = edad;
            }
            if (opcionSeleccionada === "vender") {
                newProduct.precio = precio;
            }
            if (opcionSeleccionada === "vender") {
                newProduct.donar = false;
            } else {
                newProduct.donar = true;
            }
            console.log(newProduct)
            addDocument("products", newProduct)
                .then(() => {
                    toggleForm();
                    Swal.fire({
                        icon: "success",
                        title: "¡Publicación exitosa!",
                        confirmButtonText: "Ok",
                    })
                })
                .catch((error) => {
                    Swal.fire({
                        icon: "error",
                        title: "Uups...",
                        text: "Hubo un error al realizar la solictud",
                    });
                });
            setNombre("");
            setDescripcion("");
            setSubcategoria("");
            setGenero("");
            setTalla("");
            setEdad("");
            setEstado("");
            setFotos([]);
            setOpcionSeleccionada("vender");
            setPrecio("");
        } catch (err) {
            console.log(
                "Validation failed",
                err.errors,
                err.params,
                err.message
            );
            setErrors(
                err.inner.reduce((acc, { path, message }) => {
                    return {
                        ...acc,
                        [path]: message,
                    };
                }, {})
            );
        }

    };

    const toggleTypes = () => setShowModalTypes(!showModalTypes);
    const toggleForm = () => setShowClothesForm(!showClothesForm);

    const changeToForm = (type) => {
        toggleTypes();
        toggleForm();
        setTypeSelected(type);
    };


    const submitProduct = (data) => {
        console.log("hola");
    };

    return (
        <section className="posts">
            <Button
                className="rounded-pill px-4 posts__buttonPink"
                onClick={toggleTypes}
            >
                <img className="me-2" src={plus} alt="plus" />
                Crear publicación
            </Button>
            <Modal
                isOpen={showModalTypes}
                toggle={toggleTypes}
                centered
                size="xl"
            >
                <ModalHeader className="border-0" toggle={toggleTypes}>
                    Selecciona la categoría de tu producto
                </ModalHeader>
                <ModalBody className="d-flex flex-wrap gap-4 justify-content-between">
                    <div
                        style={{ backgroundImage: `url(${ropaImg})` }}
                        className="col-12 col-md mb-3 cardType"
                        onClick={() => changeToForm("ropa")}
                    >
                        <h1>ROPA</h1>
                    </div>
                    <div
                        style={{ backgroundImage: `url(${juguetesImg})` }}
                        className="col-12 col-md mb-3 cardType"
                        onClick={() => changeToForm("juguetes")}
                    >
                        <h1>JUGUETES</h1>
                    </div>
                    <div
                        style={{ backgroundImage: `url(${articulosImg})` }}
                        className="col-12 col-md mb-3 cardType"
                        onClick={() => changeToForm("articulos")}
                    >
                        <h1>ARTICULOS</h1>
                    </div>
                </ModalBody>
            </Modal>
            <Modal
                isOpen={showClothesForm}
                toggle={toggleForm}
                centered
                className="postRopaFormModal"
            >
                <ModalHeader className="border-0" toggle={toggleForm}>
                    Agregar Producto
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="nombre">Nombre del producto</Label>
                            <Input
                                name="nombre"
                                placeholder="Coche marca Baby Trend"
                                type="text"
                                value={nombre}
                                onChange={(event) =>
                                    setNombre(event.target.value)
                                }
                            />
                            {errors.nombre ? (
                                <span className="posts__error">
                                    {errors.nombre}
                                </span>
                            ) : null}
                        </FormGroup>
                        <FormGroup>
                            <Label for="descripcion">Descripción</Label>
                            <Input
                                name="descripcion"
                                type="text"
                                placeholder="Cuenta con una capota ajustable para proteger del sol, canasta de almacenamiento grande y ruedas grandes para una conducción suave. Fácil de plegar y transportar"
                                value={descripcion}
                                onChange={(event) =>
                                    setDescripcion(event.target.value)
                                }
                            />
                            {errors.descripcion ? (
                                <span className="posts__error">
                                    {errors.descripcion}
                                </span>
                            ) : null}
                        </FormGroup>
                        <FormGroup>
                            <Label for="subcategoria">Sub-Categoría</Label>
                            <Input
                                name="subcategoria"
                                type="select"
                                value={subcategoria}
                                onChange={(event) =>
                                    setSubcategoria(event.target.value)
                                }
                            >
                                {typeSelected === "ropa"
                                    ? subCategoryClothes.map((item, index) => (
                                          <option key={index}>{item}</option>
                                      ))
                                    : typeSelected === "juguetes"
                                    ? subCategoryToys.map((item, index) => (
                                          <option key={index}>{item}</option>
                                      ))
                                    : subCategoryItems.map((item, index) => (
                                          <option key={index}>{item}</option>
                                      ))}
                            </Input>
                        </FormGroup>
                        <Row>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="genero">Genero</Label>
                                    <Input
                                        name="genero"
                                        type="select"
                                        value={genero}
                                        onChange={(event) =>
                                            setGenero(event.target.value)
                                        }
                                    >
                                        {gender.map((item, index) => (
                                            <option key={index}>{item}</option>
                                        ))}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label
                                        for={
                                            typeSelected === "ropa"
                                                ? "talla"
                                                : "edad"
                                        }
                                    >
                                        {typeSelected === "ropa"
                                            ? "Talla"
                                            : "Edad"}
                                    </Label>
                                    <Input
                                        name={
                                            typeSelected === "ropa"
                                                ? "talla"
                                                : "edad"
                                        }
                                        type="select"
                                        value={
                                            typeSelected === "ropa"
                                                ? talla
                                                : edad
                                        }
                                        onChange={(event) => {
                                            typeSelected === "ropa"
                                                ? setTalla(event.target.value)
                                                : setEdad(event.target.value);
                                        }}
                                    >
                                        {typeSelected === "ropa"
                                            ? sizes.map((item, index) => (
                                                  <option key={index}>
                                                      {item}
                                                  </option>
                                              ))
                                            : age.map((item, index) => (
                                                  <option key={index}>
                                                      {item}
                                                  </option>
                                              ))}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="estado">Estado</Label>
                                    <Input
                                        name="estado"
                                        type="select"
                                        value={estado}
                                        onChange={(event) =>
                                            setEstado(event.target.value)
                                        }
                                    >
                                        {state.map((item, index) => (
                                            <option key={index}>{item}</option>
                                        ))}
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="fotos">Fotos del producto</Label>
                            <Input
                                name="fotos"
                                type="file"
                                accept=".png,.jpg,.jpeg"
                                multiple
                                value={fotos}
                                onChange={(event) =>
                                    setFotos(event.target.value)
                                }
                            />
                            {errors.fotos ? (
                                <span className="posts__error">
                                    {errors.fotos}
                                </span>
                            ) : null}
                        </FormGroup>
                        <FormGroup tag="fieldset" className="custom-purple">
                            <Label for="opcionSeleccionada">
                                ¿Qué desea hacer con el producto?
                            </Label>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type="radio"
                                        name="opcionSeleccionada"
                                        value="donar"
                                        checked={opcionSeleccionada === "donar"}
                                        onChange={(e) =>
                                            setOpcionSeleccionada(
                                                e.target.value
                                            )
                                        }
                                    />
                                    Donar
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type="radio"
                                        name="opcionSeleccionada"
                                        value="vender"
                                        checked={
                                            opcionSeleccionada === "vender"
                                        }
                                        onClick={(e) =>
                                            setOpcionSeleccionada(
                                                e.target.value
                                            )
                                        }
                                        onChange={(e) =>
                                            setOpcionSeleccionada(
                                                e.target.value
                                            )
                                        }
                                    />
                                    Vender
                                </Label>
                            </FormGroup>
                        </FormGroup>
                        {opcionSeleccionada === "vender" ? (
                            <FormGroup>
                                <Label for="precio">Precio</Label>
                                <Input
                                    id="precio"
                                    name="precio"
                                    type="number"
                                    placeholder="$ 150.000"
                                    value={precio}
                                    onChange={(event) =>
                                        setPrecio(event.target.value)
                                    }
                                />
                                {errors.precio ? (
                                    <span className="posts__error">
                                        Precio es requerido
                                    </span>
                                ) : null}
                            </FormGroup>
                        ) : (
                            <></>
                        )}
                        <Button
                            color="secondary"
                            className="w-100 posts__buttonMorado"
                            type="submit"
                        >
                            Agregar
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
            <div className="posts__cards__container">
                <motion.div className="card-post" whileHover={{ y: -12 }}>
                    <figure className="card__figure__post">
                        <img src={product} alt="product-image" />
                    </figure>
                    <footer className="card__footer">
                        <p className="card__footer-name">Cochesito X</p>
                        <div className="card__footer-hearts-eye">
                            <figure>
                                <img src={heart} alt="icono corazon" />
                            </figure>
                            <p>12 favoritos</p>
                        </div>
                        <div className="card__footer-hearts-eye">
                            <figure>
                                <img src={eye} alt="icono corazon" />
                            </figure>
                            <p>30 vistas</p>
                        </div>
                        <p className="card__footer-price">$150.000</p>
                        <button
                            className="edit__button"
                            onClick={() => setShowClothesForm(!showClothesForm)}
                        >
                            Editar publicación
                        </button>
                        <button className="card__footer-button">
                            Eliminar publicación
                        </button>
                    </footer>
                </motion.div>
            </div>
        </section>
    );
};

export default Posts2;