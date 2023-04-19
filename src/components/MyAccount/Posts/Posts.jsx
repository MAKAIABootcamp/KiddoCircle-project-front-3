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
import { subCategoryClothes, subCategoryItems, subCategoryToys, age, gender, sizes, state } from "../../../categorys";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Form,
    Label,
    Input,
    Row,
    Col,
    ButtonGroup,
} from "reactstrap";

const Posts = () => {
    const [showModalTypes, setShowModalTypes] = useState(false);
    const [showClothesForm, setShowClothesForm] = useState(false);
    const [typeSelected, setTypeSelected] = useState('');
    const [selectedOption, setSelectedOption] = useState("vender");

    const toggleTypes = () => setShowModalTypes(!showModalTypes);
    const toggleForm = () => setShowClothesForm(!showClothesForm);

    const changeToForm = (type) => {
        toggleTypes();
        toggleForm();
        setTypeSelected(type);
    }

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
                    <Form>
                        <FormGroup>
                            <Label for="value">Nombre del producto</Label>
                            <Input
                                id="value"
                                name="value"
                                placeholder="Coche marca Baby Trend"
                                type="text"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="typeAccount">Descripción</Label>
                            <Input
                                id="typeAccount"
                                name="typeAccount"
                                type="text"
                                placeholder="Cuenta con una capota ajustable para proteger del sol, canasta de almacenamiento grande y ruedas grandes para una conducción suave. Fácil de plegar y transportar"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="bank">Sub-Categoría</Label>
                            <Input id="bank" name="bank" type="select">
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
                                    <Label for="typeId">Genero</Label>
                                    <Input
                                        id="typeId"
                                        name="typeId"
                                        type="select"
                                    >
                                        {gender.map((item, index) => (
                                            <option key={index}>{item}</option>
                                        ))}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="id">
                                        {typeSelected === "ropa"
                                            ? "Talla"
                                            : "Edad"}
                                    </Label>
                                    <Input
                                        id="typeId"
                                        name="typeId"
                                        type="select"
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
                                    <Label for="id">Estado</Label>
                                    <Input
                                        id="typeId"
                                        name="typeId"
                                        type="select"
                                    >
                                        {state.map((item, index) => (
                                            <option key={index}>{item}</option>
                                        ))}
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="bank">Fotos del producto</Label>
                            <Input id="bank" name="bank" type="file" />
                        </FormGroup>
                        <FormGroup tag="fieldset" className="custom-purple">
                            <Label for="radio1">
                                ¿Qué desea hacer con el producto?
                            </Label>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type="radio"
                                        name="radio1"
                                        value="donar"
                                        checked={selectedOption === "donar"}
                                        onChange={(e) =>
                                            setSelectedOption(e.target.value)
                                        }
                                    />{" "}
                                    Donar
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type="radio"
                                        name="radio1"
                                        value="vender"
                                        checked={selectedOption === "vender"}
                                        onChange={(e) =>
                                            setSelectedOption(e.target.value)
                                        }
                                    />{" "}
                                    Vender
                                </Label>
                            </FormGroup>
                        </FormGroup>
                        {selectedOption === "vender" ? (
                            <FormGroup>
                                <Label for="typeAccount">Precio</Label>
                                <Input
                                    id="typeAccount"
                                    name="typeAccount"
                                    type="text"
                                    placeholder="$ 150.000"
                                />
                            </FormGroup>
                        ) : (
                            <></>
                        )}
                        <Button
                            color="secondary"
                            className="w-100 posts__buttonMorado"
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

export default Posts;
