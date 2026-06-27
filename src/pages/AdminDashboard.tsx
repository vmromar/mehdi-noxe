import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Package, Users, ShoppingBag, Settings, LogOut, Plus, Edit2, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export default function AdminDashboard() {
  const { products } = useShop();
  const [activeTab, setActiveTab] = useState('products');

  // Simple authentication state (mocked)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials. (Hint: password is "admin")');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-noxe-black flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-noxe-gray p-8 w-full max-w-md border border-noxe-light-gray"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif text-noxe-white tracking-widest mb-2">NOXE.</h1>
            <p className="text-gray-400 text-sm uppercase tracking-widest">Admin Portal</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input 
                type="password" 
                placeholder="Enter admin password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-noxe-light-gray focus:border-noxe-gold py-3 text-noxe-white outline-none transition-colors text-center tracking-widest"
              />
            </div>
            <button type="submit" className="w-full bg-noxe-gold text-noxe-black hover:bg-white transition-colors py-3 uppercase tracking-widest text-sm font-medium">
              Access Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-noxe-black flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-noxe-gray border-r border-noxe-light-gray flex flex-col">
        <div className="p-6 border-b border-noxe-light-gray">
          <Link to="/" className="text-2xl font-serif tracking-widest text-noxe-white block text-center">
            NOXE<span className="text-noxe-gold">.</span>
          </Link>
        </div>
        <nav className="flex-1 py-6">
          <ul className="space-y-2 px-4">
            <li>
              <button 
                onClick={() => setActiveTab('products')}
                className={`w-full flex items-center px-4 py-3 text-sm tracking-widest uppercase transition-colors ${activeTab === 'products' ? 'bg-noxe-light-gray text-noxe-gold' : 'text-gray-400 hover:text-noxe-white hover:bg-noxe-light-gray/50'}`}
              >
                <Package size={18} className="mr-3" /> Products
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center px-4 py-3 text-sm tracking-widest uppercase transition-colors ${activeTab === 'orders' ? 'bg-noxe-light-gray text-noxe-gold' : 'text-gray-400 hover:text-noxe-white hover:bg-noxe-light-gray/50'}`}
              >
                <ShoppingBag size={18} className="mr-3" /> Orders
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('customers')}
                className={`w-full flex items-center px-4 py-3 text-sm tracking-widest uppercase transition-colors ${activeTab === 'customers' ? 'bg-noxe-light-gray text-noxe-gold' : 'text-gray-400 hover:text-noxe-white hover:bg-noxe-light-gray/50'}`}
              >
                <Users size={18} className="mr-3" /> Customers
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center px-4 py-3 text-sm tracking-widest uppercase transition-colors ${activeTab === 'settings' ? 'bg-noxe-light-gray text-noxe-gold' : 'text-gray-400 hover:text-noxe-white hover:bg-noxe-light-gray/50'}`}
              >
                <Settings size={18} className="mr-3" /> Settings
              </button>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-noxe-light-gray">
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center px-4 py-3 text-sm tracking-widest uppercase text-gray-400 hover:text-red-400 transition-colors"
          >
            <LogOut size={18} className="mr-3" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        
        {activeTab === 'products' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-serif text-noxe-white">Inventory Management</h2>
              <button className="bg-noxe-gold text-noxe-black px-4 py-2 flex items-center text-sm uppercase tracking-widest font-medium hover:bg-white transition-colors">
                <Plus size={16} className="mr-2" /> Add Product
              </button>
            </div>

            <div className="bg-noxe-gray border border-noxe-light-gray overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-400">
                  <thead className="text-xs uppercase tracking-widest text-gray-500 bg-noxe-black/50 border-b border-noxe-light-gray">
                    <tr>
                      <th className="px-6 py-4">Product</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4">Stock</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-noxe-light-gray/50 hover:bg-noxe-light-gray/20 transition-colors">
                        <td className="px-6 py-4 flex items-center">
                          <img src={product.image_url} alt={product.name} className="w-10 h-10 object-cover mr-4" />
                          <span className="font-serif text-noxe-white text-base">{product.name}</span>
                        </td>
                        <td className="px-6 py-4">{product.category}</td>
                        <td className="px-6 py-4 text-noxe-gold">{product.price} DH</td>
                        <td className="px-6 py-4">{product.stock}</td>
                        <td className="px-6 py-4">
                          {product.is_best_seller && (
                            <span className="bg-noxe-gold/20 text-noxe-gold text-[10px] uppercase tracking-widest px-2 py-1">Best Seller</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-gray-400 hover:text-noxe-white mr-3"><Edit2 size={16} /></button>
                          <button className="text-gray-400 hover:text-red-400"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'orders' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-serif text-noxe-white mb-10">Recent Orders</h2>
            <div className="bg-noxe-gray border border-noxe-light-gray p-10 text-center">
              <p className="text-gray-400">No recent orders to display.</p>
            </div>
          </motion.div>
        )}

        {activeTab === 'customers' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-serif text-noxe-white mb-10">Customer Directory</h2>
            <div className="bg-noxe-gray border border-noxe-light-gray p-10 text-center">
              <p className="text-gray-400">No customer data available.</p>
            </div>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-serif text-noxe-white mb-10">Store Settings</h2>
            <div className="bg-noxe-gray border border-noxe-light-gray p-6 max-w-2xl">
              <form className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Supabase Project URL</label>
                  <input type="text" placeholder="https://..." className="w-full bg-transparent border-b border-noxe-light-gray focus:border-noxe-gold py-2 text-noxe-white outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Supabase Anon Key</label>
                  <input type="password" placeholder="..." className="w-full bg-transparent border-b border-noxe-light-gray focus:border-noxe-gold py-2 text-noxe-white outline-none transition-colors" />
                </div>
                <button type="button" className="bg-noxe-gold text-noxe-black px-6 py-2 uppercase tracking-widest text-sm font-medium hover:bg-white transition-colors">
                  Save Configuration
                </button>
              </form>
            </div>
          </motion.div>
        )}

      </main>
    </div>
  );
}
