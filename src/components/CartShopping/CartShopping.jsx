import React, {useEffect,useState} from "react";
import { Button } from 'reactstrap';
import close from '../../assets/icons/icon close.png'
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import {Recharge} from "../MyAccount/Wallet/Form/FormRecharge";
import {getTotalTransactions, getTotalPrice} from '../../utils/general'
import { useSelector, useDispatch } from "react-redux";
import {getTransactionsActionAsync} from '../../redux/actions/walletActions'
import {currentShopAction, createShoppingActionAsync} from '../../redux/actions/shoppingActions'
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { updateProductActionAsync } from '../../redux/actions/ProductsActions'

const CartShopping = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [total, setTotal] = useState('0');
    const [totalToShop, setTotalToShop] = useState('0');
    const { register, setValue, handleSubmit,watch,reset , formState: { errors } } = useForm({
        defaultValues: {
            value: "",
            numberCard: "",
            ED: "",
        },
    });
    const { transactions } = useSelector((store) => store.wallet);
    const { currentShopping } = useSelector((store) => store.shopping);
    const { products } = useSelector((store) => store.products);
    const user = useSelector((store) => store.user);

    useEffect(()=>{
        if(user){
            dispatch(getTransactionsActionAsync(user.id))
        }
    },[user])

    useEffect(()=>{
        if(transactions){
            const sumTotal= getTotalTransactions(transactions)
            setTotal(sumTotal)
        }
    },[transactions]);

    useEffect(()=>{
        if(currentShopping && currentShopping.products && currentShopping.products.length>0){
            const sumToShop=  getTotalPrice(products,currentShopping.products);
            setTotalToShop(sumToShop)
        } else{
            setTotalToShop('0')
        }
    },[currentShopping]);

    const closeModal=()=>{
        reset();
    }

    const deleteProduct= (productId)=>{
        const newShopping={...currentShopping}
        const products= [...newShopping.products]
        const index= newShopping.products.findIndex(item=> item.productId === productId)
        if(index>-1){
            products.splice(index,1);
        }
        newShopping.products=[...products]
        dispatch(currentShopAction(newShopping))
    }

    const doShopping=()=>{
        if(Object.keys(currentShopping).length>0 && currentShopping.products.length>0 && total && totalToShop){
            const updateShopping={...currentShopping};
            const productsShop=[...updateShopping.products]
            const newProducts=[];
            const updateProducts=[]
            productsShop.forEach(item=>{
                const updateProduct= products.filter(itemProd=> itemProd.id === item.productId)[0];
                updateProducts.push({...updateProduct,disponibilidad: false})
                newProducts.push({...item, status:"Enviado"})
            })
            updateShopping.products=[...newProducts]
            updateShopping.amount = totalToShop;
            updateShopping.type= "Compra";
            // console.log(updateProducts)
            dispatch(createShoppingActionAsync(updateShopping)).then(()=>{
                Swal.fire({
                    icon: "success",
                    title: "Compra realizada!",
                    confirmButtonText: "Ok",
                }).then((result) => {
                    updateProducts.forEach(prod=>{
                        dispatch(updateProductActionAsync(prod))
                    })
                    if (result.isConfirmed) {
                      navigate('/');
                    }
                })
            })
        }
    }

    return (
        <section className="cart-shopping mb-5">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="cards-shopping">
                            {currentShopping && currentShopping.products &&
                                currentShopping.products.map(product=>{
                                    const crrProuct= products.find(item=> item.id === product.productId);
                                    return(
                                        <div className="card-buy mb-2" key={product.productId}>
                                            <button type="button" className="btn p-0 w-100 text-end" onClick={()=>deleteProduct(product.productId)}>
                                                <img src={close} alt="close" />
                                            </button>
                                            <div className="d-flex card-shopping">
                                                <div className="flex-shrink-0">
                                                    <img className="product" src={crrProuct.fotos[0]} alt="product" />
                                                </div>
                                                <div className="flex-grow-1 ms-4 data-product">
                                                    <span className="fw-semibold">{crrProuct.nombre}</span>
                                                    <p>$ {crrProuct.precio?crrProuct.precio.toLocaleString("de-DE"):0}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <p className="text-end price fw-semibold">Total: <span className="ms-3">$ {totalToShop}</span></p>

                    </div>
                    <div className="col-sm-6 px-4 data-shopping ">
                    <h3 className="text-center fw-semibold">Saldo actual</h3>
                        <div className="info-user">
                            <p className="m-0">Saldo:<b> $ {total}</b></p>
                        </div>
                        <h3 className="text-center fw-semibold mt-3">Dirección de envío</h3>
                        <div className="info-user">
                            {user && user.id  &&
                                <>
                                    <p className="m-0">{user.address}</p>
                                    <p className="m-0">{user.city}</p>
                                </>
                            }
                            <NavLink to="/cuenta">Editar dirección</NavLink>
                        </div>
                        {Number(total.replace(/[.]/g,'')) < Number(totalToShop.replace(/[.]/g,'')) ?
                            <>
                                <h3 className="text-center fw-semibold mt-3">Recargar</h3>
                                <Recharge closeModal={closeModal} register={register} setValue={setValue} handleSubmit={handleSubmit} watch={watch}  errors={errors} total={total} totalToShop={totalToShop}/>
                            </>
                        :
                            <div className="btn-shop">
                                <Button
                                    type="button"
                                    onClick={doShopping}
                                    disabled={(Object.keys(currentShopping).length>0 && currentShopping.products.length===0) || Object.keys(currentShopping).length===0}
                                >Comprar</Button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CartShopping;
