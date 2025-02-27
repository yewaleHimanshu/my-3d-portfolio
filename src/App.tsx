import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Box, OrbitControls, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './styles/App.css';

const FloatingBox: React.FC = () => {
  const meshRef = React.useRef<THREE.Mesh>(null!);
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });
  return (
    <Box ref={meshRef} args={[1, 1, 1]} position={[0, 0, 0]}>
      <meshStandardMaterial color="purple" />
    </Box>
  );
};

interface SkillCardProps {
  skill: string;
  index: number; // Add index to calculate unique orbit
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, index }) => {
  const groupRef = React.useRef<THREE.Group>(null!);
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Orbit around the center
      const angle = index * 0.7 + state.clock.getElapsedTime() * 1; // Faster orbit
      groupRef.current.position.x = Math.sin(angle) * 5;
      groupRef.current.position.y = Math.cos(angle) * 5 - 2;
    }
  });
  return (
    <group ref={groupRef}>
      <Text color="white" fontSize={0.5} position={[0, 0, 0.1]}>
        {skill}
      </Text>
      <mesh>
        <boxGeometry args={[2, 1, 0.1]} />
        <meshStandardMaterial color="#1e90ff" />
      </mesh>
    </group>
  );
};

interface CertBadgeProps {
  name: string;
  index: number; // Add index for orbit
}

const CertBadge: React.FC<CertBadgeProps> = ({ name, index }) => {
  const groupRef = React.useRef<THREE.Group>(null!);
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Slower orbit
      const angle = index * 1.5 + state.clock.getElapsedTime() * 0.5;
      groupRef.current.position.x = Math.sin(angle) * 3;
      groupRef.current.position.y = Math.cos(angle) * 3 - 6;
    }
  });
  return (
    <group ref={groupRef}>
      <Text color="white" fontSize={0.3} position={[0, 0, 0.1]}>
        {name}
      </Text>
      <mesh>
        <circleGeometry args={[0.8, 32]} />
        <meshStandardMaterial color="#ff4500" />
      </mesh>
    </group>
  );
};

const App: React.FC = () => {
  const skills: string[] = [
    'C#', 'React JS', 'Power Apps', 'Power Automate', 'Power BI',
    'Azure OpenAI', 'MS Bot Framework', 'ASP.NET', 'Entity Framework'
  ];
  const certs: string[] = [
    'AZ-900 Azure Fundamentals',
    'MS-900 Microsoft 365 Fundamentals',
    'AI-900 Azure AI Fundamentals',
    'PL-900 Power Platform Fundamentals'
  ];

  return (
    <div className="app">
      <Navbar />
      <Canvas
        style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}
        gl={{ alpha: true }}
        camera={{ position: [0, 0, 20], fov: 75 }} // Increased camera distance
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <FloatingBox />
        {skills.map((skill: string, index: number) => (
          <SkillCard key={index} skill={skill} index={index} />
        ))}
        {certs.map((cert: string, index: number) => (
          <CertBadge key={index} name={cert} index={index} />
        ))}
        <OrbitControls enableZoom={true} />
      </Canvas>
      <Hero />
      <Skills />
      <Experience />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;