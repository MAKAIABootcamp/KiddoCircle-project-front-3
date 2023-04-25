import React, { useEffect, useMemo, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import logo from "../../assets/icons/logo.png";
import search from "../../assets/icons/icon search.png";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchModal from "./search-modal/SearchModal";
import { useForm } from "react-hook-form";
import carShopping from "../../assets/icons/cart-outline.png";
import { useDispatch, useSelector } from "react-redux";
import { getProductsActionAsync } from "../../redux/actions/ProductsActions";

const NavBar = () => {
  const [modal, setModal] = useState(false);
  const { watch, register } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentShopping } = useSelector((store) => store.shopping);
  const user = useSelector((store) => store.user);

  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(getProductsActionAsync());
  }, []);
  const searchValue = watch("search".toLowerCase());

  const filterProducts = useMemo(() => {
    const filter = products.filter((product) =>
      product?.nombre?.toLowerCase().includes(searchValue)
    );
    if (searchValue != "") {
      return filter;
    } else {
      return [];
    }
  }, [searchValue, products]);

  const handleModalSearch = () => {
    setModal(true);
  };

  const handleRoute = (product) => {
    navigate(`/producto/${product.id}`);
  };

  return (
      <>
          {modal ? <SearchModal setModal={setModal} /> : <></>}
          <Navbar expand="md" className="pb-0 pt-3 nav-bar">
              <Container fluid>
                  <img className="logo" src={logo} alt="logo" />
                  {/* MODAL PARA BÚSQUEDA */}
                  <figure className="search-icon" onClick={handleModalSearch}>
                      <img className="search-icon__img" src={search} />
                  </figure>
                  <div className="d-flex align-items-center">
                      <Navbar.Toggle
                          aria-controls={`offcanvasNavbar-expand-md`}
                      />
                      <Navbar.Offcanvas
                          id={`offcanvasNavbar-expand-md`}
                          aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                          placement="end"
                      >
                          <Offcanvas.Header
                              closeButton
                              className="justify-content-end"
                          ></Offcanvas.Header>
                          <Offcanvas.Body>
                              <Nav className="justify-content-center  flex-grow-1 nav-bar-items fw-semibold">
                                  <NavLink
                                      to="/"
                                      className={({ isActive }) =>
                                          isActive
                                              ? "selected px-0 nav-link"
                                              : "px-0 nav-link"
                                      }
                                  >
                                      Inicio
                                  </NavLink>
                                  <NavLink
                                      to="/ropa"
                                      className={({ isActive }) =>
                                          isActive
                                              ? "selected px-0 nav-link"
                                              : "px-0 nav-link"
                                      }
                                  >
                                      Ropa
                                  </NavLink>
                                  <NavLink
                                      to="/juguetes"
                                      className={({ isActive }) =>
                                          isActive
                                              ? "selected px-0 nav-link"
                                              : "px-0 nav-link"
                                      }
                                  >
                                      Juguetes
                                  </NavLink>
                                  <NavLink
                                      to="/articulos"
                                      className={({ isActive }) =>
                                          isActive
                                              ? "selected px-0 nav-link"
                                              : "px-0 nav-link"
                                      }
                                  >
                                      Artículos
                                  </NavLink>
                                  {user.isLogged ? (
                                      <NavLink
                                          to="/cuenta"
                                          className={({ isActive }) =>
                                              isActive
                                                  ? "selected px-0 nav-link"
                                                  : "px-0 nav-link"
                                          }
                                      >
                                          Mi cuenta
                                      </NavLink>
                                  ) : (
                                      <NavLink
                                          to="/login"
                                          className={({ isActive }) =>
                                              isActive
                                                  ? "selected px-0 nav-link"
                                                  : "px-0 nav-link"
                                          }
                                      >
                                          Iniciar sesión
                                      </NavLink>
                                  )}
                              </Nav>
                              <Form className="search me-3">
                                  <Button>
                                      <img src={search} alt="search" />
                                  </Button>
                                  <Form.Control
                                      type="input"
                                      placeholder="Buscar productos"
                                      className="me-2"
                                      aria-label="Search"
                                      {...register("search")}
                                  />
                              </Form>
                          </Offcanvas.Body>
                      </Navbar.Offcanvas>
                      {user && user.id && (
                          <NavLink
                              to="/car-shopping"
                              className="px-0 nav-link car"
                          >
                              <img src={carShopping} alt="car" />
                              <span className="totalproducts fw-semibold">
                                  {currentShopping && currentShopping.products
                                      ? currentShopping.products.length
                                      : 0}
                              </span>
                          </NavLink>
                      )}
                  </div>
              </Container>
          </Navbar>
          {filterProducts.length ? (
              <div className="filter-container">
                  {filterProducts?.map((product, index) => (
                      <div
                          key={index}
                          className="filterProduct"
                          onClick={() => handleRoute(product)}
                      >
                          <figure className="filterProduct__figure">
                              <img
                                  className="filterProduct__img"
                                  src={product.fotos[0]}
                              />
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
                  ))}
              </div>
          ) : (
              <></>
          )}
          <Outlet />
      </>
  );
};

export default NavBar;
