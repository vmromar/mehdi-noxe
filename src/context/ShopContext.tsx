import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Product, CartItem } from '../types';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  isLoading: boolean;
  clearCart: () => void;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Midnight Oud',
    price: 280,
    description: 'A deep, mysterious blend of agarwood, black rose, and smoked leather. Perfect for the evening.',
    image_url: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&q=80',
    gallery_urls: [],
    category: 'Winter',
    top_notes: 'Saffron, Black Pepper',
    heart_notes: 'Black Rose, Patchouli',
    base_notes: 'Agarwood (Oud), Smoked Leather',
    longevity: '12+ Hours',
    projection: 'Strong',
    occasion: 'Evening, Formal',
    gender: 'Unisex',
    size_ml: 100,
    stock: 50,
    is_best_seller: true,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Velvet Bergamot',
    price: 210,
    description: 'Crisp Italian bergamot meets soft white florals and warm cedarwood.',
    image_url: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80',
    gallery_urls: [],
    category: 'Summer',
    top_notes: 'Bergamot, Lemon Zest',
    heart_notes: 'Jasmine, Lily of the Valley',
    base_notes: 'Cedarwood, White Musk',
    longevity: '6-8 Hours',
    projection: 'Moderate',
    occasion: 'Daytime, Casual',
    gender: 'Women',
    size_ml: 50,
    stock: 30,
    is_best_seller: false,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Santal Solstice',
    price: 320,
    description: 'Creamy sandalwood and spicy cardamom create a comforting yet exotic aura.',
    image_url: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80',
    gallery_urls: [],
    category: 'Unisex',
    top_notes: 'Cardamom, Violet',
    heart_notes: 'Iris, Papyrus',
    base_notes: 'Sandalwood, Leather',
    longevity: '10+ Hours',
    projection: 'Strong',
    occasion: 'Anytime',
    gender: 'Unisex',
    size_ml: 100,
    stock: 25,
    is_best_seller: true,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Noir Absolu',
    price: 250,
    description: 'An intoxicating evening fragrance featuring dark vanilla, tonka bean, and a hint of tobacco.',
    image_url: 'https://images.unsplash.com/photo-1592914610354-fd354ea45e48?w=800&q=80',
    gallery_urls: [],
    category: 'Winter',
    top_notes: 'Pink Pepper, Bergamot',
    heart_notes: 'Tobacco Leaf, Cacao',
    base_notes: 'Madagascar Vanilla, Tonka Bean',
    longevity: '8-10 Hours',
    projection: 'Moderate to Strong',
    occasion: 'Evening, Date Night',
    gender: 'Men',
    size_ml: 100,
    stock: 15,
    is_best_seller: false,
    created_at: new Date().toISOString()
  }
];

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    
    // Load cart from local storage
    const savedCart = localStorage.getItem('noxe_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('noxe_cart', JSON.stringify(cart));
  }, [cart]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      // Check if supabase is configured
      if (!supabase) {
        console.log('Supabase not configured, using mock data');
        setProducts(mockProducts);
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        setProducts(mockProducts); // Fallback to mock data on error
      } else if (data && data.length > 0) {
        setProducts(data as Product[]);
      } else {
         setProducts(mockProducts); // Fallback to mock data if empty
      }
    } catch (error) {
      console.error('Exception fetching products:', error);
      setProducts(mockProducts);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart => prevCart.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <ShopContext.Provider value={{
      products,
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      isCartOpen,
      setIsCartOpen,
      isLoading
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
