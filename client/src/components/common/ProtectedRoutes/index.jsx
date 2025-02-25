import { Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/hooks/authStore';
import axiosInstance from '@/services/axiosInstance';
import LoadingSpinner from '../LoadingSpinner';

const ProtectedRoutes = () => {
  const [isValidating, setIsValidating] = useState(true);
  const { token, clearToken } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const validateAuthentication = async () => {
      // If there's no token, redirect immediately
      if (!token) {
        setIsValidating(false);
        navigate('/login', { replace: true });
        return;
      }

      try {
        // Validate the token with the backend
        await axiosInstance.post('/api/users/validation', {}, {
          skipAuthRedirect: true
        });
        setIsValidating(false);
      } catch (error) {
        // If validation fails, clear the token and redirect
        clearToken();
        setIsValidating(false);
        navigate('/login', { replace: true });
      }
    };

    validateAuthentication();
  }, [token, navigate, clearToken]);

  if (isValidating) {
    return <LoadingSpinner />;
  }

  // Only render the protected content if we have a token and validation is complete
  return token ? <Outlet /> : null;
};

export default ProtectedRoutes;
