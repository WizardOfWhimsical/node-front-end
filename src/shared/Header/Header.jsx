import { NavLink } from 'react-router';
import styles from './Header.module.css';
import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { context as UserContext } from '../../reducers/user.reducer';

function Header() {
  const { userState } = useContext(UserContext);
  const [title, setTitle] = useState('Todo List');
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/') {
      setTitle('Todo List');
    } else if (location.pathname === '/logon') {
      setTitle('Todo List Logon');
    } else if (location.pathname === '/register') {
      setTitle('Todo List Register');
    } else if (location.pathname === '/about') {
      setTitle('About');
    } else if (location.pathname === '/stats') {
      setTitle('Profile Stats');
    } else {
      setTitle('Not Found');
    }
  }, [location]);
  return (
    <header className={styles.nav}>
      <h1 className={styles.siteTitle}>{title}</h1>
      <nav className={styles.linkContainer}>
        <NavLink
          className={({ isActive }) => (isActive ? 'active' : '')}
          to={'/'}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'active' : '')}
          to={'/about'}
        >
          About
        </NavLink>
        {userState?.userData?.name && userState?.userData?.csrfToken && (
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : '')}
            to={'/stats'}
          >
            Stats
          </NavLink>
        )}
      </nav>
    </header>
  );
}

export default Header;
