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
    description: "A grand floral Extrait de Parfum, with an unequivocal YSL twist. The burning sensuality of the orange blossom flowers from Morocco, twisted with the aromatic boldness of lavender fro[...]",
    image_url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhJf8BePXfHGMucAo-JNdhum8RpYReGIhyphenhyphenMX9TE2KmJY6w4Mq6ayTZdhIihnTPR1IlXK0EjijE4zZAT9acRE3Fn5SmAnJ71erpQ_fKgqJmEkQEDB[...],
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
    image_url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhkkvy6CWcHeqSG6_TC2_502Qh8yPTijLiTyUVUp5Y8mOeIatgS11kb51sT8gLQ1eJjU86_hriQWIV6ShrOkMlr3Bxh8foBzqY1De_sf4dskrNvKZCs2A94bVj[...],
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
    name: "Coco Mademoiselle",
    brand: "Chanel",
    price: 30,
    description: "Irresistibly sexy, irrepressibly spirited. A sparkling, bold ambery fragrance that recalls a daring young Coco Chanel.",
    image_url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiPPg3j6G8UUR-KCSmSnBW0ZDJa1PVI83Jl65ohLgI1ay9TdjQoI7Yjp-iksg9jPJo9XSlqVSg-IRimihvDA2cInNb69avetg0Ln4asSDkJd7XHUbUraIkRPjq[...],
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
    id: "w4",
    name: "Her",
    brand: "Burberry",
    price: 30,
    description: "An embodiment of the Londoner attitude - adventurous, spirited, and bold. A vibrant fruity gourmand capturing the spirit of London.",
    image_url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhd2bBuiRNhpzLJpl6kppj0J8vov6BrPHdFDpUTCuPzpDw2vUZz6acK5YQlHGcsU-AiE9E8lgFDvVI4xVqGCIQe0od0u0kIoAtYqy7bj-yjcttJo5FcgvDdl_U[...],
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
    id: "w5",
    name: "Marshmallow",
    brand: "Kayali",
    price: 30,
    description: "A rich, deep, and deliciously decadent juice that captivates the senses with creamy jasmine, rich Madagascan vanilla orchid, and sweet Brazilian tonka.",
    image_url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjfaJkQjcAVKeMdMfav1RBlhmnlt-XvI5ZgJvfpluBd390agf2olwsVe2nKZoCTRu-2MGgV_yBCNZtw4d7WUT6pvbhSCM0dfWzIlr3ejcL17mkPpFcnwdAR4s[...],
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
    id: "w6",
    name: "Juicy Apple",
    brand: "Kayali",
    price: 30,
    description: "Playful, vibrant, and bursting with attitude, this delicious scent is a tempting, mouth-watering fusion of crisp and juicy red apples.",
    image_url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhNUfol-nNkxAvY8k_xAdIECvX2hGdEebr_fM_r7xD5wqhcsh-BOs0OtEWu_O3QU5tBAM1KmLaRg_mpn_K-z4_JiRuqetweIJn3tmsBkLHGM16rQcfiyOrShD[...],
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
    id: "w7",
    name: "Taj Sunset",
    brand: "Escada",
    price: 30,
    description: "A sweet, fruity, and tropical fragrance perfect for the summer. It brings the sensation of a tropical sunset right to you.",
    image_url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjcFDuIl9kGn0PGcYlCRtuc7RDbtfns00rlrbGhFKbROHz8_2k3DKUWztfUSP8AZTBgFpPJmw9_G7sNEFpDmuTMlD0qGfX0ala_zsHRGvdG1Bc09vGAjMFnJB[...],
    gallery_urls: [],
    category: "Women",
    top_notes: "Mango, Nectarine, Blood Orange",
    heart_notes: "Raspberry, Star Apple, Water Lily",
    base_notes: "Coconut, Musk, Sandalwood",
    longevity: "6-8 Hours",
    projection: "Moderate",
    occasion: "Daytime, Summer",
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
    image_url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg01_PE7XHhUURdghEIOzzFcqXhASeTRu9TCYazWEeT22fEHHdbqd_yNSe8JqvvPmqz73EEqltYNm_-mRQQdo64x9HEkivRo4fBiqlH4_33rAEImjw4QemDTM[...],
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
    image_url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgFsUNFoLGXkGhxQG8biSazHq_k8UDFXaTFkSqyf5H2rvPk7sKAxblafVBtGTYejFaceJ4hzzxnd4LJjA4YhVQDOTF65qGG_3tnAddWC00gL2rdUhKTnDliwq[...],
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
    name: "Summer Hammer",
    brand: "Lorenzo Pazzaglia",
    price: 30,
    description: "A fruity, sweet and tropical explosion. Summer Hammer is an irresistible cocktail of mango, pineapple and coconut.",
    image_url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhxy6_CQddWZgfMS6VFzvFKdykC0oPIsBBO8w_XsWSk2f7AtqZCHj4UnGfVJmYfWoy3W-U9B22ZDPuXHVHoD_dsS46XnE2AZHl4uDQ4GImqKtNi8o7lQWj7Qs[...],
    gallery_urls: [],
    category: "Men",
    top_notes: "Mango, Pineapple, Coconut",
    heart_notes: "White Rum, Pina Colada, White Flowers",
    base_notes: "Sandalwood, Amber, Musk",
    longevity: "10+ Hours",
    projection: "Strong",
    occasion: "Daytime, Summer",
    gender: "Men",
    size_ml: 20,
    stock: 45,
    is_best_seller: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "m4",
    name: "Bleu de Chanel",
    brand: "Chanel",
    price: 30,
    description: "A woody, aromatic fragrance for the man who defies convention. A provocative blend of citrus and woods that liberates the senses.",
    image_url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgowQvs-meRri-ji_LcP8KVBXS_1nOVjFfIvkGTeGg1q1gh0sqGZ1tr8n1MkiNkuClx-Ny4ORK4Mi5u2S_fRCqnaBhUZcyjAs2a8ZHyCZynOHHbVqglDzC6F5[...],
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
    id: "m5",
    name: "Stronger With You",
    brand: "Emporio Armani",
    price: 30,
    description: "A warm, sensual eau de toilette for men, featuring spicy accords in the top notes of - a mix of cardamom, pink peppercorn, and violet leaves.",
    image_url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhwdjV0V2hJPkBT0vusbjtySt1xOf6Lr-motEQVat7wFRmCyJ0Hh8fiJBWqa07e-Ng-uG1vW_bo6WavWSCx75fQ7mCdh3q898gg8F6ERb_oc3uQvTO-AK47EX[...],
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
    id: "m6",
    name: "Ultra Male",
    brand: "Jean Paul Gaultier",
    price: 30,
    description: "The rogue sailor who will have you lost at sea! This men's eau de toilette is an arm wrestle between power and greed.",
    image_url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgixo_pzXaBzOWGZsmjOzE7oJlBphgrmoSvuUUihXbHG5kqMhfzfW9QS-rkhbt6gi8VNuHzWn78pIDEJH7xnuMkh2YN3UPdQvB7t32ThTlVsqMVBvPM4uKImt[...],
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
    id: "m7",
    name: "Eros",
    brand: "Versace",
    price: 30,
    description: "Love, passion, beauty, and desire. Eros is a fragrance for a strong, passionate man, who is master of himself.",
    image_url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiIOOWx0Cw32iUgkprX2SVQgKtC9xZ8vshm0uT9ZnmrbSZzKzgov8SRWOBCxjZPFUADKtqlqxQBvQ6OcA_gSdUpwRmqEU0kOWJQIsHZDgoixOS4Dlg4ymQAOj[...],
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
    id: "m8",
    name: "Aventus",
    brand: "Creed",
    price: 30,
    description: "Celebrating strength, power, vision, and success. Featuring superb ingredients, Aventus is a sophisticated blend for individuals who savor a life well-lived.",
    image_url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiI6qXqA2Dcb_q3QUpDw5QBzYX8kTGlJrKL1e9JHh0xtZuHt2UBS-aO-WShi9UdwfZNeb26KC_AHrvIiwpIWciD6a7-tQrknpbYhmyXFPBzaV6Na3nSrw424S[...],
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
  },
  {
    id: "m9",
    name: "Kirke",
    brand: "Tiziana Terenzi",
    price: 30,
    description: "A magical and sensual perfume that is like the goddess Circe. Characterized by a lush bouquet of sweet fruit, passion fruit, peaches, and pears.",
    image_url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhJLwSnEiDQRkj0EHNtc-Jx_uwD0VTppbpiP3q6ZbsU_s_1yuW16VjBWwXyVy49R6cnFtBu2fFc-ZQesYvdbmnm3u8kdoNuj0ZcHVQBp6iTlzekWB2BwkLpzm[...],
    gallery_urls: [],
    category: "Men",
    top_notes: "Passionfruit, Peach, Raspberry",
    heart_notes: "Lily-of-the-Valley",
    base_notes: "Musk, Vanilla, Sandalwood",
    longevity: "12+ Hours",
    projection: "Strong",
    occasion: "Anytime",
    gender: "Men",
    size_ml: 20,
    stock: 55,
    is_best_seller: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "m10",
    name: "Le Beau Paradise Garden",
    brand: "Jean Paul Gaultier",
    price: 30,
    description: "A woody green aquatic fragrance that captures the irresistible temptation of a tropical paradise. A fresh and addictive blend.",
    image_url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjM3nskw5UhzdKWDQ2eBaKl0CWEYxzV2Gg-zQTQCORFoE904ThZ5rZaQmWvbBzRK8TkLorzIYnyBZZT5mvvPSfGM_mGnPvpMEtCz5VufxcHbTe6RJ4AFEL0Bc[...],
    gallery_urls: [],
    category: "Men",
    top_notes: "Coconut Water, Mint",
    heart_notes: "Green Notes, Fig",
    base_notes: "Sandalwood, Tonka Bean",
    longevity: "8-10 Hours",
    projection: "Strong",
    occasion: "Anytime",
    gender: "Men",
    size_ml: 20,
    stock: 40,
    is_best_seller: false,
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
