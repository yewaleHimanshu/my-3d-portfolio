import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Skills.css';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="skills">
      <motion.h2
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Skills
      </motion.h2>
      {/* 3D content will be rendered in App.tsx */}
    </section>
  );
};

export default Skills;