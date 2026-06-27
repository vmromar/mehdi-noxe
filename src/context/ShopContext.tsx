import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Product, CartItem } from "../types";

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
    id: "w1",
    name: "Libre",
    brand: "Yves Saint Laurent",
    price: 30,
    description: "A grand floral Eau de Parfum, with an unequivocal YSL twist. The burning sensuality of the orange blossom flowers from Morocco, twisted with the aromatic boldness of lavender from France.",
    image_url: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80",
    gallery_urls: [],
    category: "Women",
    top_notes: "Lavender, Mandarin Orange, Black Currant",
    heart_notes: "Lavender, Orange Blossom, Jasmine",
    base_notes: "Madagascar Vanilla, Musk, Cedar",
    longevity: "8-10 Hours",
    projection: "Strong",
    occasion: "Anytime",
    gender: "Women",
    size_ml: 20,
    stock: 100,
    is_best_seller: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "w2",
    name: "Donna Born in Roma",
    brand: "Valentino",
    price: 30,
    description: "A modern haute couture floriental. A couture elegance made of three qualities of jasmine which bring a luxurious femininity when blended with vanilla bourbon.",
    image_url: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=800&q=80",
    gallery_urls: [],
    category: "Women",
    top_notes: "Black Currant, Pink Pepper, Bergamot",
    heart_notes: "Jasmine, Jasmine Sambac, Jasmine Tea",
    base_notes: "Bourbon Vanilla, Cashmeran, Guaiac Wood",
    longevity: "8-10 Hours",
    projection: "Moderate",
    occasion: "Anytime",
    gender: "Women",
    size_ml: 20,
    stock: 50,
    is_best_seller: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "w3",
    name: "Le Beau Paradise Garden",
    brand: "Jean Paul Gaultier",
    price: 30,
    description: "A woody green aquatic fragrance that captures the irresistible temptation of a tropical paradise. A fresh and addictive blend.",
    image_url: "https://images.unsplash.com/photo-1615397323861-9c3f0b2f8a3d?w=800&q=80",
    gallery_urls: [],
    category: "Women",
    top_notes: "Coconut Water, Mint",
    heart_notes: "Green Notes, Fig",
    base_notes: "Sandalwood, Tonka Bean",
    longevity: "8-10 Hours",
    projection: "Strong",
    occasion: "Anytime",
    gender: "Women",
    size_ml: 20,
    stock: 40,
    is_best_seller: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "w4",
    name: "Coco Mademoiselle",
    brand: "Chanel",
    price: 30,
    description: "Irresistibly sexy, irrepressibly spirited. A sparkling, bold ambery fragrance that recalls a daring young Coco Chanel.",
    image_url: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80",
    gallery_urls: [],
    category: "Women",
    top_notes: "Orange, Mandarin Orange, Bergamot",
    heart_notes: "Turkish Rose, Jasmine, Mimosa",
    base_notes: "Patchouli, White Musk, Vanilla",
    longevity: "10+ Hours",
    projection: "Strong",
    occasion: "Anytime",
    gender: "Women",
    size_ml: 20,
    stock: 80,
    is_best_seller: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "w5",
    name: "Her",
    brand: "Burberry",
    price: 30,
    description: "An embodiment of the Londoner attitude - adventurous, spirited, and bold. A vibrant fruity gourmand capturing the spirit of London.",
    image_url: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&q=80",
    gallery_urls: [],
    category: "Women",
    top_notes: "Strawberry, Raspberry, Blackberry",
    heart_notes: "Violet, Jasmine",
    base_notes: "Musk, Vanilla, Cashmeran",
    longevity: "8-10 Hours",
    projection: "Moderate",
    occasion: "Daytime",
    gender: "Women",
    size_ml: 20,
    stock: 60,
    is_best_seller: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "w6",
    name: "Marshmallow",
    brand: "Kayali",
    price: 30,
    description: "A rich, deep, and deliciously decadent juice that captivates the senses with creamy jasmine, rich Madagascan vanilla orchid, and sweet Brazilian tonka.",
    image_url: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=800&q=80",
    gallery_urls: [],
    category: "Women",
    top_notes: "Vanilla Orchid, Jasmine",
    heart_notes: "Brown Sugar, Tonka Bean",
    base_notes: "Amber, Musk, Patchouli",
    longevity: "6-8 Hours",
    projection: "Moderate",
    occasion: "Anytime",
    gender: "Women",
    size_ml: 20,
    stock: 30,
    is_best_seller: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "w7",
    name: "Juicy Apple",
    brand: "Kayali",
    price: 30,
    description: "Playful, vibrant, and bursting with attitude, this delicious scent is a tempting, mouth-watering fusion of crisp and juicy red apples.",
    image_url: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80",
    gallery_urls: [],
    category: "Women",
    top_notes: "Red Apple, Black Currant, Pink Grapefruit",
    heart_notes: "Wild Berries, Raspberry Bloom, Jasmine",
    base_notes: "Vanilla, Sugar, Musk",
    longevity: "6-8 Hours",
    projection: "Moderate",
    occasion: "Daytime",
    gender: "Women",
    size_ml: 20,
    stock: 45,
    is_best_seller: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "w8",
    name: "Kirke",
    brand: "Tiziana Terenzi",
    price: 30,
    description: "A magical and sensual perfume that is like the goddess Circe. Characterized by a lush bouquet of sweet fruit, passion fruit, peaches, and pears.",
    image_url: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80",
    gallery_urls: [],
    category: "Women",
    top_notes: "Passionfruit, Peach, Raspberry",
    heart_notes: "Lily-of-the-Valley",
    base_notes: "Musk, Vanilla, Sandalwood",
    longevity: "12+ Hours",
    projection: "Strong",
    occasion: "Anytime",
    gender: "Women",
    size_ml: 20,
    stock: 55,
    is_best_seller: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "m1",
    name: "L'Homme Blanc",
    brand: "Lacoste",
    price: 30,
    description: "A timeless classic. A fresh and elegant fragrance that captures the spirit of the iconic white polo shirt.",
    image_url: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80",
    gallery_urls: [],
    category: "Men",
    top_notes: "Grapefruit, Rosemary, Cardamom",
    heart_notes: "Ylang-Ylang, Tuberose",
    base_notes: "Suede, Virginia Cedar, Leather",
    longevity: "6-8 Hours",
    projection: "Moderate",
    occasion: "Daytime, Casual",
    gender: "Men",
    size_ml: 20,
    stock: 70,
    is_best_seller: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "m2",
    name: "Imagination",
    brand: "Louis Vuitton",
    price: 30,
    description: "An exceptional fragrance crafted by Jacques Cavallier Belletrud. A burst of citrus and black tea from China creates a luminous and vibrant trail.",
    image_url: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=800&q=80",
    gallery_urls: [],
    category: "Men",
    top_notes: "Citron, Calabrian Bergamot, Sicilian Orange",
    heart_notes: "Tunisian Neroli, Nigerian Ginger, Ceylon Cinnamon",
    base_notes: "Chinese Black Tea, Ambroxan, Guaiac Wood",
    longevity: "8-10 Hours",
    projection: "Strong",
    occasion: "Daytime, Summer",
    gender: "Men",
    size_ml: 20,
    stock: 65,
    is_best_seller: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "m3",
    name: "Bleu de Chanel",
    brand: "Chanel",
    price: 30,
    description: "A woody, aromatic fragrance for the man who defies convention. A provocative blend of citrus and woods that liberates the senses.",
    image_url: "https://images.unsplash.com/photo-1615397323861-9c3f0b2f8a3d?w=800&q=80",
    gallery_urls: [],
    category: "Men",
    top_notes: "Grapefruit, Lemon, Mint",
    heart_notes: "Ginger, Nutmeg, Jasmine",
    base_notes: "Incense, Vetiver, Cedar",
    longevity: "8-10 Hours",
    projection: "Moderate to Strong",
    occasion: "Anytime",
    gender: "Men",
    size_ml: 20,
    stock: 90,
    is_best_seller: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "m4",
    name: "Stronger With You",
    brand: "Emporio Armani",
    price: 30,
    description: "A warm, sensual eau de toilette for men, featuring spicy accords in the top notes of - a mix of cardamom, pink peppercorn, and violet leaves.",
    image_url: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80",
    gallery_urls: [],
    category: "Men",
    top_notes: "Cardamom, Pink Pepper, Violet Leaf",
    heart_notes: "Sage, Melon, Pineapple",
    base_notes: "Vanilla, Chestnut, Cedar",
    longevity: "10+ Hours",
    projection: "Strong",
    occasion: "Evening, Winter",
    gender: "Men",
    size_ml: 20,
    stock: 85,
    is_best_seller: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "m5",
    name: "Ultra Male",
    brand: "Jean Paul Gaultier",
    price: 30,
    description: "The rogue sailor who will have you lost at sea! This men's eau de toilette is an arm wrestle between power and greed.",
    image_url: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&q=80",
    gallery_urls: [],
    category: "Men",
    top_notes: "Pear, Lavender, Mint",
    heart_notes: "Cinnamon, Clary Sage, Caraway",
    base_notes: "Black Vanilla Husk, Amber, Patchouli",
    longevity: "12+ Hours",
    projection: "Very Strong",
    occasion: "Evening, Party",
    gender: "Men",
    size_ml: 20,
    stock: 50,
    is_best_seller: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "m6",
    name: "Eros",
    brand: "Versace",
    price: 30,
    description: "Love, passion, beauty, and desire. Eros is a fragrance for a strong, passionate man, who is master of himself.",
    image_url: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=800&q=80",
    gallery_urls: [],
    category: "Men",
    top_notes: "Mint, Green Apple, Lemon",
    heart_notes: "Tonka Bean, Ambroxan, Geranium",
    base_notes: "Madagascar Vanilla, Virginian Cedar, Vetiver",
    longevity: "10+ Hours",
    projection: "Strong",
    occasion: "Evening, Party",
    gender: "Men",
    size_ml: 20,
    stock: 75,
    is_best_seller: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "m7",
    name: "Aventus",
    brand: "Creed",
    price: 30,
    description: "Celebrating strength, power, vision, and success. Featuring superb ingredients, Aventus is a sophisticated blend for individuals who savor a life well-lived.",
    image_url: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80",
    gallery_urls: [],
    category: "Men",
    top_notes: "Pineapple, Bergamot, Black Currant",
    heart_notes: "Birch, Patchouli, Moroccan Jasmine",
    base_notes: "Musk, oak moss, Ambergris",
    longevity: "8-10 Hours",
    projection: "Strong",
    occasion: "Anytime",
    gender: "Men",
    size_ml: 20,
    stock: 40,
    is_best_seller: true,
    created_at: new Date().toISOString(),
  }
];

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();

    // Load cart from local storage
    const savedCart = localStorage.getItem("noxe_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("noxe_cart", JSON.stringify(cart));
  }, [cart]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      // Check if supabase is configured
      if (!supabase) {
        console.log("Supabase not configured, using mock data");
        setProducts(mockProducts);
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching products:", error);
        setProducts(mockProducts); // Fallback to mock data on error
      } else if (data && data.length > 0) {
        setProducts(data as Product[]);
      } else {
        setProducts(mockProducts); // Fallback to mock data if empty
      }
    } catch (error) {
      console.error("Exception fetching products:", error);
      setProducts(mockProducts);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        isLoading,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
