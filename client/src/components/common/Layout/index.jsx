import { Outlet } from 'react-router-dom';

const Layout = () => {
  return <Outlet />; // Only renders nested routes
};

export default Layout;
