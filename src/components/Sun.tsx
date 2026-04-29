import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';

interface SunProps {
  onClick: () => void;
}

const Sun: React.FC<SunProps> = ({ onClick }) => {
  const coreRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const outerGlowRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const [sunTexture, setSunTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    let mounted = true;
    const loader = new TextureLoader();

    loader.load(
      'https://threejs.org/examples/textures/planets/sun.jpg',
      (tex) => {
        if (!mounted) return;
        tex.colorSpace = THREE.SRGBColorSpace;
        setSunTexture(tex);
      },
      undefined,
      () => {
        if (!mounted) return;
        setSunTexture(null);
      }
    );

    return () => {
      mounted = false;
    };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.003;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.05);
    }
    if (outerGlowRef.current) {
      outerGlowRef.current.scale.setScalar(1 + Math.sin(t * 0.8) * 0.08);
    }
  });

  return (
    <group
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
    >
      {/* Core */}
      <mesh ref={coreRef} castShadow>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={sunTexture || undefined}
          emissive="#ff8c00"
          emissiveIntensity={hovered ? 4 : 3}
          color="#ffa500"
          roughness={0.2}
          toneMapped={false}
        />
      </mesh>
      {/* Inner glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial color="#ff6600" transparent opacity={0.18} side={THREE.BackSide} toneMapped={false} />
      </mesh>
      {/* Corona layer 1 */}
      <mesh ref={outerGlowRef}>
        <sphereGeometry args={[3.5, 32, 32]} />
        <meshBasicMaterial color="#ff4400" transparent opacity={0.08} side={THREE.BackSide} toneMapped={false} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Corona layer 2 */}
      <mesh>
        <sphereGeometry args={[4.5, 32, 32]} />
        <meshBasicMaterial color="#ff2200" transparent opacity={0.04} side={THREE.BackSide} toneMapped={false} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Lights */}
      <pointLight color="#ffd4a0" intensity={5} distance={100} decay={2} castShadow shadow-mapSize-width={512} shadow-mapSize-height={512} />
      <pointLight color="#ff6600" intensity={2} distance={50} decay={2} />
      {/* Label */}
      <Html position={[0, 3, 0]} center distanceFactor={20}>
        <div className="planet-label sun-label" style={{ opacity: hovered ? 1 : 0.8 }}>
          ☀ About Me
        </div>
      </Html>
    </group>
  );
};

export default Sun;
