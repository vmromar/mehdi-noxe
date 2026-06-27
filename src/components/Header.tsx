import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, setIsCartOpen } = useShop();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
      setSearchQuery('');
    }
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled || !isHome ? 'bg-noxe-black/90 backdrop-blur-md border-b border-noxe-light-gray' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-noxe-white hover:text-noxe-gold transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-1 flex justify-center md:justify-start">
            <Link to="/" className="text-3xl font-serif tracking-widest text-noxe-white">
              NOXE<span className="text-noxe-gold">.</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium tracking-wide text-noxe-white hover:text-noxe-gold transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex-1 flex items-center justify-end space-x-6">
            <button 
              className="text-noxe-white hover:text-noxe-gold transition-colors hidden sm:block"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search size={20} />
            </button>
            <Link to="/admin" className="text-noxe-white hover:text-noxe-gold transition-colors hidden sm:block">
              <User size={20} />
            </Link>
            <button 
              className="text-noxe-white hover:text-noxe-gold transition-colors relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-noxe-gold text-noxe-black text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-noxe-black border-b border-noxe-light-gray overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-lg font-medium tracking-wide text-noxe-white hover:text-noxe-gold transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <form onSubmit={handleSearchSubmit} className="pt-4 pb-2">
                <div className="flex border-b border-noxe-light-gray focus-within:border-noxe-gold transition-colors">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full bg-transparent py-2 text-noxe-white outline-none placeholder-gray-500"
                  />
                  <button type="submit" className="text-gray-400 hover:text-noxe-gold p-2">
                    <Search size={18} />
                  </button>
                </div>
              </form>
              <div className="pt-4 border-t border-noxe-light-gray flex space-x-6">
                <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-noxe-white hover:text-noxe-gold transition-colors">
                  <User size={20} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Search Panel */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-noxe-black border-b border-noxe-light-gray shadow-lg"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <form onSubmit={handleSearchSubmit} className="flex items-center max-w-2xl mx-auto border-b border-noxe-light-gray focus-within:border-noxe-gold transition-colors">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for fragrances, collections..."
                  className="w-full bg-transparent py-4 text-noxe-white text-lg outline-none placeholder-gray-500"
                  autoFocus
                />
                <button type="submit" className="text-gray-400 hover:text-noxe-gold p-4">
                  <Search size={24} />
                </button>
                <button type="button" onClick={() => setIsSearchOpen(false)} className="text-gray-400 hover:text-noxe-gold p-4">
                  <X size={24} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
