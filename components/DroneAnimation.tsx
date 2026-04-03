"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, PresentationControls, Float, Sparkles, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

function PlaceholderDrone() {
  const groupRef = useRef<THREE.Group>(null);

  // Rotate slowly over time
  useFrame((state) => {
    if (groupRef.current) {
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <group ref={groupRef}>
         {/* Central Core */}
         <mesh castShadow receiveShadow>
            <octahedronGeometry args={[1, 0]} />
            <MeshTransmissionMaterial 
                thickness={3} 
                roughness={0.1} 
                color="#0058bc" 
                transmission={0.9} 
            />
         </mesh>
         
         {/* Surrounding Rings */}
         <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.5, 0.02, 16, 100]} />
            <meshStandardMaterial color="#8a2bb9" emissive="#8a2bb9" emissiveIntensity={2} />
         </mesh>
         
         <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[2, 0.01, 16, 100]} />
            <meshStandardMaterial color="#c1c6d7" />
         </mesh>

         {/* Internal geometric details */}
         <mesh>
             <icosahedronGeometry args={[0.5, 1]} />
             <meshStandardMaterial color="#ffffff" wireframe />
         </mesh>
      </group>
    </Float>
  );
}

export function DroneAnimation({ className }: { className?: string }) {
  return (
    <div className={`w-full h-full ${className}`}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#8a2bb9" />
            
            <PresentationControls 
                global 
                rotation={[0, 0, 0]} 
                polar={[-Math.PI / 3, Math.PI / 3]} 
                azimuth={[-Math.PI / 1.4, Math.PI / 2]}
            >
                <PlaceholderDrone />
            </PresentationControls>

            {/* Tech Sparkles for "Weightless Core" vibe */}
            <Sparkles count={100} scale={6} size={2} speed={0.4} opacity={0.5} color="#0058bc" />
            <Environment preset="city" />
        </Canvas>
    </div>
  );
}
