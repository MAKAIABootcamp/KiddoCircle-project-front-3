import React, {useEffect} from "react";
import productImg from '../../../assets/coche.png'
import { useDispatch, useSelector } from "react-redux";
import {getShoppingsActionAsync} from '../../../redux/actions/shoppingActions'
import {getUsersActionAsync} from '../../../redux/actions/usersActions'
import { DateTime } from "luxon";

const ProductsList = ({productsShop, phone})=>{
    const { products } = useSelector((store) => store.products);
    const {users} = useSelector((store) => store.allUsers);

    return(
        <>
        {products && users &&
            productsShop.map(product=>{
                const crrProduct= products.find(item=> item.id === product.productId);
                const dataUser= users.find(item=> item.uid === crrProduct.id_publicador);
                return(
                    <div className="d-flex mx-4 card-buy mb-2" key={product.productId}>
                        <div className="flex-shrink-0">
                            <img className="product" src={crrProduct.fotos[0]} alt="product" />
                        </div>
                        <div className="flex-grow-1 ms-5 data-product">
                            <span className={product.status ==="Entregado"?"status fw-semibold":product.status ==="Enviado"?"default fw-semibold":"canceled fw-semibold"}>{product.status}</span>
                            <p>{crrProduct.nombre}</p>
                            {dataUser &&
                                <a className="linkChat fw-semibold" href={`https://wa.me/${dataUser.phone.replace('+','')}/?text=tu%20texto%20personalizado`} target="_blank">Enviar mensaje</a>
                            }
                        </div>
                    </div>
                )
            })
        }
        </>
    )
}

const Buy = () => {
    const dispatch = useDispatch();
    const { shoppings } = useSelector((store) => store.shopping);
    const user = useSelector((store) => store.user);

    useEffect(()=>{
        if(user){
            dispatch(getShoppingsActionAsync(user.id))
        }
    },[user])

    useEffect(()=>{
        dispatch(getUsersActionAsync())
    },[])

    return (
        <section className="buy px-4">
            {shoppings.length>0 &&
                shoppings.map(shop=>(
                    <div key={shop.id}>
                        <p className="mb-4 fw-semibold mt-3">{DateTime.fromISO(shop.date).toLocaleString({locale: "es", month:'long', day: 'numeric',...(new Date().getFullYear() > DateTime.fromISO(shop.date).toFormat("yyyy") && { year:'numeric'}) })}</p>
                        <ProductsList productsShop={shop.products}  phone={shop.phone}/>
                    </div>
                ))
            }
        </section>
    );
};

export default Buy;
