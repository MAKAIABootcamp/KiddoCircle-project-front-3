import React from "react";
import CarouselImages from "./carousel/CarouselImages";
import PopularsSection from "./populars-section/PopularsSection";
import ClothesSection from "./clothes-section/ClothesSection";
import GradientDivision from "./gradient-division/GradientDivision";
import ToysSection from "./toys-section/ToysSection";
import FavoritesSection from "./favorites-section/FavoritesSection";

const Home = () => {
  return (
    <section style={{ padding: 0, margin: 0 }}>
      <CarouselImages />
      <PopularsSection />
      <ClothesSection />
      <GradientDivision />
      <ToysSection />
      <FavoritesSection />
    </section>
  );
};

export default Home;
