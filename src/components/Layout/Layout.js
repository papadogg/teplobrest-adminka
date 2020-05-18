import React, { Fragment } from 'react';
import Sidebar from '../Sidebar';
import './index.scss';

const Layout = ({ children }) => (
  <Fragment>
    <Sidebar />
    <main>{children}</main>
  </Fragment>
);

export default Layout;
