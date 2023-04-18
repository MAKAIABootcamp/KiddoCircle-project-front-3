import React from "react";
import { Outlet } from "react-router-dom";

const MenuProfile = () => {

  return (
    <>
      <section className="my-profile-menu">
      Menu
      </section>
      <Outlet />
    </>
  );
};

export default MenuProfile;
