import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './components/pages/Home';
import Catalog from './components/pages/Catalog';
import About from './components/pages/About';
import Contacts from './components/pages/Contacts';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {path: 'catalog', element: <Catalog />},
      {path: 'about', element: <About />},
      {path: 'contacts', element: <Contacts />}
    ],
  },
]);
