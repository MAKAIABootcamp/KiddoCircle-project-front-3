import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import logo from '../../assets/icons/logo.png';
import search from '../../assets/icons/icon search.png';
import { NavLink, Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = () => {
  return (
    <>
        <Navbar  expand='md' className="pb-0 pt-3 nav-bar">
            <Container fluid>
                <img className="logo" src={logo} alt="logo" />
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`}/>
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-md`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton className="justify-content-end">
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                    <Nav className="justify-content-center  flex-grow-1 nav-bar-items fw-semibold">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "selected px-0 nav-link" : "px-0 nav-link"
                            }
                        >
                            Inicio
                        </NavLink>
                        <NavLink
                            to="/ropa"
                            className={({ isActive }) =>
                                isActive ? "selected px-0 nav-link" : "px-0 nav-link"
                            }
                        >
                            Ropa
                        </NavLink>
                        <NavLink
                            to="/juguetes"
                            className={({ isActive }) =>
                                isActive ? "selected px-0 nav-link" : "px-0 nav-link"
                            }
                        >
                            Juguetes
                        </NavLink>
                        <NavLink
                            to="/articulos"
                            className={({ isActive }) =>
                                isActive ? "selected px-0 nav-link" : "px-0 nav-link"
                            }
                        >
                            Artículos
                        </NavLink>
                        <NavLink
                            to="/mi-cuenta"
                            className={({ isActive }) =>
                                isActive ? "selected px-0 nav-link" : "px-0 nav-link"
                            }
                        >
                            Mi cuenta
                        </NavLink>
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
                        />
                    </Form>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
        <Outlet />
    </>
  );
};

export default NavBar;