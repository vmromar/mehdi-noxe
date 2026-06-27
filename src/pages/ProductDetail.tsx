import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
import { useShop } from "../context/ShopContext";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart, isLoading } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedSize, setSelectedSize] = useState<number>(50);

  const product = products.find((p) => p.id === id);

  if (isLoading) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex justify-center items-center bg-noxe-black">
        <div className="w-12 h-12 border-t-2 border-b-2 border-noxe-gold rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex flex-col justify-center items-center bg-noxe-black">
        <h2 className="text-3xl font-serif text-noxe-white mb-6">
          Product Not Found
        </h2>
        <Link
          to="/shop"
          className="text-noxe-gold hover:text-white uppercase tracking-widest text-sm transition-colors border-b border-noxe-gold pb-1"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const getPriceForSize = (size: number) => {
    switch (size) {
      case 20:
        return 30;
      case 30:
        return 40;
      case 50:
        return 60;
      default:
        return 60;
    }
  };

  const currentPrice = getPriceForSize(selectedSize);

  const handleAddToCart = () => {
    addToCart(
      {
        ...product,
        size_ml: selectedSize,
        price: currentPrice,
        id: `${product.id}-${selectedSize}`,
      },
      quantity,
    );
  };

  return (
    <div className="pt-28 pb-24 bg-noxe-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/shop"
          className="inline-flex items-center text-gray-400 hover:text-noxe-gold transition-colors mb-8 text-sm uppercase tracking-widest"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <div className="aspect-[4/5] bg-noxe-gray overflow-hidden w-full group">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-zoom-in"
              />
            </div>
            {/* Thumbnails placeholder if we had multiple images */}
            {product.gallery_urls && product.gallery_urls.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                <img
                  src={product.image_url}
                  className="w-full aspect-square object-cover border border-noxe-gold cursor-pointer"
                  alt="Thumbnail"
                />
                {product.gallery_urls.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    className="w-full aspect-square object-cover opacity-50 hover:opacity-100 cursor-pointer transition-opacity"
                    alt="Thumbnail"
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-8 border-b border-noxe-light-gray pb-8">
              <div className="flex justify-between items-end mb-4">
                <p className="text-xs text-noxe-gold tracking-widest uppercase">
                  {product.gender} • {product.category}
                </p>
                <p className="text-xs text-gray-500 tracking-widest uppercase">
                  {product.size_ml}ML
                </p>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-noxe-white mb-4">
                {product.name}
              </h1>
              <p className="text-2xl text-noxe-gold font-light mb-6">
                {currentPrice} DH
              </p>
              <p className="text-gray-400 leading-relaxed text-sm">
                {product.description}
              </p>
            </div>

            {/* Size Selector */}
            <div className="mb-8">
              <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-3">
                Select Size (ML)
              </h4>
              <div className="flex gap-4">
                {[20, 30, 50].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-6 border text-sm transition-colors ${
                      selectedSize === size
                        ? "border-noxe-gold text-noxe-gold bg-noxe-gold/10"
                        : "border-noxe-light-gray text-gray-400 hover:border-noxe-gold hover:text-noxe-white"
                    }`}
                  >
                    {size}ml
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mb-12">
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center border border-noxe-light-gray">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-4 text-gray-400 hover:text-noxe-white transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-4 text-gray-400 hover:text-noxe-white transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-noxe-white text-noxe-black hover:bg-noxe-gold transition-colors py-4 px-8 uppercase tracking-widest text-sm font-medium flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={18} />
                  Add to Cart
                </button>
              </div>
              <p className="text-xs text-center text-gray-500 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                In Stock. Ready to ship.
              </p>
            </div>

            {/* Details Tabs */}
            <div>
              <div className="flex border-b border-noxe-light-gray mb-6">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`pb-3 px-4 text-sm tracking-widest uppercase transition-colors ${activeTab === "description" ? "text-noxe-gold border-b-2 border-noxe-gold" : "text-gray-500 hover:text-noxe-white"}`}
                >
                  Details
                </button>
                <button
                  onClick={() => setActiveTab("notes")}
                  className={`pb-3 px-4 text-sm tracking-widest uppercase transition-colors ${activeTab === "notes" ? "text-noxe-gold border-b-2 border-noxe-gold" : "text-gray-500 hover:text-noxe-white"}`}
                >
                  Olfactory Notes
                </button>
              </div>

              <div className="text-sm text-gray-400 min-h-[150px]">
                {activeTab === "description" && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <p>{product.description}</p>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div>
                        <span className="block text-noxe-white mb-1">
                          Longevity
                        </span>
                        <span>{product.longevity}</span>
                      </div>
                      <div>
                        <span className="block text-noxe-white mb-1">
                          Projection
                        </span>
                        <span>{product.projection}</span>
                      </div>
                      <div>
                        <span className="block text-noxe-white mb-1">
                          Occasion
                        </span>
                        <span>{product.occasion}</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "notes" && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div>
                      <h4 className="text-noxe-white font-serif mb-2 text-lg">
                        Top Notes
                      </h4>
                      <p>{product.top_notes}</p>
                      <p className="text-xs mt-1 text-gray-500">
                        The initial impression, bright and fleeting.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-noxe-white font-serif mb-2 text-lg">
                        Heart Notes
                      </h4>
                      <p>{product.heart_notes}</p>
                      <p className="text-xs mt-1 text-gray-500">
                        The core character, unfolding beautifully.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-noxe-white font-serif mb-2 text-lg">
                        Base Notes
                      </h4>
                      <p>{product.base_notes}</p>
                      <p className="text-xs mt-1 text-gray-500">
                        The lingering memory, deep and rich.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
