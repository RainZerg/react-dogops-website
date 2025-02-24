import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { history } from './services/history.ts'
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import CartButton from './components/features/CartButton';

const App = () => {
    history.navigate = useNavigate();
    history.location = useLocation();
  return (
    <div className='flex flex-col'>
      <Header />
      <main className='flex-1 bg-white text-black min-h-screen'>
        <Outlet />
        <CartButton />
      </main>
      <Footer />
    </div>
  );
};

export default App;
