import React, { useState } from "react";
import { motion } from "motion/react";
import { useShop } from "../context/ShopContext";
import { Link, useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useShop();
  const navigate = useNavigate();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    whatsapp: "",
    otherNumber: "",
    city: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (
      !formData.fullName ||
      !formData.whatsapp ||
      !formData.city ||
      !formData.address
    ) {
      alert(
        "Please fill in all required fields (Full Name, WhatsApp, City, Address).",
      );
      return;
    }

    try {
      setIsPlacingOrder(true);

      const orderContent = `
*New Order from NOXE!*

*Customer Details:*
Name: ${formData.fullName}
WhatsApp: ${formData.whatsapp}
Other Number: ${formData.otherNumber || "N/A"}
City: ${formData.city}
Address: ${formData.address}

*Order Items:*
${cart.map((item) => `- ${item.quantity}x ${item.name} (${item.size_ml}ml) | ${item.price} DH each`).join("\n")}

*Total:* ${cartTotal} DH
*Payment Method:* Cash on Delivery
`;

      const whatsappNumber = "212674421937";
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderContent.trim())}`;

      window.open(whatsappUrl, "_blank");

      if (clearCart) clearCart();
      navigate("/");
    } catch (error: any) {
      console.error("Error placing order:", error);
      alert(
        "Failed to place order. Please check your connection and try again.",
      );
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex flex-col justify-center items-center bg-noxe-black">
        <h2 className="text-3xl font-serif text-noxe-white mb-6">
          Your cart is empty
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

  return (
    <div className="pt-28 pb-24 bg-noxe-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-serif text-noxe-white mb-12"
        >
          Checkout
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <form className="space-y-12">
              {/* Easy Checkout Details */}
              <section>
                <h3 className="text-xl font-serif text-noxe-white mb-6">
                  Delivery Details
                </h3>
                <div className="space-y-6">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name *"
                    required
                    className="w-full bg-transparent border-b border-noxe-light-gray focus:border-noxe-gold py-3 text-noxe-white outline-none transition-colors"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="WhatsApp Number *"
                      required
                      className="w-full bg-transparent border-b border-noxe-light-gray focus:border-noxe-gold py-3 text-noxe-white outline-none transition-colors"
                    />
                    <input
                      type="tel"
                      name="otherNumber"
                      value={formData.otherNumber}
                      onChange={handleChange}
                      placeholder="Other Phone Number (Optional)"
                      className="w-full bg-transparent border-b border-noxe-light-gray focus:border-noxe-gold py-3 text-noxe-white outline-none transition-colors"
                    />
                  </div>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City *"
                    required
                    className="w-full bg-transparent border-b border-noxe-light-gray focus:border-noxe-gold py-3 text-noxe-white outline-none transition-colors"
                  />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Full Address *"
                    required
                    className="w-full bg-transparent border-b border-noxe-light-gray focus:border-noxe-gold py-3 text-noxe-white outline-none transition-colors"
                  />
                </div>
              </section>

              {/* Payment Info */}
              <section>
                <h3 className="text-xl font-serif text-noxe-white mb-6">
                  Payment
                </h3>
                <div className="bg-noxe-gray p-6 border border-noxe-light-gray space-y-6">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="cod"
                      name="payment"
                      value="cod"
                      checked
                      readOnly
                      className="w-4 h-4 text-noxe-gold bg-noxe-black border-noxe-light-gray focus:ring-noxe-gold"
                    />
                    <label
                      htmlFor="cod"
                      className="ml-3 text-noxe-white font-medium"
                    >
                      Cash on Delivery
                    </label>
                  </div>
                  <p className="text-sm text-gray-500 pl-7">
                    Pay with cash upon delivery.
                  </p>
                </div>
              </section>

              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder}
                className="w-full bg-noxe-gold text-noxe-black hover:bg-white transition-colors py-4 px-8 uppercase tracking-widest text-sm font-medium mt-8 disabled:opacity-50"
              >
                {isPlacingOrder ? "Processing..." : "Place Order"}
              </button>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="bg-noxe-gray p-8 sticky top-32">
              <h3 className="text-xl font-serif text-noxe-white mb-8">
                Order Summary
              </h3>

              <div className="space-y-6 mb-8 border-b border-noxe-light-gray pb-8">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-20 bg-noxe-black overflow-hidden relative">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-0 right-0 bg-noxe-gold text-noxe-black text-[10px] w-4 h-4 flex items-center justify-center font-bold">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 flex justify-between">
                      <div>
                        <h4 className="font-serif text-noxe-white text-sm">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-400 mt-1">
                          {item.size_ml}ml
                        </p>
                      </div>
                      <span className="text-noxe-gold text-sm">
                        {item.price * item.quantity} DH
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 text-sm text-gray-400 mb-8 border-b border-noxe-light-gray pb-8">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-noxe-white">{cartTotal} DH</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-noxe-white text-noxe-gold">
                    Free Delivery
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <span className="text-noxe-white text-lg">Total</span>
                <span className="text-2xl font-serif text-noxe-gold">
                  <span className="text-xs text-gray-500 font-sans mr-2 uppercase">
                    MAD
                  </span>
                  {cartTotal} DH
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
