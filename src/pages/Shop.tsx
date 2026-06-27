import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function Shop() {
  const { products, isLoading } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const currentCategory = searchParams.get('category') || 'All';
  const sortOption = searchParams.get('sort') || 'newest';
  const searchQuery = searchParams.get('q') || '';

  const categories = ['All', 'Men', 'Women', 'Unisex', 'Summer', 'Winter', 'Best Seller'];

  // Filter products
  let filteredProducts = products;
  
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  if (currentCategory !== 'All') {
    if (currentCategory === 'Best Seller') {
      filteredProducts = filteredProducts.filter(p => p.is_best_seller);
    } else {
      filteredProducts = filteredProducts.filter(p => p.category === currentCategory || p.gender === currentCategory);
    }
  }

  // Sort products
  if (sortOption === 'price_asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'price_desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else {
    // newest - assuming already sorted by date in context, but let's be safe
    filteredProducts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  const handleCategoryChange = (category: string) => {
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('sort', e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <div className="pt-28 pb-24 bg-noxe-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif text-noxe-white mb-6"
          >
            The Collection
          </motion.h1>
          <div className="w-16 h-[1px] bg-noxe-gold mx-auto mb-8"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover our curated selection of fine fragrances. Each scent is a masterpiece, crafted to evoke emotion and leave a lasting impression.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-noxe-light-gray pb-6">
          <button 
            className="md:hidden flex items-center text-noxe-white hover:text-noxe-gold mb-4 md:mb-0"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <SlidersHorizontal size={20} className="mr-2" />
            Filters
          </button>

          {/* Desktop Categories */}
          <div className="hidden md:flex flex-wrap gap-8">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`text-sm tracking-widest uppercase transition-colors ${
                  currentCategory === category ? 'text-noxe-gold border-b border-noxe-gold pb-1' : 'text-gray-400 hover:text-noxe-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center">
            <span className="text-gray-400 text-sm uppercase tracking-widest mr-4">Sort by:</span>
            <div className="relative">
              <select 
                value={sortOption}
                onChange={handleSortChange}
                className="appearance-none bg-transparent text-noxe-white border border-noxe-light-gray py-2 pl-4 pr-10 focus:outline-none focus:border-noxe-gold cursor-pointer rounded-none text-sm"
              >
                <option value="newest" className="bg-noxe-black text-white">Newest</option>
                <option value="price_asc" className="bg-noxe-black text-white">Price: Low to High</option>
                <option value="price_desc" className="bg-noxe-black text-white">Price: High to Low</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Mobile Filter Menu */}
        {isFilterOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden mb-8 p-4 border border-noxe-light-gray"
          >
            <div className="flex flex-col space-y-4">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => {
                    handleCategoryChange(category);
                    setIsFilterOpen(false);
                  }}
                  className={`text-left text-sm tracking-widest uppercase ${
                    currentCategory === category ? 'text-noxe-gold' : 'text-gray-400'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Product Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-t-2 border-b-2 border-noxe-gold rounded-full animate-spin"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {filteredProducts.map((product, index) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-noxe-gray mb-6">
                    <img 
                      src={product.image_url} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {product.is_best_seller && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-noxe-gold text-noxe-black text-[10px] uppercase tracking-widest font-bold px-3 py-1">
                          Best Seller
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="bg-noxe-black/80 text-noxe-white px-6 py-3 uppercase tracking-widest text-xs border border-noxe-light-gray hover:border-noxe-gold transition-colors">
                        Quick View
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-gray-500 tracking-widest uppercase mb-2">{product.gender} • {product.size_ml}ML</p>
                    <h3 className="text-lg font-serif text-noxe-white mb-2">{product.name}</h3>
                    <p className="text-noxe-gold font-medium">From 30 DH</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-serif text-noxe-white mb-4">No products found</h3>
            <p className="text-gray-400 mb-8">We couldn't find any fragrances matching your current filters.</p>
            <button 
              onClick={() => handleCategoryChange('All')}
              className="border border-noxe-gold text-noxe-gold hover:bg-noxe-gold hover:text-noxe-black px-8 py-3 uppercase tracking-widest text-sm transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
