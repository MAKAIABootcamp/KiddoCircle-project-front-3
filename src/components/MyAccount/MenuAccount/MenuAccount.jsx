import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Nav, NavItem} from 'reactstrap'
import iconProfile from '../../../assets/icons/icon user.png'
import iconFavorite from '../../../assets/icons/icon heart.png'
import iconPublish from '../../../assets/icons/icon image.png'
import iconCard from '../../../assets/icons/card-outline.png'
import iconWallet from '../../../assets/icons/wallet-outline.png'
import iconChat from '../../../assets/icons/icon mensaje.png'

const MenuProfile = () => {

  return (
    <section className="my-account">
      <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4">
              <Nav vertical="md">
                <NavItem>
                  <NavLink to="perfil"  
                    className={({ isActive }) =>
                        isActive ? "selected d-flex align-items-center nav-link" : "d-flex align-items-center nav-link"
                    }
                  >
                    <img className="flex-shrink-0 p-2" src={iconProfile} alt="perfil" />
                    <span className="flex-grow-1 ms-2">Perfil</span> 
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="favoritos" 
                    className={({ isActive }) =>
                        isActive ? "selected d-flex align-items-center nav-link" : "d-flex align-items-center nav-link"
                    }
                  >
                    <img className="flex-shrink-0 p-2" src={iconFavorite} alt="perfil" />
                    <span className="flex-grow-1 ms-2">Favoritos</span> 
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="mis-publicaciones"  
                    className={({ isActive }) =>
                        isActive ? "selected d-flex align-items-center nav-link" : "d-flex align-items-center nav-link"
                    }
                  >
                    <img className="flex-shrink-0 p-2" src={iconPublish} alt="perfil" />
                    <span className="flex-grow-1 ms-2">Mis publicaciones</span> 
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="mis-compras-donaciones" 
                    className={({ isActive }) =>
                      isActive ? "selected d-flex align-items-center nav-link" : "d-flex align-items-center nav-link"
                    }
                  >
                    <img className="flex-shrink-0 p-2" src={iconCard} alt="perfil" />
                    <span className="flex-grow-1 ms-2">Mis Compras /Donaciones</span> 
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="mi-billetera" 
                    className={({ isActive }) =>
                      isActive ? "selected d-flex align-items-center nav-link" : "d-flex align-items-center nav-link"
                    }
                  >
                    <img className="flex-shrink-0 p-2" src={iconWallet} alt="perfil" />
                    <span className="flex-grow-1 ms-2">Mi Billetera</span> 
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="chat"
                    className={({ isActive }) =>
                      isActive ? "selected d-flex align-items-center nav-link" : "d-flex align-items-center nav-link"
                    }
                  >
                    <img className="flex-shrink-0 p-2" src={iconChat} alt="perfil" />
                    <span className="flex-grow-1 ms-2">Chat</span> 
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
            <div className="col-lg-9 col-md-8 content-accout">
              <Outlet/>
            </div>
          </div>
        </div>
    </section>
  );
};

export default MenuProfile;
