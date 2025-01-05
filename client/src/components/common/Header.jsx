import { useState, useEffect } from 'react';

const initialNavigation = [
  { name: 'Главная', href: '#', current: true },
  { name: 'О нас', href: '/about', current: false },
  { name: 'Каталог', href: '/catalog', current: false },
  { name: 'Контакты', href: '/contacts', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
export default function Header({onData}) {
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
    <header className="flex justify-between items-center p-8">
      <div className="ml-8">
        <img src='../../src/assets/dogops-logo.png' alt="Dogops logo" width="50"/>
      </div>
      <nav className="flex space-x-4 mr-8">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={classNames(
              item.current ? 'hover:underline px-4 py-2 rounded-full bg-lime-300 text-black' : 'hover:underline px-4 py-2 rounded-full',
            )}
            aria-current={item.current ? 'page' : undefined}
            onClick={(e) => {
              e.preventDefault();
              handleClick(item);
            }}
          >
            {item.name}
          </a>
        ))}
      </nav>
    </header>
  );
}

