import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Certifications.css';

const certs = [
  'AZ-900 Azure Fundamentals',
  'MS-900 Microsoft 365 Fundamentals',
  'AI-900 Azure AI Fundamentals',
  'PL-900 Power Platform Fundamentals'
];

const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="certifications">
      <motion.h2
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Certifications
      </motion.h2>
      <div className="certs-grid">
        {certs.map((cert, index) => (
          <motion.div
            key={cert}
            className="cert-card"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.15 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="cert-icon">🏆</div>
            <p>{cert}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;