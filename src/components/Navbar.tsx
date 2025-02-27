import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="navbar"
    >
      <div className="logo">Himanshu Yewale</div>
      <ul>
        <li><a href="#hero">Home</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#certifications">Certifications</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </motion.nav>
  );
};

export default Navbar;