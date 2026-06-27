import React from 'react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="bg-noxe-black min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=1600&q=80" 
            alt="NOXE Heritage" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="relative z-20 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-serif text-noxe-white mb-6"
          >
            Our Story
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '4rem' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[1px] bg-noxe-gold mx-auto"
          ></motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="prose prose-invert prose-lg mx-auto"
          >
            <p className="text-xl text-noxe-white text-center leading-relaxed font-serif italic mb-16">
              "We don't just create perfumes. We bottle memories, emotions, and the unspoken language of attraction."
            </p>

            <h2 className="font-serif text-noxe-white text-3xl mb-6">The Genesis of NOXE</h2>
            <p className="text-gray-400 mb-10 leading-relaxed">
              Founded in the heart of Paris, NOXE was born from a rebellion against mass-market fragrances. We believed that true luxury lies in exclusivity, rare ingredients, and the meticulous art of blending. Our founders, master perfumers with decades of experience in the world's most prestigious houses, set out to create a niche brand that compromises on nothing.
            </p>

            <div className="my-16 relative aspect-video">
              <img 
                src="https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=1000&q=80" 
                alt="Perfume Creation" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>

            <h2 className="font-serif text-noxe-white text-3xl mb-6">Our Ingredients</h2>
            <p className="text-gray-400 mb-10 leading-relaxed">
              We travel the globe to source our materials directly from the farmers and distillers who cultivate them. From the misty mountains of Grasse for our jasmine to the dense forests of Southeast Asia for our pure oud wood, every drop in a NOXE bottle has a story of origin.
            </p>

            <h2 className="font-serif text-noxe-white text-3xl mb-6">The NOXE Philosophy</h2>
            <p className="text-gray-400 leading-relaxed">
              A NOXE fragrance is an intimate signature. We formulate our extracts to interact uniquely with your skin chemistry, ensuring that no two people wear our scents exactly the same way. Our minimalist, heavy glass bottles reflect our ethos: the focus must always remain on the precious liquid within.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
