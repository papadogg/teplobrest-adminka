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
          <Link to="/catalog">Каталог</Link>
          <ul>
            <li>
              <Link to="/products/new">Добавить товар</Link>
            </li>
            <li>
              <Link to="/products/new-variable">
                Добавить вариабельный товар
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/brands">Производители</Link>
        </li>
        <li>
          <Link to="/categories">Категории</Link>
        </li>
        <li>
          <Link to="/attributes">Характеристики</Link>
        </li>
        <li>
          <Link to="/orders">Заказы</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
