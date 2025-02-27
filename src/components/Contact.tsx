import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Contact.css';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="contact">
      <motion.h2
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Contact Me
      </motion.h2>
      <div className="contact-details">
        <p>Email: himanshuyewale4498@gmail.com</p>
        <p>Phone: +919552596837</p>
        <p>
          LinkedIn: <a href="https://www.linkedin.com/in/himanshuyewale">Profile</a>
        </p>
      </div>
    </section>
  );
};

export default Contact;