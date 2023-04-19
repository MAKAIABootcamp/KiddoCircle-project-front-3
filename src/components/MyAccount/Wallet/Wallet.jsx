import React,  { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,FormGroup, Form, Label, Input, Row, Col } from 'reactstrap';
import plus from '../../../assets/icons/icon plus.png'
import product from '../../../assets/coche.png'

const Wallet = () => {
    const [modalRecharge, setModalRecharge] = useState(false);
    const [modalWithdrawal, setModalWithdrawal] = useState(false);

    const toggleRecharge = () => setModalRecharge(!modalRecharge);
    const toggleWithdrawal = () => setModalWithdrawal(!modalWithdrawal);
    return (
        <section className="wallet">
            <div className="d-flex justify-content-between">
                <div>
                    <Button className="rounded-pill px-4" onClick={toggleRecharge}>
                        <img className="me-2" src={plus} alt="plus" />
                        Recargar
                    </Button>
                    <Modal isOpen={modalRecharge} toggle={toggleRecharge} centered className="wallet">
                        <ModalHeader className="border-0" toggle={toggleRecharge}>Recargar</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="value">
                                        Valor a recargar
                                    </Label>
                                    <Input
                                        id="value"
                                        name="value"
                                        placeholder="$ 0.000"
                                        type="text"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="typeAccount">
                                        Tipo de cuenta
                                    </Label>
                                    <Input
                                        id="typeAccount"
                                        name="typeAccount"
                                        type="select"
                                    >
                                        <option>
                                            Ahorros
                                        </option>
                                        <option>
                                            Depósito Electronico
                                        </option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="bank">
                                        Banco
                                    </Label>
                                    <Input
                                        id="bank"
                                        name="bank"
                                        type="select"
                                    >
                                        <option>
                                            Nequi
                                        </option>
                                        <option>
                                            Daviplata
                                        </option>
                                        <option>
                                            Bancolombia
                                        </option>
                                        <option>
                                            Banco Bogotá
                                        </option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="numberAccount">
                                        Número de cuenta
                                    </Label>
                                    <Input
                                        id="numberAccount"
                                        name="numberAccount"
                                        type="number"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="name">
                                        Titular de la cuenta
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                    />
                                </FormGroup>
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
                            </Form>
                        </ModalBody>
                        <ModalFooter className="border-0">
                            <Button className="btn-recharge"  onClick={toggleRecharge}>
                                Recargar
                            </Button>
                            <Button color="secondary" onClick={toggleRecharge}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                    <Button className="rounded-pill px-4 mx-4" onClick={toggleWithdrawal}>
                        <img className="me-2" src={plus} alt="plus" />
                        Retirar
                    </Button>
                    <Modal isOpen={modalWithdrawal} toggle={toggleWithdrawal} centered className="wallet">
                        <ModalHeader className="border-0" toggle={toggleWithdrawal}>Retirar</ModalHeader>
                        <ModalBody>
                        <Form>
                                <FormGroup>
                                    <Label for="value">
                                        Valor a retirar
                                    </Label>
                                    <Input
                                        id="value"
                                        name="value"
                                        placeholder="$ 0.000"
                                        type="text"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="typeAccount">
                                        Tipo de cuenta
                                    </Label>
                                    <Input
                                        id="typeAccount"
                                        name="typeAccount"
                                        type="select"
                                    >
                                        <option>
                                            Ahorros
                                        </option>
                                        <option>
                                            Depósito Electronico
                                        </option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="bank">
                                        Banco
                                    </Label>
                                    <Input
                                        id="bank"
                                        name="bank"
                                        type="select"
                                    >
                                        <option>
                                            Nequi
                                        </option>
                                        <option>
                                            Daviplata
                                        </option>
                                        <option>
                                            Bancolombia
                                        </option>
                                        <option>
                                            Banco Bogotá
                                        </option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="numberAccount">
                                        Número de cuenta
                                    </Label>
                                    <Input
                                        id="numberAccount"
                                        name="numberAccount"
                                        type="number"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="name">
                                        Titular de la cuenta
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                    />
                                </FormGroup>
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
                            </Form>
                        </ModalBody>
                        <ModalFooter className="border-0">
                            <Button className="btn-recharge"  onClick={toggleWithdrawal}>
                                Retirar
                            </Button>
                            <Button color="secondary" onClick={toggleWithdrawal}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <span>KiddoCoins:  $130.000</span>
            </div>
            <p className="fw-semibold mt-4 mx-4">Transacciones</p>
            <div className="mx-4">
                <div className="d-flex mx-4 card-wallet mb-2 align-items-center">
                    <div className="flex-shrink-0">
                        <img className="product" src={product} alt="product" />
                    </div>
                    <div className="flex-grow-1 ms-5 data-product d-flex justify-content-between align-items-center">
                        <div>
                            <span className="status fw-semibold">Depósito</span>
                            <p>Hoy</p>
                        </div>
                        <span className="pay fw-semibold">+$130.000</span>
                    </div>
                </div>
                <div className="d-flex mx-4 card-wallet mb-2 align-items-center">
                    <div className="flex-shrink-0">
                        <img className="product" src={product} alt="product" />
                    </div>
                    <div className="flex-grow-1 ms-5 data-product d-flex justify-content-between align-items-center">
                        <div>
                            <span className="status fw-semibold">Retiro</span>
                            <p>16 de abril</p>
                        </div>
                        <span className="withdrawal fw-semibold">-$30.000</span>
                    </div>
                </div>
                <div className="d-flex mx-4 card-wallet mb-2 align-items-center">
                    <div className="flex-shrink-0">
                        <img className="product" src={product} alt="product" />
                    </div>
                    <div className="flex-grow-1 ms-5 data-product d-flex justify-content-between align-items-center">
                        <div>
                            <span className="status fw-semibold">Depósito</span>
                            <p>14 de abril</p>
                        </div>
                        <span className="pay fw-semibold">+$30.000</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Wallet;
