import React from 'react';
import { NavLink } from 'react-router-dom';

import '../styles/components/main-navigation.scss'

function MainNavigation() {
  return (
    <header className='header'>
      <nav>
        <ul className='nav-list'>
          <li>
            <NavLink to='/' className={
              ({ isActive }) => isActive ? 'active' : undefined
            }
              end
            >
              Home
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;