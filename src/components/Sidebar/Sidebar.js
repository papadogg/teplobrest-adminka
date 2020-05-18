import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './index.scss';

const Sidebar = () => {
  const location = useLocation();
  if (location.pathname === '/login') {
    return null;
  }
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <Link to="/">Главная</Link>
        </li>
        <li>
          <Link to="/products">Продукты</Link>
          <ul>
            <li>
              <Link to="/products/new">Новый</Link>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
