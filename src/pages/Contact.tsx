import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Instagram } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-28 pb-24 bg-noxe-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif text-noxe-white mb-6"
          >
            Contact Us
          </motion.h1>
          <div className="w-16 h-[1px] bg-noxe-gold mx-auto mb-8"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our concierge team is at your disposal to assist with any inquiries regarding our fragrances, your order, or bespoke services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-serif text-noxe-white mb-8">Send a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">First Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-noxe-light-gray focus:border-noxe-gold py-2 text-noxe-white outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Last Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-noxe-light-gray focus:border-noxe-gold py-2 text-noxe-white outline-none transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Email Address</label>
                <input type="email" className="w-full bg-transparent border-b border-noxe-light-gray focus:border-noxe-gold py-2 text-noxe-white outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Message</label>
                <textarea rows={4} className="w-full bg-transparent border-b border-noxe-light-gray focus:border-noxe-gold py-2 text-noxe-white outline-none transition-colors resize-none"></textarea>
              </div>
              <button type="button" className="bg-noxe-gold text-noxe-black hover:bg-white transition-colors py-4 px-8 uppercase tracking-widest text-sm font-medium">
                Submit Inquiry
              </button>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-serif text-noxe-white mb-8">Client Services</h2>
              <div className="space-y-8">
                <div className="flex items-start">
                  <MapPin className="text-noxe-gold mr-4 mt-1" size={20} />
                  <div>
                    <h4 className="text-noxe-white font-serif text-lg mb-1">NOXE Headquarters</h4>
                    <p className="text-gray-400 text-sm">Meknès<br/>Morocco</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="text-noxe-gold mr-4 mt-1" size={20} />
                  <div>
                    <h4 className="text-noxe-white font-serif text-lg mb-1">Telephone</h4>
                    <p className="text-gray-400 text-sm">0674421937<br/>Mon-Sat, 9am - 6pm</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="text-noxe-gold mr-4 mt-1" size={20} />
                  <div>
                    <h4 className="text-noxe-white font-serif text-lg mb-1">Email</h4>
                    <p className="text-gray-400 text-sm">concierge@noxe.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-noxe-light-gray">
              <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Follow Us</h4>
              <div className="flex space-x-6">
                <a href="#" className="flex items-center text-noxe-white hover:text-noxe-gold transition-colors">
                  <Instagram size={20} className="mr-2" />
                  <span className="text-sm">@noxe.ma</span>
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
