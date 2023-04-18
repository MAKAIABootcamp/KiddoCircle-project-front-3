import React from "react";
import product from '../../assets/coche.png'
import close from '../../assets/icons/icon close.png'
import { NavLink } from "react-router-dom";
import {FormGroup, Form, Label, Input, Button, Row, Col} from 'reactstrap';

const CartShopping = () => {

    return (
        <section className="cart-shopping">
            <div class="container">
                <div class="row">
                    <div class="col-sm-6">
                        <div className="cards-shopping">
                            <div className="card-buy mb-2">
                                <button type="button" className="btn p-0 w-100 text-end">
                                    <img src={close} alt="close" />
                                </button>
                                <div className="d-flex card-shopping">
                                    <div className="flex-shrink-0">
                                        <img className="product" src={product} alt="product" />
                                    </div>
                                    <div className="flex-grow-1 ms-4 data-product">
                                        <span className="fw-semibold">Cochesito marca XDD</span>
                                        <p>$150.000</p>
                                    </div>
                                </div>
                            </div>

                            <div className="card-buy mb-2">
                                <button type="button" className="btn p-0 w-100 text-end">
                                    <img src={close} alt="close" />
                                </button>
                                <div className="d-flex card-shopping">
                                    <div className="flex-shrink-0">
                                        <img className="product" src={product} alt="product" />
                                    </div>
                                    <div className="flex-grow-1 ms-4 data-product">
                                        <span className="fw-semibold">Cochesito marca XDD</span>
                                        <p>$150.000</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-end price fw-semibold">Total: <span className="ms-3">$300.000</span></p>
                    </div>
                    <div class="col-sm-6 px-4 data-shopping">
                        <h3 className="text-center fw-semibold">Dirección de envío</h3>
                        <div className="info-user">
                            <p className="m-0">Calle 11 b 64 - 65</p>
                            <p className="m-0">Barranquilla</p>
                            <NavLink to="/cuenta">Editar dirección</NavLink>
                        </div>
                        <h3 className="text-center fw-semibold">Carrito de compras</h3>
                        <Form>
                            <FormGroup>
                                <Label for="numberCard">
                                    Número de la tarjeta
                                </Label>
                                <Input
                                    id="numberCard"
                                    name="numberCard"
                                    placeholder="5555-4444-3333-2222"
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">
                                    Nombre y apellido
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                />
                            </FormGroup>                         
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="expiration">
                                            Fecha expiración
                                        </Label>
                                        <Input
                                            id="expiration"
                                            name="expiration"
                                            placeholder="12/23"
                                            type="text"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="cvv">
                                            Código de seguridad
                                        </Label>
                                        <Input
                                            id="cvv"
                                            name="cvv"
                                            placeholder="123"
                                            type="text"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="typeId">
                                            Tipo
                                        </Label>
                                        <Input
                                            id="typeId"
                                            name="typeId"
                                            type="select"
                                        >
                                            <option>
                                                CC
                                            </option>
                                            <option>
                                                CE
                                            </option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={8}>
                                    <FormGroup>
                                        <Label for="id">
                                            Documento
                                        </Label>
                                        <Input
                                            id="id"
                                            name="id"
                                            type="text"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Button size="lg" className="w-100 rounded-pill mt-4 mb-5 btn-payment">
                                Finalizar proceso
                            </Button>
                        </Form>
                    </div>
                </div>
                </div>
        </section>
    );
};

export default CartShopping;
