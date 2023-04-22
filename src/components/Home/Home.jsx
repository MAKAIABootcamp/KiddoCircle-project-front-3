import React, {useEffect} from "react";
import CarouselImages from "./carousel/CarouselImages";
import PopularsSection from "./populars-section/PopularsSection";
import ClothesSection from "./clothes-section/ClothesSection";
import GradientDivision from "./gradient-division/GradientDivision";
import ToysSection from "./toys-section/ToysSection";
import FavoritesSection from "./favorites-section/FavoritesSection";
import ConfirmOrder from "./ConfirmOrder/ConfirmOrder";
import ButtonsSection from "./buttons-section/ButtonsSection";
import Footer from "./footer/Footer";
import PopUpLogin from "./PopUpLogin/PopUpLogin";
import { useSelector, useDispatch } from "react-redux";
import {getProductsActionAsync} from '../../redux/actions/ProductsActions'

const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.products);
  console.log(products)

  useEffect(()=>{
    dispatch(getProductsActionAsync())
},[])

  return (
    <section style={{ padding: 0, margin: 0 }}>
      <CarouselImages />
      <PopularsSection />
      <ClothesSection />
      <GradientDivision />
      <ToysSection />
      <FavoritesSection />
      <ConfirmOrder />
      <ButtonsSection />
      <Footer />
      <PopUpLogin/>
    </section>
  );
};

export default Home;
