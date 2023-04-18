import React from "react";
import product from '../../../assets/coche.png'

const Buy = () => {
    return (
        <section className="buy px-4">
            <p className="mb-4 fw-semibold mt-3">1 de abril</p>
            <div className="d-flex mx-4 card-buy mb-2">
                <div className="flex-shrink-0">
                    <img className="product" src={product} alt="product" />
                </div>
                <div className="flex-grow-1 ms-5 data-product">
                    <span className="status fw-semibold">Entregado</span>
                    <p>Cochesito marca XDD</p>
                    <a className="linkChat fw-semibold" href="https://wa.me/573054829046/?text=tu%20texto%20personalizado" target="_blank">Enviar mensaje</a>
                </div>
            </div>
            <div className="d-flex mx-4 card-buy mb-2">
                <div className="flex-shrink-0">
                    <img className="product" src={product} alt="product" />
                </div>
                <div className="flex-grow-1 ms-5 data-product">
                    <span className="status fw-semibold">Entregado</span>
                    <p>Cochesito marca XDD</p>
                    <a className="linkChat fw-semibold" href="https://wa.me/573054829046/?text=tu%20texto%20personalizado" target="_blank">Enviar mensaje</a>
                </div>
            </div>
            <p className="mb-4 fw-semibold mt-3">06 de noviembre de 2022</p>
            <div className="d-flex mx-4 card-buy mb-2">
                <div className="flex-shrink-0">
                    <img className="product" src={product} alt="product" />
                </div>
                <div className="flex-grow-1 ms-5 data-product">
                    <span className="status fw-semibold">Entregado</span>
                    <p>Cochesito marca XDD</p>
                    <a className="linkChat fw-semibold" href="https://wa.me/573054829046/?text=tu%20texto%20personalizado" target="_blank">Enviar mensaje</a>
                </div>
            </div>
        </section>
    );
};

export default Buy;
