import React from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';

const FloatingBox: React.FC = () => {
  const meshRef = React.useRef<THREE.Mesh>(null!);
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.rotation.x += delta * 0.2;
    }
  });
  return (
    <Box ref={meshRef} args={[1, 1, 1]} position={[0, 0, 0]}>
      <meshStandardMaterial color="purple" />
    </Box>
  );
};

export default FloatingBox;