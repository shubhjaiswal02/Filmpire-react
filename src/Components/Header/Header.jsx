import React, { useState } from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="nav">
      <NavLink to="/">
        <img src={process.env.PUBLIC_URL + '/filmpire.png'} alt="logo" className="logo-img" />
      </NavLink>
      <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <NavLink to="movies/popular">Popular</NavLink>
        <NavLink to="movies/top_rated">Top Rated</NavLink>
        <NavLink to="movies/upcoming">Upcoming</NavLink>
        <NavLink to="/watchlist">Watchlist</NavLink>
      </div>
      {/* <div >
        <img src="/profile.jpg" alt="profile" className="profile-img" />
      </div> */}
      <div className={`hamburger-menu ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </nav>
  );
}

export default Header;
