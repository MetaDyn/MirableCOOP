
import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, ScrollControls, Scroll, useScroll, Line, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { Settings, Shield, Trophy, Smartphone, RotateCw, X, Box, Hexagon, Circle, ArrowLeft } from 'lucide-react';
import { Button } from '../components/UIComponents';

interface GameMapScreenProps {
  onOpenSettings: () => void;
  onBack: () => void;
}

// --- 3D Components ---

interface CityNodeProps {
  position: [number, number, number];
  label: string;
  isUnlocked: boolean;
  color?: string;
}

const CityNode: React.FC<CityNodeProps> = ({ position, label, isUnlocked, color = "#E30613" }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current && isUnlocked) {
        meshRef.current.rotation.y += 0.01;
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <group position={position} ref={meshRef}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            {/* City Base */}
            <mesh position={[0, 0.5, 0]}>
                <cylinderGeometry args={[0.8, 0.8, 0.5, 32]} />
                <meshStandardMaterial color={isUnlocked ? "white" : "#ccc"} />
            </mesh>
            
            {/* City Icon (Simplified) */}
            <mesh position={[0, 1.2, 0]} castShadow>
                <boxGeometry args={[0.8, 0.8, 0.8]} />
                <meshStandardMaterial color={isUnlocked ? color : "#888"} />
            </mesh>

            {/* Label */}
            <Text
                position={[0, 2.5, 0]}
                fontSize={0.4}
                color="black"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.02}
                outlineColor="white"
            >
                {label}
            </Text>
        </Float>
        
        {/* Ground Marker */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
            <ringGeometry args={[1, 1.2, 32]} />
            <meshBasicMaterial color={isUnlocked ? color : "#aaa"} opacity={0.5} transparent />
        </mesh>
    </group>
  );
};

const PathLine = ({ points }: { points: THREE.Vector3[] }) => {
    return (
        <Line 
            points={points} 
            color="#E30613" 
            lineWidth={4} 
            dashed={true}
            dashScale={2}
            dashSize={1}
            gapSize={0.5}
        />
    );
};

const GameScene = () => {
    // Define city positions in a winding path along negative Z (scrolling forward/backward)
    const cities = useMemo(() => [
        { id: 1, pos: [0, 0, 0], label: "City 1" },
        { id: 2, pos: [-3, 0, -5], label: "City 2" },
        { id: 3, pos: [3, 0, -10], label: "City 3" },
        { id: 4, pos: [0, 0, -15], label: "City 4" },
        { id: 5, pos: [-4, 0, -20], label: "City 5" },
        { id: 6, pos: [4, 0, -25], label: "City 6" },
        { id: 7, pos: [0, 0, -30], label: "City 7" },
        { id: 8, pos: [-3, 0, -35], label: "City 8" },
        { id: 9, pos: [3, 0, -40], label: "City 9" },
        { id: 10, pos: [0, 0, -45], label: "Final Draw" },
    ], []);

    // Create Vector3 objects safely
    const points = useMemo(() => cities.map(c => new THREE.Vector3(c.pos[0], c.pos[1], c.pos[2])), [cities]);

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <Environment preset="city" />

            <group>
                <PathLine points={points} />
                {cities.map((city, index) => (
                    <CityNode 
                        key={city.id} 
                        position={city.pos as [number, number, number]} 
                        label={city.label} 
                        isUnlocked={index < 3} // Mock unlocked state
                    />
                ))}
            </group>

            {/* Infinite Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, -20]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#f0f0f0" />
            </mesh>
        </>
    );
};

// Camera Controller that follows scroll
const CameraRig = () => {
    const scroll = useScroll();
    useFrame((state) => {
        // Move camera along Z axis based on scroll
        const offset = scroll.offset * 45; // total distance roughly matched to cities z-depth
        state.camera.position.z = 8 - offset;
        state.camera.position.x = Math.sin(scroll.offset * Math.PI) * 2; // Slight sway
        state.camera.lookAt(0, 0, -5 - offset);
    });
    return null;
};

export const GameMapScreen: React.FC<GameMapScreenProps> = ({ onOpenSettings, onBack }) => {
  const [isOverlayDismissed, setIsOverlayDismissed] = useState(false);

  return (
    <div className="w-full h-full bg-gray-50 relative overflow-hidden flex flex-col">
        
        {/* Landscape Enforcement Overlay */}
        {!isOverlayDismissed && (
            <div className="portrait-only absolute inset-0 z-[60] bg-brand-red flex flex-col items-center justify-center text-white p-8 text-center">
                <RotateCw size={64} className="mb-6 animate-spin-slow" />
                <h2 className="text-2xl font-bold mb-2">Please Rotate Your Device</h2>
                <p className="text-white/80 mb-6">The adventure map is best experienced in landscape mode.</p>
                <button 
                    onClick={() => setIsOverlayDismissed(true)}
                    className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-xs font-medium transition-colors"
                >
                    Dismiss (Dev Mode)
                </button>
            </div>
        )}

        {/* Header - Matching Settings Page Style */}
        <div className="bg-white px-4 py-3 flex items-center shadow-sm z-50 shrink-0 justify-between">
            <div className="flex items-center">
                <button 
                    onClick={onBack} 
                    className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors mr-3"
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-lg font-bold text-gray-900">Map</h1>
            </div>
            {/* Optional: Right side header elements if needed (e.g. simple logo) */}
            <div className="text-xs font-bold text-brand-red tracking-widest uppercase">
                COOP Adventure
            </div>
        </div>

        {/* 3D Canvas */}
        <div className="flex-1 w-full relative">
             <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }} className="w-full h-full block">
                <ScrollControls pages={4} damping={0.3}>
                    <GameScene />
                    <CameraRig />
                </ScrollControls>
             </Canvas>
        </div>

        {/* Footer Bar (HUD) - Replicating Mockup Style */}
        <div className="bg-white border-t border-gray-200 px-6 py-2 flex justify-between items-center z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            
            {/* Left: Settings */}
            <button 
                onClick={onOpenSettings}
                className="flex flex-col items-center justify-center text-gray-400 hover:text-brand-red transition-colors group"
            >
                <div className="p-1 rounded-full group-hover:bg-red-50 transition-colors">
                    <Settings size={24} />
                </div>
                <span className="text-[10px] font-bold uppercase mt-1">Settings</span>
            </button>

            {/* Right: Stats */}
            <div className="flex space-x-6">
                 {/* Badge */}
                 <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center text-brand-red mb-1">
                        <Trophy size={16} className="mr-1" />
                        <span className="text-lg font-bold leading-none">0/10</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Badge</span>
                 </div>

                 {/* Sponsor */}
                 <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center text-blue-600 mb-1">
                        <Hexagon size={16} className="mr-1" />
                        <span className="text-lg font-bold leading-none">0/10</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Sponsor</span>
                 </div>

                 {/* Phigital */}
                 <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center text-green-600 mb-1">
                        <Box size={16} className="mr-1" />
                        <span className="text-lg font-bold leading-none">0/10</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Phigital</span>
                 </div>
            </div>
        </div>
    </div>
  );
};
