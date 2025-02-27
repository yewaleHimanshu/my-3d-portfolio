import React from 'react';
import * as THREE from 'three'; // Import THREE for type definitions
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';

const FloatingBox: React.FC = () => {
  const meshRef = React.useRef<THREE.Mesh>(null!); // TypeScript now recognizes THREE.Mesh
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });
  return <Box ref={meshRef} args={[1, 1, 1]} position={[0, 0, 0]} />;
};

export default FloatingBox;