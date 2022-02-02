import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  }
  return (
    <header>
      <div className="navbar is-info">
        <Link className='navbar-brand' to="/">
          <h1 className='navbar-item content is-medium'>Interview Key</h1>
        </Link>

        <nav className='navbar-end'>
          {Auth.loggedIn() ? (
            <>
              <Link className='navbar-item' to="/dashboard">Dashboard</Link>
              <a className='navbar-item'href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link className='navbar-item' to="/login">Login</Link>
              <Link className='navbar-item' to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
export default Header;
