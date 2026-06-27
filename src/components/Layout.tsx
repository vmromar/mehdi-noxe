import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Cart from './Cart';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Cart />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
