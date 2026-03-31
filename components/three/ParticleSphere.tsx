"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const ref = useRef<THREE.Points>(null!);

  const particles = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute on sphere surface
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2 + Math.random() * 0.5;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.08;
    ref.current.rotation.x = Math.sin(t * 0.05) * 0.3;
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ef4444"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function InnerCore() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y = t * 0.3;
    meshRef.current.rotation.z = t * 0.15;
    const s = 1 + Math.sin(t * 1.2) * 0.06;
    meshRef.current.scale.setScalar(s);
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[0.9, 1]} />
      <meshStandardMaterial
        color="#dc2626"
        wireframe
        opacity={0.6}
        transparent
      />
    </mesh>
  );
}

export default function ParticleSphere() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ef4444" />
      <pointLight position={[-10, -5, -10]} intensity={0.5} color="#ffffff" />
      <ParticleField />
      <InnerCore />
    </Canvas>
  );
}
