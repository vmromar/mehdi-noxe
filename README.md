# NOXE - Luxury Perfume E-Commerce

A premium, modern, fully responsive e-commerce website for the luxury perfume brand NOXE.

## Tech Stack
- React + Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- React Router
- Supabase (Backend)

## Supabase Setup Instructions

1. Create a new project in [Supabase](https://supabase.com/).
2. Copy your Project URL and Anon Key into the `.env.example` file (or set them in your AI Studio Secrets panel as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`).
3. Run the following SQL in your Supabase SQL Editor to create the necessary tables:

```sql
-- Create Products Table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  gallery_urls TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  top_notes TEXT,
  heart_notes TEXT,
  base_notes TEXT,
  longevity TEXT,
  projection TEXT,
  occasion TEXT,
  gender TEXT,
  size_ml INTEGER,
  stock INTEGER DEFAULT 0,
  is_best_seller BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert Sample Data
INSERT INTO products (name, price, description, image_url, category, top_notes, heart_notes, base_notes, longevity, projection, occasion, gender, size_ml, stock, is_best_seller) VALUES
('Midnight Oud', 280.00, 'A deep, mysterious blend of agarwood, black rose, and smoked leather. Perfect for the evening.', 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&q=80', 'Winter', 'Saffron, Black Pepper', 'Black Rose, Patchouli', 'Agarwood (Oud), Smoked Leather', '12+ Hours', 'Strong', 'Evening, Formal', 'Unisex', 100, 50, true),
('Velvet Bergamot', 210.00, 'Crisp Italian bergamot meets soft white florals and warm cedarwood.', 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80', 'Summer', 'Bergamot, Lemon Zest', 'Jasmine, Lily of the Valley', 'Cedarwood, White Musk', '6-8 Hours', 'Moderate', 'Daytime, Casual', 'Women', 50, 30, false),
('Santal Solstice', 320.00, 'Creamy sandalwood and spicy cardamom create a comforting yet exotic aura.', 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80', 'Unisex', 'Cardamom, Violet', 'Iris, Papyrus', 'Sandalwood, Leather', '10+ Hours', 'Strong', 'Anytime', 'Unisex', 100, 25, true),
('Noir Absolu', 250.00, 'An intoxicating evening fragrance featuring dark vanilla, tonka bean, and a hint of tobacco.', 'https://images.unsplash.com/photo-1592914610354-fd354ea45e48?w=800&q=80', 'Winter', 'Pink Pepper, Bergamot', 'Tobacco Leaf, Cacao', 'Madagascar Vanilla, Tonka Bean', '8-10 Hours', 'Moderate to Strong', 'Evening, Date Night', 'Men', 100, 15, false);

-- Enable Row Level Security (Optional but recommended)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON products FOR SELECT USING (true);
```

## Features
- Fully functional shopping cart
- Product filtering and sorting
- Smooth page transitions and animations
- Admin dashboard (Mocked authentication)
- Responsive luxury design
