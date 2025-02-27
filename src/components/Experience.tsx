import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Experience.css';

interface ExperienceCardProps {
  role: string;
  company: string;
  duration: string;
  details: string[];
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ role, company, duration, details }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="experience-card"
  >
    <h3>{role}</h3>
    <p>{company} | {duration}</p>
    <ul>
      {details.map((detail, idx) => (
        <li key={idx}>{detail}</li>
      ))}
    </ul>
  </motion.div>
);

const Experience: React.FC = () => {
  const experiences: ExperienceCardProps[] = [
    {
      role: 'Packaged App Development Senior Analyst',
      company: 'Accenture, Pune',
      duration: 'June 2024 - Present',
      details: [
        'Developed an innovative copilot with telephony capabilities using Microsoft Copilot Studio.',
        'Built AI-driven workflows using Power Automate and Power Apps AI Hub.',
        'Designed complex ETL pipelines in Azure Data Factory.'
      ]
    },
    {
      role: 'Packaged App Development Analyst',
      company: 'Accenture, Pune',
      duration: 'Dec 2021 - June 2024',
      details: [
        'Created Power Apps and Portals for financial services.',
        'Developed chatbots using Microsoft Bot Framework.',
        'Crafted Power BI reports for data-driven insights.'
      ]
    }
  ];

  return (
    <section id="experience" className="experience">
      <motion.h2
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Experience
      </motion.h2>
      <div className="experience-list">
        {experiences.map((exp, index) => (
          <ExperienceCard key={index} {...exp} />
        ))}
      </div>
    </section>
  );
};

export default Experience;