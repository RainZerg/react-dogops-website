import { createBrowserRouter } from 'react-router-dom'; 
import Layout from './components/common/Layout';
import Home from './components/pages/Home';
import Catalog from './components/pages/Catalog';
import About from './components/pages/About';
import Contacts from './components/pages/Contacts';
import Login from './components/pages/Login';
import App from './App.jsx';
import ProtectedRoutes from './components/common/ProtectedRoutes';
import Profile from './components/pages/Profile'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                element: <Layout />,
                children: [
                    {index: true, element: <Home /> },
                    {path: 'catalog', element: <Catalog />},
                    {path: 'about', element: <About />},
                    {path: 'contacts', element: <Contacts />},
                    {path: 'login', element: <Login />},
                ],
            },
            {
                element: <ProtectedRoutes />,
                children: [
                    {
                        path: "/profile",
                        element: <Profile />,
                    },
                ],
            },
        ]}]);
