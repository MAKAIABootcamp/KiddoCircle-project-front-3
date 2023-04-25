import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import iconProfile from "../../../assets/icons/icon user.png";
import iconFavorite from "../../../assets/icons/icon heart.png";
import iconPublish from "../../../assets/icons/icon image.png";
import iconCard from "../../../assets/icons/card-outline.png";
import iconWallet from "../../../assets/icons/wallet-outline.png";
import iconChat from "../../../assets/icons/icon mensaje.png";
import { useDispatch, useSelector } from "react-redux";
import { doLogoutAsync } from "../../../redux/actions/userActions";
import Swal from "sweetalert2";
import Loading from "../../loading/Loading";
import { toggleLoading } from "../../../redux/actions/LoadingActions";

const MenuProfile = () => {
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.loading);
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      icon: "info",
      title: "¿Ya te vas?",
      showCancelButton: true,
      confirmButtonText: "Si!",
      confirmCancelButton: "No!",
    })
      .then((response) => {
        if (response.isConfirmed) {
          dispatch(doLogoutAsync());
          dispatch(toggleLoading());
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "success",
          title: "Continue",
        });
      });
  };
  return (
    <section className="my-account">
      {loading ? <Loading /> : <></>}
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-4">
            <Nav vertical="md">
              <NavItem>
                <NavLink
                  to="perfil"
                  className={({ isActive }) =>
                    isActive
                      ? "selected d-flex align-items-center nav-link"
                      : "d-flex align-items-center nav-link"
                  }
                >
                  <img
                    className="flex-shrink-0 p-2"
                    src={iconProfile}
                    alt="perfil"
                  />
                  <span className="flex-grow-1 ms-2">Perfil</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="favoritos"
                  className={({ isActive }) =>
                    isActive
                      ? "selected d-flex align-items-center nav-link"
                      : "d-flex align-items-center nav-link"
                  }
                >
                  <img
                    className="flex-shrink-0 p-2"
                    src={iconFavorite}
                    alt="perfil"
                  />
                  <span className="flex-grow-1 ms-2">Favoritos</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="mis-publicaciones"
                  className={({ isActive }) =>
                    isActive
                      ? "selected d-flex align-items-center nav-link"
                      : "d-flex align-items-center nav-link"
                  }
                >
                  <img
                    className="flex-shrink-0 p-2"
                    src={iconPublish}
                    alt="perfil"
                  />
                  <span className="flex-grow-1 ms-2">Mis publicaciones</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="mis-compras-donaciones"
                  className={({ isActive }) =>
                    isActive
                      ? "selected d-flex align-items-center nav-link"
                      : "d-flex align-items-center nav-link"
                  }
                >
                  <img
                    className="flex-shrink-0 p-2"
                    src={iconCard}
                    alt="perfil"
                  />
                  <span className="flex-grow-1 ms-2">
                    Mis Compras /Donaciones
                  </span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="mi-billetera"
                  className={({ isActive }) =>
                    isActive
                      ? "selected d-flex align-items-center nav-link"
                      : "d-flex align-items-center nav-link"
                  }
                >
                  <img
                    className="flex-shrink-0 p-2"
                    src={iconWallet}
                    alt="perfil"
                  />
                  <span className="flex-grow-1 ms-2">Mi Billetera</span>
                </NavLink>
              </NavItem>

            </Nav>
            {user.name !== "" ? (
              <button
                className="button-loggout"
                size="lg"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            ) : (
              <></>
            )}
          </div>
          <div className="col-lg-9 col-md-8 content-accout">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuProfile;
