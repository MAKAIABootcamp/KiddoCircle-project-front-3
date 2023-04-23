import React from "react";
import { useForm } from 'react-hook-form'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,FormGroup, Form, Label, Input, Row, Col } from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import {updateDataUserActionAsync} from '../../../../redux/actions/userActions'
import {createTransactionActionAsync} from '../../../../redux/actions/walletActions'
import {createShoppingActionAsync} from '../../../../redux/actions/shoppingActions'
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const FormRecharge = ({modalWallet, toggleWallet}) => {
    const { register, setValue, handleSubmit,watch,reset , formState: { errors } } = useForm({
        defaultValues: {
            value: "",
            numberCard: "",
            ED: "",
        },
    });

    const closeModal=()=>{
        reset();
        toggleWallet();
    }

    return (
        <Modal isOpen={modalWallet} toggle={closeModal} centered className="wallet">
            <ModalHeader className="border-0" toggle={closeModal}>Recargar</ModalHeader>
            <ModalBody>
                <Recharge closeModal={closeModal} register={register} setValue={setValue} handleSubmit={handleSubmit} watch={watch}  errors={errors} />
            </ModalBody>
        </Modal>
    );
};

export const Recharge = ({closeModal, register, setValue, handleSubmit, watch, errors, total, totalToShop})=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const { currentShopping } = useSelector((store) => store.shopping);

    const validateName = (value) => {
        if (value.split(' ').length <= 1) {
            return 'El nombre completo es requerido'
        }
        return true
    }

    const validateCurrency= (value) =>{
        value= value.replace(/[.,]/g,'')
        if(total && totalToShop){
            if((Number(total.replace(/[.]/g,''))+Number(value)) < Number(totalToShop.replace(/[.]/g,''))){
                return "Valor insuficiente para realizar la compra"
            }
        }
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
        if (value.length < 3 || value.length > 3) {
            return 'Se requieren 3 dígitos.'
        }
        return true
    }
    const { ref: name, ...restFieldName } = register('name', { required: 'Nombre requerido', validate: validateName })
    const { ref: doc, ...restFieldDoc } = register('id', { required: 'Número requerido', validate: validateDoc })
    const { ref: cvv, ...restFieldCvv } = register('cvv', { required: 'Número requerido', validate: validateCvv })
    const { ref: typeAccount, ...restFieldTypeAccount } = register('typeAccount', { required: 'Campo requerido' })

    const onSubmit = async  (data) => {
        const targetInfo= user.cards?user.cards.find(card=> card.numberCard === data.numberCard): undefined;
        const dataTransaction ={
            amount: data.value,
            date: new Date().toISOString(),
            type: "Depósito",
            userId: user.id,
        }
        if(targetInfo){
            dispatch(createTransactionActionAsync(dataTransaction)).then(()=>{
                Swal.fire({
                    icon: "success",
                    title: "¡Depósito realizado!",
                    confirmButtonText: "Ok",
                })
                closeModal();
            })
        }else{
            const formDataCard ={
                ED: data.ED,
                name: data.name,
                numberCard: data.numberCard,
                typeAccount: data.typeAccount,
            }
            let newUser= {...user};
            newUser.cards=[
                ...(newUser.cards || []),
                {
                    ...formDataCard
                }
            ]
            dispatch(updateDataUserActionAsync(newUser))
            dispatch(createTransactionActionAsync(dataTransaction)).then(()=>{
                if(total===undefined && totalToShop===undefined ){
                    Swal.fire({
                        icon: "success",
                        title: "¡Depósito realizado!",
                        confirmButtonText: "Ok",
                    })
                }
                closeModal();
            })
        }
        if(Object.keys(currentShopping).length>0 && currentShopping.products.length>0 && total && totalToShop){
            const updateShopping={...currentShopping};
            const products=[...updateShopping.products]
            const newProducts=[]
            products.forEach(item=>{
                newProducts.push({...item, status:"Enviado"})
            })
            updateShopping.products=[...newProducts]
            updateShopping.amount = totalToShop;
            updateShopping.type= "Compra";
            dispatch(createShoppingActionAsync(updateShopping)).then(()=>{
                Swal.fire({
                    icon: "success",
                    title: "Compra realizada!",
                    confirmButtonText: "Ok",
                }).then((result) => {
                    if (result.isConfirmed) {
                      navigate('/');
                    }
                  })
                closeModal();
            })
        }
    }

    const changeTarget=(e)=> {
        if(e.target.value !== 'Nueva targeta'){
            const targetInfo= user.cards.find(card=> card.numberCard === e.target.value);
            setValue("numberCard",targetInfo.numberCard);
            setValue("typeAccount",targetInfo.typeAccount);
            setValue("name",targetInfo.name);
            setValue("ED",targetInfo.ED);
        } else{
            setValue("numberCard",'');
            setValue("typeAccount",'Ahorros');
            setValue("name",'');
            setValue("ED",'');
        }
    }

    const formattedCurrency = new Intl.NumberFormat('de-DE').format(watch("value").replace(/[.,]/g,''));

    //Format the credit card number
    const formattedTC = watch("numberCard").replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim();

    //Format de expiration date
    const formattedED = watch("ED").replace(/\D/g, "")
        .replace(/^(\d{2})\/?(\d{0,2})/, (_, a, b) => a + (b ? `/${b}` : "")).trim();

    return(
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
                <Label for="typeTarget">
                    Tarjeta*
                </Label>
                <Input
                    id="typeTarget"
                    name="typeTarget"
                    type="select"
                    onChange={changeTarget}
                >
                    <option>
                        Nueva targeta
                    </option>
                    {
                        <>
                            {user.cards && user.cards.length>0 &&
                                user.cards.map((card)=>(
                                    <option key={card.numberCard}>
                                        {card.numberCard}
                                    </option>
                                ))
                            }
                        </>
                    }
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="typeAccount">
                    Tipo de tarjeta*
                </Label>
                <Input
                    id="typeAccount"
                    name="typeAccount"
                    type="select"
                    innerRef={typeAccount} {...restFieldTypeAccount}
                >
                    <option>
                        Ahorros
                    </option>
                    <option>
                        Crédito
                    </option>
                </Input>
            </FormGroup>
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
                            type="number"
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
    )
}

export default FormRecharge;
