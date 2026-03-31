"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.15;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.6, 32, 32]} />
      <meshStandardMaterial
        color="#171717"
        roughness={0.9}
        metalness={0.1}
        wireframe
        opacity={0.35}
        transparent
      />
    </mesh>
  );
}

function GlowOrb() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    ref.current.rotation.z = s.clock.elapsedTime * 0.2;
  });
  return (
    <Sphere ref={ref} args={[1.4, 64, 64]}>
      <MeshDistortMaterial
        color="#ef4444"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0}
        metalness={0.5}
        opacity={0.2}
        transparent
      />
    </Sphere>
  );
}

export default function GlobeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 55 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#ef4444" />
      <pointLight position={[-5, -5, 3]} intensity={1.5} color="#ffffff" />
      <GlowOrb />
      <Globe />
    </Canvas>
  );
}
