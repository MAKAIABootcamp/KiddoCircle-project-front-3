import React from "react";
import product from '../../assets/coche.png'
import close from '../../assets/icons/icon close.png'
import { NavLink } from "react-router-dom";
import {FormGroup, Form, Label, Input, Button, Row, Col} from 'reactstrap';
import { useForm } from "react-hook-form";

const CartShopping = () => {
    const {register,handleSubmit,watch, formState: { errors }} = useForm({
        defaultValues: {
        numberCard: "",
        ED: "",
        },
    });
    //Function to validate complete name
    const validateName = (value) => {
        if (value.split(' ').length <= 1) {
            return 'El nombre completo es requerido'
        }
        return true
    }

    //Function to validate TC number
    const validateTC = (value) => {
        if (value.length < 19) {
            return 'Número de TC no puede ser menor a 16 dígitos'
        }
        return true
    }

    //Function to validate expiration date
    const validateED = (value) => {
        if (value.length < 5) {
            return 'Fecha invalida'
        }
        return true
    }

    const validateCvv = (value) => {
        if (value.length < 3) {
            return 'Se requieren 3 dígitos.'
        }
        return true
    }
    const validateDoc= (value) =>{
        if(value.length === 10 ){
            return true
        }
        return "Documento inválido"
    }

    const { ref: name, ...restFieldName } = register('name', { required: 'Nombre requerido', validate: validateName })
    const { ref: doc, ...restFieldDoc } = register('id', { required: 'Número requerido', validate: validateDoc })
    const { ref: cvv, ...restFieldCvv } = register('cvv', { required: 'Número requerido', validate: validateCvv })

    //Format the credit card number
    const formattedTC = watch("numberCard").replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim();
    //Format de expiration date
    const formattedED = watch("ED").replace(/\D/g, "")
        .replace(/^(\d{2})\/?(\d{0,2})/, (_, a, b) => a + (b ? `/${b}` : "")).trim();

    const onSubmit = async  (data) => {
        console.log(data)
    }
    return (
        <section className="cart-shopping">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
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
                    <div className="col-sm-6 px-4 data-shopping">
                        <h3 className="text-center fw-semibold">Dirección de envío</h3>
                        <div className="info-user">
                            <p className="m-0">Calle 11 b 64 - 65</p>
                            <p className="m-0">Barranquilla</p>
                            <NavLink to="/cuenta">Editar dirección</NavLink>
                        </div>
                        <h3 className="text-center fw-semibold">Carrito de compras</h3>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <FormGroup>
                                <Label for="numberCard">
                                    Número de la tarjeta
                                </Label>
                                <input
                                    id="numberCard"
                                    className="form-control"
                                    name="numberCard"
                                    maxLength="19"
                                    placeholder="5555-4444-3333-2222"
                                    type="text"
                                    {...register("numberCard", { required: {
                                        value: true,
                                        message: 'El número de TC es obligatorio.'
                                    }, validate: validateTC })}
                                value={formattedTC}
                                />
                                {errors.numberCard ? <span className='text-red'>{errors.numberCard.message}</span> : <></>}

                            </FormGroup>
                            <FormGroup>
                                <Label for="name">
                                    Nombre y apellido
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    innerRef={name} {...restFieldName}
                                />
                                {errors.name ? <span className='text-red'>{errors.name.message}</span> : <></>}

                            </FormGroup>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="expiration">
                                            Fecha expiración
                                        </Label>
                                        <input
                                            type="text"
                                            maxLength="5"
                                            className="form-control"
                                            placeholder="Expires"
                                            name="ED"
                                            {...register("ED", { required: {
                                                value: true,
                                                message: 'La fecha es requerido.'
                                            }, validate: validateED })}
                                            value={formattedED}
                                        />
                                        {errors.ED ? <span className='text-red'>{errors.ED.message}</span> : <></>}

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
                                            innerRef={cvv} {...restFieldCvv}
                                        />
                                        {errors.cvv ? <span className='text-red'>{errors.cvv.message}</span> : <></>}

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
                                            innerRef={doc} {...restFieldDoc}
                                        />
                                        {errors.id ? <span className='text-red'>{errors.id.message}</span> : <></>}

                                    </FormGroup>
                                </Col>
                            </Row>

                            <Button size="lg" type="submit" className="w-100 rounded-pill mt-4 mb-5 btn-payment">
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
