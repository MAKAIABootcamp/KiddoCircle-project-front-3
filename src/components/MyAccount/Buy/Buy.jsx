import React, {useEffect} from "react";
import productImg from '../../../assets/coche.png'
import { useDispatch, useSelector } from "react-redux";
import {getShoppingsActionAsync} from '../../../redux/actions/shoppingActions'
import { DateTime } from "luxon";

const ProductsList = ({productsShop, phone})=>{
    const { products } = useSelector((store) => store.products);

    return(
        <>
        {products &&
            productsShop.map(product=>{
                const crrProduct= products.find(item=> item.id === product.productId);
                return(
                    <div className="d-flex mx-4 card-buy mb-2" key={product.productId}>
                        <div className="flex-shrink-0">
                            <img className="product" src={crrProduct.fotos[0]} alt="product" />
                        </div>
                        <div className="flex-grow-1 ms-5 data-product">
                            <span className="status fw-semibold">{product.status}</span>
                            <p>{crrProduct.nombre}</p>
                            {phone &&
                                <a className="linkChat fw-semibold" href={`https://wa.me/${phone.replace('+','')}/?text=tu%20texto%20personalizado`} target="_blank">Enviar mensaje</a>
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

    return (
        <section className="buy px-4">
            {shoppings.length>0 &&
                shoppings.map(shop=>(
                    <div key={shop.id}>
                        <p className="mb-4 fw-semibold mt-3">{DateTime.fromISO(new Date().toISOString()).toLocaleString({month:'long', day: 'numeric',...(new Date().getFullYear() > DateTime.fromISO('2023-04-22T04:19:22.222Z').toFormat("yyyy") && { year:'numeric'}) })}</p>
                        <ProductsList productsShop={shop.products}  phone={shop.phone}/>
                    </div>
                ))
            }
        </section>
    );
};

export default Buy;
