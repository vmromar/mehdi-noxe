import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-noxe-black border-t border-noxe-light-gray pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-3xl font-serif tracking-widest text-noxe-white mb-6 block">
              NOXE<span className="text-noxe-gold">.</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Luxury in every drop. Crafting memories through the power of fine fragrance, using only the most exquisite ingredients from around the world.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/noxe.ma" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-noxe-gold transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-noxe-gold transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-noxe-gold transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-noxe-white font-serif text-lg mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><Link to="/shop" className="text-gray-400 hover:text-noxe-gold text-sm transition-colors">Shop All</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-noxe-gold text-sm transition-colors">Our Story</Link></li>
              <li><Link to="/shop?category=Best%20Seller" className="text-gray-400 hover:text-noxe-gold text-sm transition-colors">Best Sellers</Link></li>
              <li><Link to="/shop?category=Newest" className="text-gray-400 hover:text-noxe-gold text-sm transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-noxe-white font-serif text-lg mb-6">Support</h4>
            <ul className="space-y-4">
              <li><Link to="/contact" className="text-gray-400 hover:text-noxe-gold text-sm transition-colors">Contact Us</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-noxe-gold text-sm transition-colors">Shipping & Returns</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-noxe-gold text-sm transition-colors">FAQ</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-noxe-gold text-sm transition-colors">Track Order</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-noxe-white font-serif text-lg mb-6">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="flex border-b border-gray-600 focus-within:border-noxe-gold transition-colors">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent border-none w-full py-2 text-sm text-noxe-white focus:outline-none focus:ring-0"
              />
              <button type="submit" className="text-gray-400 hover:text-noxe-gold p-2 transition-colors">
                <Mail size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-noxe-light-gray pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} NOXE. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="#" className="text-gray-500 hover:text-noxe-gold text-xs transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-gray-500 hover:text-noxe-gold text-xs transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
