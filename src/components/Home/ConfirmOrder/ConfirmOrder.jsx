import React, {useEffect, useState} from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import {getShoppingsActionAsync, updateShoppingActionAsync} from '../../../redux/actions/shoppingActions'
import {createTransactionActionAsync} from '../../../redux/actions/walletActions'
import Swal from "sweetalert2";
import {getUsersActionAsync} from '../../../redux/actions/usersActions'
import { updateProductActionAsync } from '../../../redux/actions/ProductsActions'


const ConfirmOrder = () => {
    const dispatch = useDispatch();
    const [modalOrder, setModalOrder] = useState(false);
    const [productModal, setProductModal]= useState({})
    const user = useSelector((store) => store.user);
    const { shoppings } = useSelector((store) => store.shopping);
    const { products } = useSelector((store) => store.products);
    const {users} = useSelector((store) => store.allUsers);

    const toggleOrder = () => setModalOrder(!modalOrder);

    useEffect(()=>{
        dispatch(getUsersActionAsync())
    },[])

    useEffect(()=>{
        if(user && user.id){
            dispatch(getShoppingsActionAsync(user.id))
        }
    },[user])

    useEffect(()=>{
        if(shoppings.length>0 && products.length>0 && users.length>0){
            const shopNotConfirmed= shoppings.filter(item=> item.products[0].status === "Enviado")[0];
            if(shopNotConfirmed){
                setProductModal(shopNotConfirmed)
                setModalOrder(true)
            }
        }
    },[shoppings, products, users])

    const onCancelTranfer=()=>{
        const dataTransaction ={
            amount: productModal.amount,
            date: new Date().toISOString(),
            type: "Compra cancelada",
            userId: user.id,
        }
        dispatch(createTransactionActionAsync(dataTransaction)).then(()=>{
            const updateShopping={...productModal};
            delete updateShopping.id
            const productsShop=[...updateShopping.products]
            const newProducts=[]
            const updateProducts=[]
            productsShop.forEach(item=>{
                const updateProduct= products.filter(itemProd=> itemProd.id === item.productId)[0];
                updateProducts.push({...updateProduct,disponibilidad: true})
                newProducts.push({...item, status:"Cancelado"})
            })
            updateShopping.products=[...newProducts]
            //updateShopping.type="Compra cancelada"
            //updateShopping.date=  new Date().toISOString();
            dispatch(updateShoppingActionAsync(updateShopping,productModal.id)).then(()=>{
                updateProducts.forEach(prod=>{
                    dispatch(updateProductActionAsync(prod))
                })
                toggleOrder()
                Swal.fire({
                    icon: "success",
                    title: "Compra cancelada!",
                    confirmButtonText: "Ok",
                })

            })
        })
    }
    const onSuccessTranfer=()=>{
        const updateShopping={...productModal};
        delete updateShopping.id
        const productsShop=[...updateShopping.products]
        const newProducts=[]
        productsShop.forEach(item=>{
            newProducts.push({...item, status:"Entregado"})
        })
        updateShopping.products=[...newProducts]
        dispatch(updateShoppingActionAsync(updateShopping,productModal.id)).then(()=>{
            const getTransactionsUsers= []
            productModal.products.forEach(item=>{
                const product= products.find(itemProduct=> itemProduct.id === item.productId)
                const dataUser= users.find(item=> item.uid === product.id_publicador);
                const index= getTransactionsUsers.findIndex(item=> item.userId === dataUser.id)
                if(index>-1){
                    const amount= getTransactionsUsers[index].amount+(product.precio?product.precio:0);
                    getTransactionsUsers.splice(index,1,{userId:dataUser.id,amount:amount});
                }else{
                    getTransactionsUsers.push({userId:dataUser.id,amount:product.precio?product.precio:0})
                }
            })
            // console.log(getTransactionsUsers)
            getTransactionsUsers.forEach(itemTransaction=>{
                const dataTransaction ={
                    amount: itemTransaction.amount?itemTransaction.amount.toLocaleString("de-DE"):0,
                    date: new Date().toISOString(),
                    type: "Venta",
                    userId:itemTransaction.userId ,
                }
                dispatch(createTransactionActionAsync(dataTransaction))
            })
            toggleOrder()
            Swal.fire({
                icon: "success",
                title: "Entrega confirmada!",
                confirmButtonText: "Ok",
            })
        })

    }

    return (
        <Modal isOpen={modalOrder} toggle={toggleOrder} centered className="confirm-order">
            <ModalHeader className="border-0" toggle={toggleOrder}></ModalHeader>
            <ModalBody className="text-center">
                <h4 className="title">¡Queremos saber tu opinión!</h4>
                <div className="mt-5">
                    <p>Hola  <b>{user.name}</b></p>
                    <p>¿podrías confirmarnos si recibiste tu compra?</p>
                </div>
            </ModalBody>
            <ModalFooter className="border-0 justify-content-evenly">
                <Button className="btn-confirm" size="lg" onClick={onCancelTranfer}>
                    No
                </Button>
                <Button className="btn-confirm" size="lg"  onClick={onSuccessTranfer}>
                    Si
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ConfirmOrder;
