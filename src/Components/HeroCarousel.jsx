import React from 'react'
// import { motion } from "motion/react";
import {motion} from 'framer-motion'

import { CheckCircle2 } from "lucide-react";

const HeroCarousel = () => {
    
    
      return (
        <section className="w-full bg-gradient-to-r from-white to-pink-100 py-20 px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-between">
          {/* Text Section */}
          <div className="flex-1 mb-10 lg:mb-0">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              LET THE <span className="text-lime-500">GAME</span>
              <br />
              BEGIN FIND
              <br />
              YOUR <span className="text-orange-500">GROUND</span>
            </h1>
            <p className="mt-6 text-lg flex items-center gap-2 font-semibold">
              <span role="img" aria-label="emoji">
                🔥
              </span>
              Ready to start the game together
            </p>
            <button className="mt-4 px-6 py-2 bg-white text-green-600 border border-green-500 rounded-full font-semibold hover:bg-green-100 transition">
              EASY
            </button>

            {/* Book Venues Info */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-black">Book Venues</h2>
              <p className="mt-2 text-gray-700 max-w-md">
                A brief introduction to Venus Stadium, its significance, and its
                impact on the cricketing world.
              </p>
            </div>
          </div>

          {/* Image + Floating Tags */}
          <div className="relative flex-1">
<motion.img
              src="https://groundbox.in/assets/images/home/player-hero.png"
              alt="Player Hero"
              className="w-full max-w-[420px] mx-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale:             1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />

            {/* Floating Tags with motion */}
            <motion.div
              className="absolute top-4 right-0 bg-white px-4 py-2 rounded-full shadow-md flex items-center gap-2 animate-bounce"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <CheckCircle2 className="text-orange-500" size={20} />
              Fast Booking
            </motion.div>

            <motion.div
              className="absolute top-24 left-2 bg-white px-4 py-2 rounded-full shadow-md flex items-center gap-2 animate-bounce"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <CheckCircle2 className="text-orange-500" size={20} />
              All Sports Book One place
            </motion.div>

            <motion.div
              className="absolute bottom-14 left-4 bg-white px-4 py-2 rounded-full shadow-md flex items-center gap-2 animate-bounce"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <CheckCircle2 className="text-orange-500" size={20} />
              Book Now
            </motion.div>

            <motion.div
              className="absolute bottom-6 right-0 bg-white px-4 py-2 rounded-full shadow-md flex items-center gap-2 animate-bounce"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <CheckCircle2 className="text-orange-500" size={20} />
              Are You Ready
            </motion.div>

          </div>
        </section>
      );    
}

export default HeroCarousel