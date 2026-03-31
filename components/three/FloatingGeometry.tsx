"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Torus, Icosahedron, Float } from "@react-three/drei";
import * as THREE from "three";

function Scene() {
  const torusRef = useRef<THREE.Mesh>(null!);
  const icoRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    torusRef.current.rotation.x = t * 0.3;
    torusRef.current.rotation.y = t * 0.15;
    icoRef.current.rotation.y = -t * 0.2;
    icoRef.current.rotation.x = t * 0.1;
  });

  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={torusRef} position={[0, 0, 0]}>
          <torusKnotGeometry args={[0.9, 0.3, 100, 16]} />
          <meshStandardMaterial
            color="#ef4444"
            roughness={0.1}
            metalness={0.8}
            wireframe={false}
          />
        </mesh>
      </Float>
      <mesh ref={icoRef} position={[1.8, -0.5, -1]}>
        <icosahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color="#737373" wireframe opacity={0.7} transparent />
      </mesh>
    </>
  );
}

export default function FloatingGeometry() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 60 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#ef4444" />
      <pointLight position={[-5, -5, 5]} intensity={0.8} color="#ffffff" />
      <spotLight position={[0, 10, 5]} angle={0.3} color="#dc2626" intensity={1} />
      <Scene />
    </Canvas>
  );
}
