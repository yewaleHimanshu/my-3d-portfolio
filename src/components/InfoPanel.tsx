import React from 'react';
import { motion } from 'framer-motion';

const CONTENT: Record<string, any> = {
  about: {
    title: 'Himanshu Sharad Yewale',
    type: 'about',
    subtitle: 'Full Stack Developer | Power Platform Specialist | Cloud Enthusiast',
    description:
      'Full stack developer skilled in C#, React JS, ASP.NET, and Entity Framework with deep expertise in Microsoft Power Platform (PL-900 certified) including Power Apps, Power Apps Portals, Copilot Studio, Power Automate, and Dataverse. Cloud proficient with AZ-900, MS-900, and AI-900 certifications, experienced with Azure Speech Studio, Azure AI Services, and Azure OpenAI. Passionate about building innovative solutions that drive digital transformation.',
    education: {
      institution: 'G.H. Raisoni College of Engineering, Nagpur',
      degree: 'Electronics and Telecommunication Engineering',
      duration: 'June 2016 – May 2020',
    },
  },
  skills: {
    title: 'Technical Skills',
    type: 'skills',
    categories: [
      { name: 'Languages & Frameworks', items: ['C#', 'ASP.NET', 'ASP.NET MVC', 'Entity Framework', 'React JS', 'Web API'] },
      { name: 'Power Platform', items: ['Power Apps', 'Power Apps Portals', 'Power Automate', 'Power BI', 'Microsoft Copilot Studio', 'AI Builder', 'Dataverse'] },
      { name: 'Azure & Cloud', items: ['Azure OpenAI', 'Azure AI Services', 'Azure Speech Studio', 'Azure Data Lake', 'Azure Databricks', 'Azure Fundamentals'] },
      { name: 'Microsoft 365 & Tools', items: ['MS Bot Framework', 'MS Teams Development', 'SharePoint Online', 'M365 Graph Connectors', 'XRM Toolbox'] },
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
          'Developed Copilot with telephony using Copilot Studio and Azure Communication Services.',
          'Built AI-driven workflows using Power Automate and Power Apps AI Hub.',
          'Integrated Salesforce, SuccessFactors, and ServiceNow agents in Copilot Studio.',
          'Developed Azure Function Apps improving processing efficiency by 30%.',
          'Designed ETL pipelines using Azure Data Factory.',
          'Integrated Azure Function App with Azure Data Factory reducing data latency by 25%.',
        ],
      },
      {
        role: 'Packaged App Development Analyst',
        company: 'Accenture, Pune',
        duration: 'Dec 2021 – June 2024',
        details: [
          'Built Power Apps and Power Apps Portals for financial services.',
          'Automated workflows using Power Automate.',
          'Developed C# applications using ASP.NET MVC and Entity Framework.',
          'Created React JS user interfaces.',
          'Developed RESTful Web APIs.',
          'Built Power BI reports for data-driven insights.',
          'Developed chatbots using Microsoft Bot Framework and Power Virtual Agents.',
          'Contributed to MS Teams app development in React JS.',
          'Built Translation Bot using Azure AI Services and Speech Studio.',
          'Worked on Microsoft 365 and SharePoint Online integrations.',
        ],
      },
      {
        role: 'Application Development Associate',
        company: 'Accenture, Pune',
        duration: 'Oct 2020 – Dec 2021',
        details: [
          'Developed applications using C#, ASP.NET, MVC, Entity Framework, and MS-SQL.',
          'Created Power BI reports for analytics.',
          'Designed cloud solutions using Azure Fundamentals.',
          'Applied Microsoft 365 Fundamentals for collaboration.',
          'Achieved AZ-900 and MS-900 certifications.',
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
          'Built an innovative copilot using Microsoft Copilot Studio with Azure Communication Services for seamless voice-based customer interactions.',
      },
      {
        name: 'Multi-Agent Copilot Integration',
        description:
          'Integrated Salesforce, SuccessFactors, and ServiceNow agents within Copilot Studio for unified enterprise workflows.',
      },
      {
        name: 'Azure Data Pipeline',
        description:
          'Designed ETL pipelines using Azure Data Factory integrated with Azure Function Apps, reducing data latency by 25%.',
      },
      {
        name: 'Translation Bot',
        description:
          'Built a real-time translation chatbot using Azure AI Services and Azure Speech Studio.',
      },
      {
        name: '3D Portfolio Website',
        description:
          'This solar-system-themed portfolio built with React Three Fiber, Three.js, and post-processing effects.',
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
    phone: '+91 9552596837',
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
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 180 }}
    >
      {/* HUD frame decorations */}
      <div className="panel-hud-frame">
        <div className="panel-hud-corner panel-hud-tl"></div>
        <div className="panel-hud-corner panel-hud-tr"></div>
        <div className="panel-hud-corner panel-hud-bl"></div>
        <div className="panel-hud-corner panel-hud-br"></div>
        <div className="panel-hud-line panel-hud-line-top"></div>
        <div className="panel-hud-scanlines"></div>
      </div>

      {/* Drag handle */}
      <div className="panel-handle">
        <div className="panel-handle-bar"></div>
      </div>

      <button className="close-btn" onClick={onClose}>✕</button>

      <div className="panel-header-row">
        <div className="panel-hud-indicator"></div>
        <h2>{content.title}</h2>
        <span className="panel-hud-tag">◆ {planetId.toUpperCase()} ◆</span>
      </div>

      {content.type === 'about' && (
        <div className="panel-content">
          <p className="subtitle">{content.subtitle}</p>
          <p>{content.description}</p>
          {content.education && (
            <div className="edu-section">
              <h3>Education</h3>
              <p className="edu-degree">{content.education.degree}</p>
              <p className="edu-meta">{content.education.institution}</p>
              <p className="edu-meta">{content.education.duration}</p>
            </div>
          )}
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
