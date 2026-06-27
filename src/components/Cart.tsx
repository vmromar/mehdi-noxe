import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useShop();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Cart Panel */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-noxe-black border-l border-noxe-light-gray z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-noxe-light-gray">
              <h2 className="text-xl font-serif text-noxe-white flex items-center">
                <ShoppingBag className="mr-3" size={20} />
                Your Cart
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-gray-400 hover:text-noxe-gold transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={48} className="text-noxe-light-gray mb-4" />
                  <p className="text-gray-400 mb-6">Your cart is currently empty.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="border border-noxe-gold text-noxe-gold hover:bg-noxe-gold hover:text-noxe-black px-8 py-3 uppercase tracking-widest text-sm transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-24 bg-noxe-gray overflow-hidden">
                        <img 
                          src={item.image_url} 
                          alt={item.name} 
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-serif text-noxe-white text-sm">{item.name}</h3>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-500 hover:text-red-400 transition-colors"
                            >
                              <X size={16} />
                            </button>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">{item.size_ml}ml</p>
                        </div>
                        <div className="flex justify-between items-end">
                          <div className="flex items-center border border-noxe-light-gray">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 text-gray-400 hover:text-noxe-white transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-gray-400 hover:text-noxe-white transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="text-noxe-gold font-medium">{item.price * item.quantity} DH</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-noxe-light-gray p-6 bg-noxe-gray/50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-300">Subtotal</span>
                  <span className="text-xl font-serif text-noxe-white">{cartTotal} DH</span>
                </div>
                <p className="text-xs text-gray-500 mb-6">Shipping calculated at checkout.</p>
                <Link 
                  to="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full block text-center bg-noxe-gold text-noxe-black font-medium hover:bg-white transition-colors py-4 uppercase tracking-widest text-sm"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
