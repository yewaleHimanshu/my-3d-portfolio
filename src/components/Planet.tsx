import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';

interface PlanetProps {
  id: string;
  name: string;
  orbitRadius: number;
  orbitSpeed: number;
  size: number;
  color: string;
  emissive: string;
  metalness: number;
  roughness: number;
  textureUrl: string;
  hasRing: boolean;
  ringTextureUrl?: string;
  startAngle: number;
  speedMult: number;
  onClick: () => void;
  reportPosition: (pos: THREE.Vector3) => void;
}

const Planet: React.FC<PlanetProps> = ({
  name, orbitRadius, orbitSpeed, size, color, emissive,
  metalness, roughness, textureUrl, hasRing, ringTextureUrl, startAngle, speedMult,
  onClick, reportPosition,
}) => {
  const groupRef = useRef<THREE.Group>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);
  const angleRef = useRef(startAngle);
  const [hovered, setHovered] = useState(false);
  const posVec = useRef(new THREE.Vector3());
  const [textureMap, setTextureMap] = useState<THREE.Texture | null>(null);
  const [ringMap, setRingMap] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    let mounted = true;
    const loader = new TextureLoader();

    loader.load(
      textureUrl,
      (tex) => {
        if (!mounted) return;
        tex.colorSpace = THREE.SRGBColorSpace;
        setTextureMap(tex);
      },
      undefined,
      () => {
        if (!mounted) return;
        setTextureMap(null);
      }
    );

    return () => {
      mounted = false;
    };
  }, [textureUrl]);

  useEffect(() => {
    let mounted = true;
    const loader = new TextureLoader();
    const resolvedRingTexture = ringTextureUrl || 'https://threejs.org/examples/textures/planets/saturnringcolor.jpg';

    loader.load(
      resolvedRingTexture,
      (tex) => {
        if (!mounted) return;
        tex.colorSpace = THREE.SRGBColorSpace;
        setRingMap(tex);
      },
      undefined,
      () => {
        if (!mounted) return;
        setRingMap(null);
      }
    );

    return () => {
      mounted = false;
    };
  }, [ringTextureUrl]);

  useFrame((_state, delta) => {
    angleRef.current += orbitSpeed * speedMult * delta;
    const angle = angleRef.current;

    if (groupRef.current) {
      const x = Math.cos(angle) * orbitRadius;
      const z = Math.sin(angle) * orbitRadius;
      const y = Math.sin(angle * 2) * 0.3;
      groupRef.current.position.set(x, y, z);
      posVec.current.set(x, y, z);
      reportPosition(posVec.current);
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Planet body */}
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
        scale={hovered ? 1.15 : 1}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial
          color={color}
          map={textureMap || undefined}
          emissive={emissive}
          emissiveIntensity={hovered ? 1.2 : 0.3}
          metalness={metalness}
          roughness={roughness}
          envMapIntensity={0.5}
        />
      </mesh>

      {/* Inner atmosphere glow */}
      <mesh scale={hovered ? 1.2 : 1.08}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={hovered ? 0.12 : 0.05} side={THREE.BackSide} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Outer atmosphere haze */}
      <mesh scale={hovered ? 1.35 : 1.2}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial color={emissive} transparent opacity={0.03} side={THREE.BackSide} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Ring */}
      {hasRing && (
        <mesh rotation={[Math.PI / 3, 0, 0]} receiveShadow>
          <ringGeometry args={[size * 1.4, size * 2.0, 96]} />
          <meshStandardMaterial
            map={ringMap || undefined}
            color={color}
            transparent
            opacity={0.55}
            side={THREE.DoubleSide}
            roughness={0.8}
            metalness={0.2}
            emissive={emissive}
            emissiveIntensity={0.1}
          />
        </mesh>
      )}

      {/* Label */}
      <Html position={[0, size + 0.8, 0]} center distanceFactor={18}>
        <div className="planet-label" style={{ opacity: hovered ? 1 : 0.6 }}>
          {name}
        </div>
      </Html>
    </group>
  );
};

export default Planet;
