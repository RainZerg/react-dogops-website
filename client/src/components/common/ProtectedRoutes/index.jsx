import { Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosInstance from '@/services/axiosInstance';
import LoadingSpinner from '../LoadingSpinner';

const PrivateRoutes = () => {
  const [isValidating, setIsValidating] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.post('/validate', {}, {
      skipAuthRedirect: true // Add custom flag to prevent interceptor redirect
    })
      .then(() => setIsValidating(false))
      .catch(() => {
        navigate('/login', { replace: true });
      });
  }, [navigate]);

  return isValidating ? <LoadingSpinner /> : <Outlet />;
}

export default PrivateRoutes;
