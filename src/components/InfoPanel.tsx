import React from 'react';
import { motion } from 'framer-motion';

const CONTENT: Record<string, any> = {
  about: {
    title: 'Himanshu Sharad Yewale',
    type: 'about',
    subtitle: 'Full Stack Developer | Power Platform Specialist | Cloud Enthusiast',
    description:
      'Passionate developer with expertise in Microsoft Power Platform, Azure Cloud, and full-stack web development. Building innovative solutions that drive digital transformation.',
  },
  skills: {
    title: 'Technical Skills',
    type: 'skills',
    categories: [
      { name: 'Languages & Frameworks', items: ['C#', 'ASP.NET', 'React JS', 'Entity Framework'] },
      { name: 'Power Platform', items: ['Power Apps', 'Power Automate', 'Power BI'] },
      { name: 'AI & Cloud', items: ['Azure OpenAI', 'MS Bot Framework', 'Azure Data Factory'] },
    ],
  },
  experience: {
    title: 'Professional Experience',
    type: 'experience',
    items: [
      {
        role: 'Packaged App Development Senior Analyst',
        company: 'Accenture, Pune',
        duration: 'June 2024 – Present',
        details: [
          'Developed an innovative copilot with telephony capabilities using Microsoft Copilot Studio.',
          'Built AI-driven workflows using Power Automate and Power Apps AI Hub.',
          'Designed complex ETL pipelines in Azure Data Factory.',
        ],
      },
      {
        role: 'Packaged App Development Analyst',
        company: 'Accenture, Pune',
        duration: 'Dec 2021 – June 2024',
        details: [
          'Created Power Apps and Portals for financial services.',
          'Developed chatbots using Microsoft Bot Framework.',
          'Crafted Power BI reports for data-driven insights.',
        ],
      },
    ],
  },
  projects: {
    title: 'Projects',
    type: 'projects',
    items: [
      {
        name: 'AI Copilot with Telephony',
        description:
          'Built an innovative copilot using Microsoft Copilot Studio with telephony capabilities for seamless customer interactions.',
      },
      {
        name: 'Financial Services Portal',
        description:
          'Created comprehensive Power Apps and Portals solution for financial services clients with complex workflows.',
      },
      {
        name: '3D Portfolio Website',
        description:
          'This solar-system-themed portfolio built with React Three Fiber and Three.js.',
      },
    ],
  },
  certifications: {
    title: 'Certifications',
    type: 'certifications',
    items: [
      { name: 'AZ-900', full: 'Azure Fundamentals' },
      { name: 'MS-900', full: 'Microsoft 365 Fundamentals' },
      { name: 'AI-900', full: 'Azure AI Fundamentals' },
      { name: 'PL-900', full: 'Power Platform Fundamentals' },
    ],
  },
  contact: {
    title: 'Contact Me',
    type: 'contact',
    email: 'himanshuyewale4498@gmail.com',
    phone: '+919552596837',
    linkedin: 'https://www.linkedin.com/in/himanshuyewale',
  },
};

interface InfoPanelProps {
  planetId: string;
  onClose: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ planetId, onClose }) => {
  const content = CONTENT[planetId];
  if (!content) return null;

  return (
    <motion.div
      className="info-panel"
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
    >
      <button className="close-btn" onClick={onClose}>✕</button>
      <h2>{content.title}</h2>

      {content.type === 'about' && (
        <div className="panel-content">
          <p className="subtitle">{content.subtitle}</p>
          <p>{content.description}</p>
        </div>
      )}

      {content.type === 'skills' && (
        <div className="panel-content">
          {content.categories.map((cat: any) => (
            <div key={cat.name} className="skill-category">
              <h3>{cat.name}</h3>
              <div className="skill-tags">
                {cat.items.map((item: string) => (
                  <span key={item} className="skill-tag">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {content.type === 'experience' && (
        <div className="panel-content">
          {content.items.map((exp: any, i: number) => (
            <div key={i} className="exp-card">
              <h3>{exp.role}</h3>
              <p className="exp-meta">{exp.company} · {exp.duration}</p>
              <ul>
                {exp.details.map((d: string, j: number) => (
                  <li key={j}>{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {content.type === 'projects' && (
        <div className="panel-content">
          {content.items.map((proj: any, i: number) => (
            <div key={i} className="project-card">
              <h3>{proj.name}</h3>
              <p>{proj.description}</p>
            </div>
          ))}
        </div>
      )}

      {content.type === 'certifications' && (
        <div className="panel-content">
          <div className="cert-list">
            {content.items.map((cert: any, i: number) => (
              <div key={i} className="cert-item">
                <span className="cert-badge">{cert.name}</span>
                <span className="cert-name">{cert.full}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {content.type === 'contact' && (
        <div className="panel-content">
          <div className="contact-item">
            <span>📧</span>
            <a href={`mailto:${content.email}`}>{content.email}</a>
          </div>
          <div className="contact-item">
            <span>📱</span>
            <span>{content.phone}</span>
          </div>
          <div className="contact-item">
            <span>💼</span>
            <a href={content.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default InfoPanel;
