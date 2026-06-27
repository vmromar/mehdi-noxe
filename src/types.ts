export interface Product {
  id: string;
  name: string;
  brand?: string;
  price: number;
  description: string;
  image_url: string;
  gallery_urls: string[];
  category: string;
  top_notes: string;
  heart_notes: string;
  base_notes: string;
  longevity: string;
  projection: string;
  occasion: string;
  gender: 'Men' | 'Women' | 'Unisex';
  size_ml: number;
  stock: number;
  is_best_seller: boolean;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Review {
  id: string;
  product_id: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface CartItem extends Product {
  quantity: number;
}
