import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Hero.css';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="hero">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="hero-content"
      >
        <h1>Himanshu Sharad Yewale</h1>
        <p>Full Stack Developer | Power Platform Specialist | Cloud Enthusiast</p>
        <a href="#contact" className="cta-button">Get in Touch</a>
      </motion.div>
    </section>
  );
};

export default Hero;