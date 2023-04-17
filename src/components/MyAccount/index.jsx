import { useCallback, useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import menuIcon from '../../assets/icons/menu-icon.png';
import profileIcon from '../../assets/icons/profile-icon.png';
import favoritesIcon from '../../assets/icons/heart-icon.png';
import postsIcon from '../../assets/icons/camera-icon.png';
import chatIcon from '../../assets/icons/chat-icon.png';

import './styles.scss';

const initialState = [
  {
    id: 'perfil',
    name: 'Perfil',
    route: '/mi-cuenta/perfil',
    isActive: true,
    icon: profileIcon,
  },
  {
    id: 'favoritos',
    name: 'Favoritos',
    route: '/mi-cuenta/favoritos',
    isActive: false,
    icon: favoritesIcon,
  },
  {
    id: 'publicaciones',
    name: 'Mis publicaciones',
    route: '/mi-cuenta/publicaciones',
    isActive: false,
    icon: postsIcon,
  },
  {
    id: 'chat',
    name: 'Chat',
    route: '/mi-cuenta/chat',
    isActive: false,
    icon: chatIcon,
  },
];

const Profile = () => {
  const location = useLocation();

  const [links, setLinks] = useState(initialState);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState();

  const handleChangeCurrentPage = useCallback(
    (linkId) => {
      const newLinks = links.map((link) =>
        link.id === linkId
          ? { ...link, isActive: true }
          : { ...link, isActive: false }
      );

      setLinks(newLinks);
    },
    [links]
  );

  useEffect(() => {
    const linkId = location.pathname.split('/')[2];
    const currentLink = links.find((link) => link.id === linkId);

    setCurrentPage({ ...currentLink, isActive: true });
  }, [location, links]);

  return (
    <section className='account'>
      <div>
        <div className='profile-bar'>
          <div className='current-page'>
            {currentPage && (
              <>
                <img src={currentPage.icon} alt='menu icon' />
                <span>{currentPage.name}</span>
              </>
            )}
          </div>

          <img
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='menu-mobile'
            src={menuIcon}
            alt='menu icon'
            title='Abrir menu'
          />
        </div>

        <nav className={`menu ${isMenuOpen ? 'menuActive' : ''}`}>
          {links.map((link) => (
            <Link
              key={link.id}
              to={link.route}
              className={`menu__link ${
                link.isActive ? 'menu__link--active' : ''
              }`}
              onClick={() => handleChangeCurrentPage(link.id)}
            >
              <img src={link.icon} alt={link.name} />
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className='content'>
        <Outlet />
      </div>
    </section>
  );
};

export default Profile;
