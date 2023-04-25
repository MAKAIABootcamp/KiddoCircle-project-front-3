import React, { useMemo, useState, useEffect } from "react";
import iconClose from "../../../assets/icons/icon close.png";
import { useForm } from "react-hook-form";
import { getProductsActionAsync } from "../../../redux/actions/ProductsActions";
import { useDispatch, useSelector } from "react-redux";
import iconDonation from "../../../assets/icons/forDonation.png";

const SearchModal = ({ setModal }) => {
  const { watch, register } = useForm();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(getProductsActionAsync());
  }, []);

  const handleModalSearch = () => {
    setModal(false);
  };

  const searchValue = watch("search".toLowerCase());

  const filterProducts = useMemo(() => {
    const filter = products.filter((product) =>
      product?.nombre?.toLowerCase().includes(searchValue)
    );
    console.log(filter);
    if (searchValue != "") {
      return filter;
    } else {
      return [];
    }
  }, [searchValue, products]);

  console.log(filterProducts);

  return (
    <aside className="searchModal">
      <figure onClick={handleModalSearch} className="searchModal__figure">
        <img src={iconClose} alt="icon-close" />
      </figure>
      <form className="searchModal__form">
        <input
          type="text"
          placeholder="¿Qué estás buscando?"
          {...register("search")}
          className="searchModal__input"
        />
      </form>
      <section className="section-filter">
        {filterProducts.length ? (
          filterProducts?.map((product, index) => (
            <div key={index} className="filterProduct">
              <figure className="filterProduct__figure">
                <img className="filterProduct__img" src={product.fotos[0]} />
              </figure>
              <div className="filterProduct__container">
                <p className="filterProduct__container-name">
                  {product.nombre}
                </p>
                {product.precio ? (
                  <p className="filterProduct__container-price">
                    ${product.precio}
                  </p>
                ) : (
                  <p className="donation-text">Para donar</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </section>
    </aside>
  );
};

export default SearchModal;
