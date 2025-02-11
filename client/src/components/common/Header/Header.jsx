import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, Button, NavbarMenu } from "@nextui-org/react";
import logo from '@assets/images/dogops-logo.png';
import UserDropdown from './Dropdown/UserDropdown';

const navigation = [
  { name: 'Главная', path: '/' },
  { name: 'О нас', path: '/about' },
  { name: 'Каталог', path: '/catalog' },
  { name: 'Контакты', path: '/contacts' },
];
{/*Exporting logo as a component*/}
export const DogopsLogo = () => {
  return (
    <img src={logo} alt="Dogops logo" width="50"/>
  );
};

{/*Header component*/}
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); {/*State for menu*/}
  const location = useLocation(); {/*Location hook for navigation*/}

  return (
    <Navbar className="absolute">
      {/*Menu toggle button*/}
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarBrand>
        <DogopsLogo />
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4 justify-center">
        {/*Navigation items*/}
        {navigation.map((item) => (
          <NavbarItem key={item.name} isActive={location.pathname === item.path}>
            <NavLink 
              to={item.path}
              className={({ isActive }) => `${isActive ? 'bg-lime-300 text-black rounded-full px-4 py-2' : 'text-white hover:underline'}`}
            >
              {item.name}
            </NavLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <UserDropdown />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="gap-4">
        {/*Navigation items for mobile*/}
        {navigation.map((item, index) => (
          <NavbarItem key={index} isActive={location.pathname === item.path}>
            <NavLink 
              to={item.path}
              className={({ isActive }) => `text-black text-xl ${isActive ? 'bg-lime-300 text-black rounded-full px-4 py-2' : 'hover:underline'}`}
            >
              {item.name}
            </NavLink>
          </NavbarItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
