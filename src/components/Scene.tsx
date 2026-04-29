import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import Sun from './Sun';
import Planet from './Planet';

const PLANETS = [
  {
    id: 'skills',
    name: '✦ Skills',
    orbitRadius: 7,
    orbitSpeed: 0.2,
    size: 0.9,
    color: '#4fc3f7',
    emissive: '#0277bd',
    metalness: 0.8,
    roughness: 0.2,
    textureUrl: 'https://threejs.org/examples/textures/planets/mercury.jpg',
    hasRing: true,
    ringTextureUrl: 'https://threejs.org/examples/textures/planets/saturnringcolor.jpg',
    startAngle: 0,
  },
  {
    id: 'experience',
    name: '✦ Experience',
    orbitRadius: 11,
    orbitSpeed: 0.15,
    size: 1.2,
    color: '#ef5350',
    emissive: '#b71c1c',
    metalness: 0.4,
    roughness: 0.7,
    textureUrl: 'https://threejs.org/examples/textures/planets/mars_1k_color.jpg',
    hasRing: false,
    startAngle: Math.PI * 0.5,
  },
  {
    id: 'projects',
    name: '✦ Projects',
    orbitRadius: 15,
    orbitSpeed: 0.1,
    size: 1.4,
    color: '#66bb6a',
    emissive: '#2e7d32',
    metalness: 0.6,
    roughness: 0.4,
    textureUrl: 'https://threejs.org/examples/textures/planets/jupiter2_1024.jpg',
    hasRing: true,
    ringTextureUrl: 'https://threejs.org/examples/textures/planets/saturnringcolor.jpg',
    startAngle: Math.PI,
  },
  {
    id: 'certifications',
    name: '✦ Certifications',
    orbitRadius: 19,
    orbitSpeed: 0.08,
    size: 1.0,
    color: '#ab47bc',
    emissive: '#6a1b9a',
    metalness: 0.3,
    roughness: 0.1,
    textureUrl: 'https://threejs.org/examples/textures/planets/venus_surface.jpg',
    hasRing: false,
    startAngle: Math.PI * 1.3,
  },
  {
    id: 'contact',
    name: '✦ Contact',
    orbitRadius: 23,
    orbitSpeed: 0.06,
    size: 0.8,
    color: '#26c6da',
    emissive: '#00838f',
    metalness: 0.9,
    roughness: 0.1,
    textureUrl: 'https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg',
    hasRing: false,
    startAngle: Math.PI * 1.7,
  },
];

const OrbitLine: React.FC<{ radius: number }> = ({ radius }) => (
  <mesh rotation={[-Math.PI / 2, 0, 0]}>
    <ringGeometry args={[radius - 0.02, radius + 0.02, 180]} />
    <meshBasicMaterial color="#4488ff" transparent opacity={0.04} side={THREE.DoubleSide} depthWrite={false} />
  </mesh>
);

const NebulaParticles: React.FC = () => {
  const geometry = useMemo(() => {
    const count = 800;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 30 + Math.random() * 90;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.6;
      positions[i * 3] = r * Math.cos(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * 0.5;
      positions[i * 3 + 2] = r * Math.cos(phi) * Math.sin(theta);
      const palette = Math.random();
      if (palette < 0.33) {
        colors[i * 3] = 0.4 + Math.random() * 0.2;
        colors[i * 3 + 1] = 0.1;
        colors[i * 3 + 2] = 0.6 + Math.random() * 0.4;
      } else if (palette < 0.66) {
        colors[i * 3] = 0.05;
        colors[i * 3 + 1] = 0.2 + Math.random() * 0.3;
        colors[i * 3 + 2] = 0.6 + Math.random() * 0.4;
      } else {
        colors[i * 3] = 0.6 + Math.random() * 0.3;
        colors[i * 3 + 1] = 0.2 + Math.random() * 0.2;
        colors[i * 3 + 2] = 0.1;
      }
      sizes[i] = 0.2 + Math.random() * 0.6;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  return (
    <points geometry={geometry}>
      <pointsMaterial size={0.4} vertexColors transparent opacity={0.5} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
};

interface SceneProps {
  selected: string | null;
  onSelect: (id: string | null) => void;
}

const Scene: React.FC<SceneProps> = ({ selected, onSelect }) => {
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();
  const planetPositions = useRef<Record<string, THREE.Vector3>>({});
  const speedMult = selected ? 0.05 : 1;

  const defaultCamPos = useMemo(() => new THREE.Vector3(0, 15, 35), []);
  const defaultTarget = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const sunPos = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const tempTarget = useMemo(() => new THREE.Vector3(), []);
  const tempCamPos = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    if (!controlsRef.current) return;

    if (selected === 'about') {
      tempTarget.set(0, 1, 0);
      tempCamPos.set(3, 2, 5);
      camera.position.lerp(tempCamPos, 0.03);
      controlsRef.current.target.lerp(tempTarget, 0.03);
    } else if (selected && planetPositions.current[selected]) {
      const pos = planetPositions.current[selected];
      tempTarget.set(pos.x, pos.y + 0.5, pos.z);
      tempCamPos.set(pos.x + 2.5, pos.y + 1.5, pos.z + 4);
      camera.position.lerp(tempCamPos, 0.03);
      controlsRef.current.target.lerp(tempTarget, 0.03);
    } else {
      camera.position.lerp(defaultCamPos, 0.03);
      controlsRef.current.target.lerp(defaultTarget, 0.03);
    }
    controlsRef.current.update();
  });

  return (
    <>
      <color attach="background" args={['#020208']} />
      <fog attach="fog" args={['#020208', 60, 120]} />

      {/* Lighting */}
      <ambientLight intensity={0.04} color="#1a1a3e" />
      <hemisphereLight args={['#1a0a2e', '#000510', 0.15]} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={0.3}
        color="#ffd4a0"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={80}
        shadow-camera-near={1}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />

      <Stars radius={120} depth={80} count={8000} factor={5} saturation={0.7} fade speed={0.3} />
      <NebulaParticles />

      <Sun onClick={() => onSelect(selected === 'about' ? null : 'about')} />

      {PLANETS.map((p) => (
        <React.Fragment key={p.id}>
          <OrbitLine radius={p.orbitRadius} />
          <Planet
            {...p}
            speedMult={speedMult}
            onClick={() => onSelect(selected === p.id ? null : p.id)}
            reportPosition={(pos) => { planetPositions.current[p.id] = pos; }}
          />
        </React.Fragment>
      ))}

      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        minDistance={5}
        maxDistance={60}
        enableDamping
        dampingFactor={0.05}
      />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.25} darkness={0.9} />
      </EffectComposer>
    </>
  );
};

export default Scene;
