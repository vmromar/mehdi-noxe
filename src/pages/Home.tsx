import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function Home() {
  const { products } = useShop();
  
  const featuredProducts = products.slice(0, 3);
  const bestSellers = products.filter(p => p.is_best_seller).slice(0, 4);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1600&q=80" 
            alt="Luxury Perfume" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-noxe-white mb-6 tracking-wider"
          >
            NOXE
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 mb-10 tracking-widest uppercase font-light"
          >
            Luxury in Every Drop
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <Link 
              to="/shop" 
              className="inline-block border-2 border-noxe-gold text-noxe-gold hover:bg-noxe-gold hover:text-noxe-black px-10 py-4 uppercase tracking-widest text-sm transition-all duration-300"
            >
              Shop Collection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 bg-noxe-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-noxe-white mb-4">Featured Collection</h2>
            <div className="w-16 h-[1px] bg-noxe-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredProducts.map((product, index) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group cursor-pointer"
              >
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-noxe-gray mb-6">
                    <img 
                      src={product.image_url} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="bg-noxe-black/80 text-noxe-white px-6 py-3 uppercase tracking-widest text-xs">
                        View Product
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-noxe-gold tracking-widest uppercase mb-2">{product.category}</p>
                    <h3 className="text-xl font-serif text-noxe-white mb-2">{product.name}</h3>
                    <p className="text-gray-400">From 30 DH</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-16">
             <Link 
              to="/shop" 
              className="inline-flex items-center text-noxe-white hover:text-noxe-gold transition-colors uppercase tracking-widest text-sm group"
            >
              View All Products
              <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why NOXE Section */}
      <section className="py-24 bg-noxe-gray relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-serif text-noxe-white mb-8 leading-tight">
                The Art of <br/>Fine Fragrance
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                At NOXE, we believe that a fragrance is more than a scent—it is an invisible garment, a memory waiting to be created. We source the most exquisite, rare ingredients globally to compose symphonies that linger on the skin and in the mind.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
                <div>
                  <div className="w-10 h-[1px] bg-noxe-gold mb-4"></div>
                  <h4 className="text-noxe-white font-serif text-xl mb-2">Premium Oils</h4>
                  <p className="text-gray-500 text-sm">Highly concentrated pure perfume extracts.</p>
                </div>
                <div>
                  <div className="w-10 h-[1px] bg-noxe-gold mb-4"></div>
                  <h4 className="text-noxe-white font-serif text-xl mb-2">Long-lasting</h4>
                  <p className="text-gray-500 text-sm">Formulated for extreme longevity and sillage.</p>
                </div>
                <div>
                  <div className="w-10 h-[1px] bg-noxe-gold mb-4"></div>
                  <h4 className="text-noxe-white font-serif text-xl mb-2">Luxury Packaging</h4>
                  <p className="text-gray-500 text-sm">Presented in heavy glass bottles with magnetic caps.</p>
                </div>
                <div>
                  <div className="w-10 h-[1px] bg-noxe-gold mb-4"></div>
                  <h4 className="text-noxe-white font-serif text-xl mb-2">Worldwide Shipping</h4>
                  <p className="text-gray-500 text-sm">Delivering luxury to your doorstep globally.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] lg:aspect-square"
            >
              <img 
                src="https://images.unsplash.com/photo-1622618991746-fe6004db3a47?w=1000&q=80" 
                alt="NOXE Ingredients" 
                className="w-full h-full object-cover"
              />
              <div className="absolute -inset-4 border border-noxe-light-gray -z-10 hidden lg:block"></div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
