import React from "react";
import Navbar from "../Components/Navbar";
import TurfCard from "../Components/TurfCard";
import SportsDetail from "../Components/SportsDetail";
import Footer from "../Components/Footer";
import HeroCarousel from "../Components/HeroCarousel";


const Homepage = () => {
  
  return (
   <>
   <Navbar/>
   <HeroCarousel/>
   <TurfCard/>
   <SportsDetail/>
   <Footer/>
   </>
  );
};

export default Homepage;
