import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FormularioConMapa from "../components/FormularioConMapa";
import Beneficios from "../components/Beneficios";
import Footer from "../components/Footer";
const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <FormularioConMapa />
      <Beneficios />
      <Footer />
    </div>
  );
};

export default Home;
