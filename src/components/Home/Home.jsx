import React from "react";
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

const Home = () => {
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
