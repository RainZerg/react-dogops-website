import React, {useEffect} from 'react';
import { 
    Dropdown, 
    DropdownTrigger, 
    DropdownMenu, 
    DropdownItem, 
    Button
} from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { Avatar } from "@nextui-org/react";
import { useAuthStore } from '@/hooks/authStore';
import axios from 'axios';

const UserDropdown = () => {
    // Get auth state and profile picture from Zustand store
    const { token, clearToken, profilePicture, setProfilePicture } = useAuthStore();
    const navigate = useNavigate();

    // Handle logout functionality
    const handleLogout = async () => {
        try {
            await axios.delete('/api/users/logout', {
                withCredentials: true
            });

            clearToken();

        } catch (error) {
            console.error('Logout failed:', error);
        }
        navigate('/home');
    };

    useEffect(() => {
        const retrievePicture = async () => {
            try {
                const response =  await axios.get('/api/users/profilepicture', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setProfilePicture(response.data.profilePicture);
            } catch (error) {
                console.error('Picture retrieval failed:', error);
            }
        };

        if (token) {
            retrievePicture();
        }
    }, [token, setProfilePicture]);

    const preloadImage = (url) => {
        new Image().src = url;
    };

    useEffect(() => {
        profilePicture && preloadImage(profilePicture);
    }, [profilePicture])

    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                {token ? (
                    // Show avatar if logged in (token exists)
                    <Avatar
                        isBordered
                        as="button"
                        src={profilePicture || '/default-avatar.jpg'} // Replace with actual avatar URL if available
                        name="User" // Replace with actual username if available
                        className="cursor-pointer"
                    />
                ) : (
                        // Show login button if not authenticated
                        <Button 
                            color="primary" 
                            variant="bordered"
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </Button>
                    )}
            </DropdownTrigger>

            {/* Show menu only when authenticated */}
            {token && (
                <DropdownMenu aria-label="User actions">
                    <DropdownItem 
                        key="profile" 
                        onClick={() => navigate('/profile')}
                    >
                        Profile
                    </DropdownItem>
                    <DropdownItem 
                        key="dashboard" 
                        onClick={() => navigate('/dashboard')}
                    >
                        Dashboard
                    </DropdownItem>
                    <DropdownItem 
                        key="logout" 
                        color="danger" 
                        onClick={handleLogout}
                    >
                        Logout
                    </DropdownItem>
                </DropdownMenu>
            )}
        </Dropdown>
    );
};

export default UserDropdown;
