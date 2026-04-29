import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Skills.css';

const skills = [
  'C#', 'React JS', 'Power Apps', 'Power Automate', 'Power BI',
  'Azure OpenAI', 'MS Bot Framework', 'ASP.NET', 'Entity Framework'
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="skills">
      <motion.h2
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Skills
      </motion.h2>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <motion.div
            key={skill}
            className="skill-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;