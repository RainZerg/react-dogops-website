import React, { useEffect, useState } from 'react';
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
import axiosInstance from '@/services/axiosInstance.ts'; 
import preloadImage from './helpers/preloadImage.js'; // Функция для предварительной загрузки изображения

const UserDropdown = () => {
    // Получаем состояние аутентификации и методы из хранилища Zustand
    const { token, clearToken, profilePicture, setProfilePicture } = useAuthStore();
    const navigate = useNavigate();
    // Состояние для отслеживания загрузки изображения
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    // Обработчик выхода из системы
    const handleLogout = async () => {
        try {
            // Отправляем запрос на выход
            await axios.delete('/api/users/logout', {
                withCredentials: true
            });
            // Очищаем токен в хранилище
            clearToken();
        } catch (error) {
            console.error('Ошибка выхода:', error);
        }
        // Перенаправляем на главную страницу
        navigate('/');
    };

    // Получение и предзагрузка изображения профиля
    const retrievePicture = async () => {
        try {
            // Запрос на получение URL изображения профиля
            const response = await axiosInstance.get('/api/users/profilepicture', {
                skipAuthRedirect: true, // Пропускаем автоматическое перенаправление при 401
            });

            const url = response.data.profilePicture;
            // Предзагрузка изображения перед обновлением состояния
            await preloadImage(url);
            // Обновляем URL в хранилище
            setProfilePicture(url);
        } catch (error) {
            console.error('Ошибка загрузки изображения:', error);
        }
    };

    // Эффект для загрузки данных при изменении токена
    useEffect(() => {
        let isMounted = true; // Флаг для проверки монтирования компонента

        if (token) {
            retrievePicture().then(() => {
                // Обновляем состояние только если компонент смонтирован
                if (isMounted) setIsImageLoaded(true);
            });
        }

        // Очистка эффекта: сбрасываем флаг при размонтировании
        return () => {
            isMounted = false;
        };
    }, [token]); // Зависимость от токена

    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                {token ? (
                    // Отображаем аватар для авторизованного пользователя
                    <Avatar
                        key={profilePicture} // Ключ для принудительного обновления при изменении URL
                        isBordered
                        as="button"
                        src={profilePicture}
                        name="User"
                        className="cursor-pointer"
                        showFallback={!isImageLoaded} // Управление отображением заглушки
                    />
                ) : (
                        // Кнопка входа для неавторизованных пользователей
                        <Button 
                            color="primary" 
                            variant="bordered"
                            onClick={() => navigate('/login')}
                        >
                            Войти
                        </Button>
                    )}
            </DropdownTrigger>

            {/* Выпадающее меню для авторизованного пользователя */}
            {token && (
                <DropdownMenu aria-label="Действия пользователя">
                    <DropdownItem key="profile" onClick={() => navigate('/profile')}>
                        Профиль
                    </DropdownItem>
                    <DropdownItem key="dashboard" onClick={() => navigate('/dashboard')}>
                        Заказы
                    </DropdownItem>
                    <DropdownItem key="logout" className="text-danger" color="danger" onClick={handleLogout}>
                        Выйти
                    </DropdownItem>
                </DropdownMenu>
            )}
        </Dropdown>
    );
};

export default UserDropdown;
