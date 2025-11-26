
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

const ScrollHandler = () => {
    const scroll = useScroll();
    useFrame((state) => {
        // Move camera along Z based on scroll
        // Basic implementation: Camera starts at [0, 5, 5] and moves to [0, 5, -50]
        const targetZ = 5 - (scroll.offset * 55); 
        state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.1);
        state.camera.lookAt(0, 0, targetZ - 10);
    });
    return null;
}

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

    const pathPoints = useMemo(() => cities.map(c => new THREE.Vector3(...c.pos as [number, number, number])), [cities]);

    return (
        <>
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <Environment preset="city" />
            
            <PerspectiveCamera makeDefault position={[0, 5, 5]} fov={50} />

            <ScrollControls pages={4} damping={0.3}>
                <ScrollHandler />
                <group>
                    <PathLine points={pathPoints} />
                    {cities.map((city, index) => (
                        <CityNode 
                            key={city.id} 
                            position={city.pos as [number, number, number]} 
                            label={city.label}
                            isUnlocked={index === 0} // Only first city unlocked for now
                        />
                    ))}
                </group>
            </ScrollControls>

            {/* Simple Grid/Ground for context */}
            <gridHelper args={[100, 100, 0xdddddd, 0xe5e5e5]} position={[0, 0, 0]} />
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
                <planeGeometry args={[100, 200]} />
                <meshBasicMaterial color="#f0f9ff" />
            </mesh>
        </>
    );
};

// --- Main Screen Component ---

export const GameMapScreen: React.FC<GameMapScreenProps> = ({ onOpenSettings, onBack }) => {
    const [dismissOverlay, setDismissOverlay] = useState(false);

    return (
        <div className="h-full w-full flex flex-col relative bg-blue-50/50">
            
            {/* Header - Pinned Top (Shrink-0 prevents collapse) */}
            <div className="bg-white px-4 py-3 flex justify-between items-center shadow-sm z-20 shrink-0">
                <button 
                    onClick={onBack} 
                    className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors flex items-center"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    <span className="font-bold text-gray-800">Map</span>
                </button>
                <div className="flex items-center space-x-2">
                     <span className="bg-brand-red text-white text-xs font-bold px-2 py-1 rounded-full">Level 1</span>
                </div>
            </div>

            {/* 3D Map Canvas - Flex 1 fills remaining space, min-h-0 prevents overflow */}
            <div className="flex-1 min-h-0 relative z-10">
                <Canvas shadows dpr={[1, 2]}>
                    <GameScene />
                </Canvas>
            </div>

            {/* Footer HUD - Pinned Bottom (Shrink-0) */}
            <div className="bg-white/90 backdrop-blur-md border-t border-gray-200 p-4 pb-6 z-20 shrink-0 flex justify-between items-center">
                
                {/* Left: Settings */}
                <button 
                    onClick={onOpenSettings}
                    className="flex flex-col items-center justify-center text-gray-500 hover:text-brand-red transition-colors w-16"
                >
                    <div className="bg-gray-100 p-2 rounded-full mb-1">
                        <Settings size={20} />
                    </div>
                    <span className="text-[10px] font-bold uppercase">Settings</span>
                </button>

                {/* Right: Counters */}
                <div className="flex space-x-4">
                    <div className="flex flex-col items-center">
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Badges</span>
                        <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                             <Shield size={14} className="text-brand-red mr-2" />
                             <span className="text-sm font-bold text-gray-800">0/10</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                         <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Sponsors</span>
                         <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                             <Hexagon size={14} className="text-blue-500 mr-2" />
                             <span className="text-sm font-bold text-gray-800">0/10</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                         <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Phigital</span>
                         <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                             <Box size={14} className="text-purple-500 mr-2" />
                             <span className="text-sm font-bold text-gray-800">0/10</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Landscape Warning Overlay - Transparent */}
            <div className={`fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center bg-black/60 transition-opacity duration-300 portrait-only ${dismissOverlay ? 'opacity-0' : 'opacity-100'}`}>
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 text-center mx-8 pointer-events-auto">
                    <RotateCw className="w-12 h-12 text-white mx-auto mb-4 animate-spin-slow" />
                    <h2 className="text-xl font-bold text-white mb-2">Rotate your device</h2>
                    <p className="text-white/80 text-sm mb-6">
                        For the best experience, please play in landscape mode.
                    </p>
                    <Button 
                        variant="secondary" 
                        onClick={() => setDismissOverlay(true)}
                        className="bg-white/20 border-white/40 text-white hover:bg-white/30"
                    >
                        Dismiss (Dev)
                    </Button>
                </div>
            </div>
        </div>
    );
};
