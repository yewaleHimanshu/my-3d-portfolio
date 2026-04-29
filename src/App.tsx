import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import Scene from './components/Scene';
import InfoPanel from './components/InfoPanel';
import './styles/App.css';

const App: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="app">
      {/* ── Spaceship cockpit HUD ── */}
      <div className="hud-frame">
        {/* Corner brackets */}
        <div className="hud-corner hud-tl"></div>
        <div className="hud-corner hud-tr"></div>
        <div className="hud-corner hud-bl"></div>
        <div className="hud-corner hud-br"></div>

        {/* Cockpit window edge vignette */}
        <div className="hud-viewport"></div>

        {/* Scanline overlay */}
        <div className="hud-scanlines"></div>

        {/* Top bar */}
        <div className="hud-top-bar">
          <span className="hud-text-flicker">SYS: ONLINE</span>
          <span>◆ NAVIGATION ARRAY ◆</span>
          <span className="hud-text-flicker">SHIELD: 100%</span>
        </div>

        {/* Bottom bar */}
        <div className="hud-bottom-bar">
          <span>LAT 28.5° · LON -80.6°</span>
          <span>▸ SECTOR 7G ▸</span>
          <span>WARP: STANDBY</span>
        </div>

        {/* Left side readouts */}
        <div className="hud-side hud-left-side">
          <div className="hud-gauge">
            <span className="hud-gauge-label">THRUST</span>
            <div className="hud-gauge-bar"><div className="hud-gauge-fill" style={{ height: '72%' }}></div></div>
          </div>
          <div className="hud-gauge">
            <span className="hud-gauge-label">FUEL</span>
            <div className="hud-gauge-bar"><div className="hud-gauge-fill hud-fuel" style={{ height: '91%' }}></div></div>
          </div>
        </div>

        {/* Right side readouts */}
        <div className="hud-side hud-right-side">
          <div className="hud-gauge">
            <span className="hud-gauge-label">O₂</span>
            <div className="hud-gauge-bar"><div className="hud-gauge-fill hud-o2" style={{ height: '88%' }}></div></div>
          </div>
          <div className="hud-gauge">
            <span className="hud-gauge-label">TEMP</span>
            <div className="hud-gauge-bar"><div className="hud-gauge-fill hud-temp" style={{ height: '34%' }}></div></div>
          </div>
        </div>

        {/* Center reticle */}
        <div className="hud-reticle">
          <div className="hud-reticle-ring"></div>
          <div className="hud-reticle-dot"></div>
        </div>
      </div>

      <div className="overlay-header">
        <h1>Himanshu Yewale</h1>
        <p>Full Stack Developer · Power Platform · Cloud</p>
      </div>

      <Canvas
        camera={{ position: [0, 15, 35], fov: 60 }}
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
        gl={{
          antialias: true,
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        shadows
      >
        <Scene selected={selected} onSelect={setSelected} />
      </Canvas>

      <AnimatePresence>
        {selected && (
          <InfoPanel planetId={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>

      {!selected && (
        <div className="nav-hint">
          Click a planet to explore · Scroll to zoom · Drag to rotate
        </div>
      )}
    </div>
  );
};

export default App;