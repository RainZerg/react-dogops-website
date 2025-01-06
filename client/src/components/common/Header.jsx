import { useState, useEffect } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

const initialNavigation = [
  { name: 'Главная', href: '#', current: true },
  { name: 'О нас', href: '/about', current: false },
  { name: 'Каталог', href: '/catalog', current: false },
  { name: 'Контакты', href: '/contacts', current: false },
];

export const DogopsLogo = () => {
  return (
    <img src='../../src/assets/dogops-logo.png' alt="Dogops logo" width="50"/>
  );
};

export default function Header({ onData }) {
  const [navigation, setNavigation] = useState(initialNavigation);

  useEffect(() => {
    const currentPage = localStorage.getItem('currentPage');
    if (currentPage) {
      const updatedNavigation = navigation.map(item => ({
        ...item,
        current: item.href === currentPage
      }));
      setNavigation(updatedNavigation);
      onData(currentPage);
    } else {
      const defaultPage = '#';
      const updatedNavigation = navigation.map(item => ({
        ...item,
        current: item.href === defaultPage
      }));
      setNavigation(updatedNavigation);
      onData(defaultPage);
    }
  }, []);

  const handleClick = (clickedItem) => {
    const updatedNavigation = navigation.map(item => ({
      ...item,
      current: item.href === clickedItem.href
    }));
    setNavigation(updatedNavigation);
    onData(clickedItem.href);
  };

  return (
    <Navbar className="bg-black">
      <NavbarBrand>
        <DogopsLogo />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navigation.map((item) => (
          <NavbarItem key={item.name} isActive={item.current}>
            <Link 
              className={`text-white ${item.current ? 'bg-lime-300 text-black rounded-full px-4 py-2' : 'hover:underline'}`}
              href={item.href} 
              onClick={(e) => {
                e.preventDefault();
                handleClick(item);
              }}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} className="bg-lime-300 text-black rounded-full px-4 py-2" href="#" variant="flat">
            Войти
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
