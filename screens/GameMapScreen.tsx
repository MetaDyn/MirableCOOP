import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, ScrollControls, Scroll, useScroll, Line, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { Settings, Shield, Trophy, Smartphone, RotateCw } from 'lucide-react';
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
  return (
    <div className="w-full h-screen bg-gray-50 relative overflow-hidden">
        
        {/* Landscape Enforcement Overlay */}
        <div className="portrait-only absolute inset-0 z-[60] bg-brand-red flex flex-col items-center justify-center text-white p-8 text-center">
            <RotateCw size={64} className="mb-6 animate-spin-slow" />
            <h2 className="text-2xl font-bold mb-2">Please Rotate Your Device</h2>
            <p className="text-white/80">The adventure map is best experienced in landscape mode.</p>
        </div>

        {/* UI Overlay (Visible in Landscape) */}
        <div className="absolute top-0 left-0 right-0 p-4 z-50 flex justify-between items-start pointer-events-none">
            {/* Stats */}
            <div className="flex space-x-2 pointer-events-auto">
                 <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 flex flex-col items-center shadow-sm border border-gray-200 min-w-[60px]">
                    <span className="text-[10px] text-gray-500 font-bold uppercase">Badge</span>
                    <span className="text-lg font-bold text-brand-red">0/10</span>
                 </div>
                 <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 flex flex-col items-center shadow-sm border border-gray-200 min-w-[60px]">
                    <span className="text-[10px] text-gray-500 font-bold uppercase">Sponsor</span>
                    <span className="text-lg font-bold text-blue-600">0/10</span>
                 </div>
                 <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 flex flex-col items-center shadow-sm border border-gray-200 min-w-[60px]">
                    <span className="text-[10px] text-gray-500 font-bold uppercase">Phigital</span>
                    <span className="text-lg font-bold text-green-600">0/10</span>
                 </div>
            </div>

            {/* Controls */}
            <div className="flex space-x-2 pointer-events-auto">
                <button 
                    onClick={onOpenSettings}
                    className="bg-white p-3 rounded-full shadow-md text-gray-700 hover:text-brand-red transition-colors"
                >
                    <Settings size={24} />
                </button>
            </div>
        </div>
        
        {/* 3D Canvas */}
        <div className="w-full h-full landscape-only">
             <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
                <ScrollControls pages={4} damping={0.3}>
                    <GameScene />
                    <CameraRig />
                </ScrollControls>
             </Canvas>
             
             {/* Bottom Overlay Instructions */}
             <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
                <div className="inline-block bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-sm text-sm">
                    Scroll to explore the cities
                </div>
             </div>

             {/* Back Button */}
             <div className="absolute top-4 left-4 z-50 portrait:hidden">
                 {/* Can add back functionality here if needed, keeping it clean for now */}
             </div>
        </div>

    </div>
  );
};