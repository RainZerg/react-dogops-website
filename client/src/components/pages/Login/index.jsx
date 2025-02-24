import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { 
    Input, 
    Button, 
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Form
} from '@nextui-org/react';
import { useAuthStore } from '@/hooks/authStore';

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const redirectTo = searchParams.get('redirectTo') || '/';
    const [submitted, setSubmitted] = useState(null);
    const [error, setError] = useState('');
    const setToken = useAuthStore((state) => state.setToken);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const data = Object.fromEntries(new FormData(e.currentTarget));
        try {
            const response = await axios.post(
                '/api/users/login',
                data,
                { withCredentials: true }
            );

            if (response.data.requestToken) {
                setToken(response.data.requestToken);
                navigate(redirectTo);
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || 'Login failed');
                setSubmitted(null);
            } else {
                setError('An unexpected error occurred');
                setSubmitted(null);
            }
        } finally {
            setSubmitted(data);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Form
                onSubmit={handleSubmit}
                className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md"
            >
                <h2 className="text-2xl font-bold text-center">Login</h2>

                <Input
                    name='email'
                    isRequired
                    color="secondary"
                    variant="bordered"
                    errorMessage="Please enter a valid email"
                    label="Email"
                    type="email"
                    defaultValue="email@email.com"
                    required
                />

                <Input
                    name='password'
                    errorMessage="Please enter a valid password"
                    label="Password"
                    type="password"
                    isRequired
                    required
                    color="secondary"
                    variant="bordered"
                />

                <Button
                    type="submit"
                    color="primary"
                    className="mt-6"
                >
                    {submitted ? 'Logging in...' : 'Login'}
                </Button>

                <div className="flex justify-center gap-1">
                    <span>Don't have an account?</span>
                    <Link 
                        to="/register" 
                        className="text-primary-500 hover:underline hover:text-primary-600"
                    >
                        Register
                    </Link>
                </div>

                <Modal 
                    isOpen={!!error}
                    onClose={() => setError('')}
                    placement="top-center"
                >
                    <ModalContent>
                        <ModalHeader>
                            <h3 className="text-xl font-semibold text-red-600">Error</h3>
                        </ModalHeader>
                        <ModalBody>
                            <p className="text-red-500">{error}</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button 
                                color="error"
                                variant="flat"
                                onPress={() => { 
                                    setError('');
                                    setSubmitted(null);
                                }
                                }
                            >
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Form>
        </div>
    );
}

export default LoginPage;
