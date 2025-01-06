import './assets/styles/App.css'

import Catalog from './components/pages/Catalog.jsx'
import Footer from './components/common/Footer.jsx'
import Header from './components/common/Header.jsx'
import Home from './components/pages/Home.jsx'
import About from './components/pages/About.jsx'
import Contacts from './components/pages/Contacts.jsx'
import { useState } from 'react'
import {NextUIProvider} from "@nextui-org/react"

function App() {
  const [currentPage, setCurrentPage] = useState('');

  const handleCallback = (childData) => {
    setCurrentPage(childData);
    localStorage.setItem('currentPage', childData);
  };

  return (
    <NextUIProvider>
    <div className='bg-black text-white flex flex-col min-h-screen'> 
        <Header onData={handleCallback} />
        <main className='flex justify-center grow bg-stone-100 text-black p-16 overflow-auto'>
          {currentPage === '#' && <Home />}
          {currentPage === '/about' && <About />}
          {currentPage === '/catalog' && <Catalog />}
          {currentPage === '/contacts' && <Contacts />}
        </main>
        <Footer />
    </div>
    </NextUIProvider>
  )
}

export default App
