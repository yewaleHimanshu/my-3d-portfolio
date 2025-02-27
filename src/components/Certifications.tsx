import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Certifications.css';

const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="certifications">
      <motion.h2
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Certifications
      </motion.h2>
      {/* 3D content will be rendered in App.tsx */}
    </section>
  );
};

export default Certifications;