import React, { useEffect, useState } from "react";
import plus from "../../../assets/icons/plus_white.svg";
import juguetesImg from "../../../assets/juguetes.jpg";
import ropaImg from "../../../assets/ropa.jpg";
import articulosImg from "../../../assets/articulos.jpg";
import LottieNothing from "./lottieAnimation/LottieNothing";
import Swal from "sweetalert2";
import { DateTime } from "luxon";
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
import { multipleFileUpload } from "../../../services/fileUpload";
import { useSelector } from "react-redux";
import { addDocument, filterCollection } from "../../../services/filterCollection";
import CardPost from "./cardPost/cardPost";

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
    const [errors, setErrors] = useState({});
    const user = useSelector((state) => state.user);
    const [publishedProducts, setPublishedProducts] = useState([]);

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

    const toggleTypes = () => setShowModalTypes(!showModalTypes);
    const toggleForm = () => setShowClothesForm(!showClothesForm);

    const getPublishedProducts = async () => {
        const getProducts = await filterCollection({
            key: "id_publicador",
            value: user.uid,
            collectionName: "products",
        });
        console.log(getProducts)
        setPublishedProducts(getProducts);
    }

    useEffect(() => {
        getPublishedProducts();
    }, []);

    //Función para limpiar el formulario
    const clearForm = () => {
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
    }

    //Función que envia el formulario
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
                disponibilidad: true,
                fecha: DateTime.now().toFormat("dd/MM/yyyy")
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
                    getPublishedProducts();
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
                        text: "Hubo un error al realizar la solicitud",
                    });
                });
            clearForm();
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

    const changeToForm = (type) => {
        toggleTypes();
        toggleForm();
        setTypeSelected(type);
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
            <div
                className="posts__cards__container"
                style={{
                    display: "flex",
                    justifyContent: `${
                        publishedProducts.length ? "flex-start" : "center"
                    }`,
                }}
            >
                {publishedProducts.length === 0 ? (
                    <div className="posts__cards__container__lottie">
                        <LottieNothing play={true} />
                        <p className="posts__cards__container__lottie">
                            ¡Aún no has publicado nada para vender o donar!
                        </p>
                    </div>
                ) : (
                    publishedProducts.map((product, index) => (
                        <CardPost
                            product={product}
                            key={index}
                            onDisponibilidadChange={getPublishedProducts}
                        />
                    ))
                )}
            </div>
        </section>
    );
};

export default Posts2;