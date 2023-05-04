import React from "react";
import { useForm } from 'react-hook-form'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,FormGroup, Form, Label, Input, Row, Col } from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import {createTransactionActionAsync} from '../../../../redux/actions/walletActions'
import Swal from "sweetalert2";

const FormWithdraw = ({modalWallet, toggleWallet}) => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);

    const { register, setValue, handleSubmit,reset,watch, formState: { errors } } = useForm({
        defaultValues: {
            value: "",
        },
    });

    const validateAccount= (value) =>{
        const re = /^(?:[0-9]{11}|[0-9]{2}-[0-9]{3}-[0-9]{6})$/;
        if (!re.test(value)) {
          return "Cuenta inválida, debe tener 11 dígitos"
        }
        return true
    }
    const validateName = (value) => {
        if (value.split(' ').length <= 1) {
            return 'El nombre completo es requerido'
        }
        return true
    }

    const validateCurrency= (value) =>{
        value= value.replace(/[.,]/g,'')
        if(Number(value)){
            setValue("value",Number(value).toLocaleString("de-DE"))
            return true
        }
        return "Valor inválido"
    }

    const validateDoc= (value) =>{
        if(value.length === 10 ){
            return true
        }
        return "Documento inválido"
    }


    const { ref: name, ...restFieldName } = register('name', { required: 'Nombre requerido', validate: validateName })
    const { ref: numberAccount, ...restFieldNumberAccount } = register('numberAccount', { required: 'Número requerido', validate: validateAccount })
  //  const { ref: value, ...restFieldValue } = register('value', { required: 'Valor requerido', validate: validateCurrency })
    const { ref: doc, ...restFieldDoc } = register('id', { required: 'Número requerido', validate: validateDoc })
    const { ref: typeAccount, ...restFieldTypeAccount } = register('typeAccount', { required: 'Campo requerido' })

    const closeModal=()=>{
        reset();
        toggleWallet();
    }

    const onSubmit = async  (data) => {
        const dataTransaction ={
            amount: data.value,
            date: new Date().toISOString(),
            type: "Retiro",
            userId: user.id,
        }
        dispatch(createTransactionActionAsync(dataTransaction)).then(()=>{
            Swal.fire({
                icon: "success",
                title: "¡Retiro realizado!",
                confirmButtonText: "Ok",
            })
            closeModal();
        })
    }
    const formattedCurrency = new Intl.NumberFormat('de-DE').format(watch("value").replace(/[.,]/g,''));

    return (
        <Modal isOpen={modalWallet} toggle={closeModal} centered className="wallet">
            <ModalHeader className="border-0" toggle={closeModal}>Retirar</ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup>
                        <Label for="value">
                            Valor*
                        </Label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="0.000"
                            {...register("value", { required: {
                                value: true,
                                message: 'Valor requerido.'
                            }, validate: validateCurrency })}
                            value={formattedCurrency}
                        />
                        {errors.value ? <span className='text-red'>{errors.value.message}</span> : <></>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="bank">
                            Banco*
                        </Label>
                        <Input
                            id="bank"
                            name="bank"
                            type="select"
                            innerRef={typeAccount} {...restFieldTypeAccount}
                        >
                            <option>
                                Nequi
                            </option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="numberAccount">
                            Número de cuenta*
                        </Label>
                        <Input
                            id="numberAccount"
                            name="numberAccount"
                            type="text"
                            placeholder="12-345-678913"
                            innerRef={numberAccount} {...restFieldNumberAccount}
                        />
                        {errors.numberAccount ? <span className='text-red'>{errors.numberAccount.message}</span> : <></>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="name">
                            Titular *
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
                        <Col md={4}>
                            <FormGroup>
                                <Label for="typeId">
                                    Tipo*
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
                                    Documento *
                                </Label>
                                <Input
                                    id="id"
                                    name="id"
                                    type="number"
                                    innerRef={doc} {...restFieldDoc}
                                />
                                    {errors.id ? <span className='text-red'>{errors.id.message}</span> : <></>}
                            </FormGroup>
                        </Col>
                    </Row>
                    <ModalFooter className="border-0">
                        <Button className="btn-recharge"  type="submit">
                            Recargar
                        </Button>
                        <Button color="secondary" onClick={closeModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Form>
            </ModalBody>
        </Modal>
    );
};

export default FormWithdraw;
