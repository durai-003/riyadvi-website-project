
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "motion/react";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";

function GoldenSphere() {
  const sphereRef = useRef();
  const ringRef = useRef();
  const secondRingRef = useRef();

  useFrame((state, delta) => {
    if (!sphereRef.current) return;

    // Smooth rotation controlled by the mouse position
    sphereRef.current.rotation.y +=
      delta * 0.18 + state.pointer.x * delta * 0.35;

    sphereRef.current.rotation.x +=
      (state.pointer.y * 0.25 - sphereRef.current.rotation.x) *
      delta;

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.12;
    }

    if (secondRingRef.current) {
      secondRingRef.current.rotation.x -= delta * 0.1;
    }
  });

  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.4}>
        <mesh ref={sphereRef}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color="#D4AF37"
            metalness={0.85}
            roughness={0.2}
            distort={0.18}
            speed={1.5}
          />
        </mesh>
      </Float>

      <mesh ref={ringRef} rotation={[1.1, 0.2, 0]}>
        <torusGeometry args={[1.45, 0.009, 16, 160]} />
        <meshStandardMaterial
          color="#F0D477"
          metalness={1}
          roughness={0.25}
        />
      </mesh>

      <mesh ref={secondRingRef} rotation={[0.5, 1.1, 0.3]}>
        <torusGeometry args={[1.65, 0.006, 16, 160]} />
        <meshStandardMaterial
          color="#A88420"
          metalness={1}
          roughness={0.3}
        />
      </mesh>

      <mesh position={[1.15, 0.8, 0.2]} scale={0.055}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial color="#FFF0A3" />
      </mesh>

      <mesh position={[-1.25, -0.65, 0.1]} scale={0.035}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial color="#D4AF37" />
      </mesh>
    </group>
  );
}

export default function Hero3D() {
  return (
    <motion.div
      className="hero-visual hero-3d"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
   >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[3, 3, 4]} intensity={35} color="#FFF0B0" />
        <pointLight position={[-3, -2, 2]} intensity={15} color="#D4AF37" />
        <GoldenSphere />
      </Canvas>

      <span className="visual-label">ENGINEER THE FUTURE</span>
    </motion.div>
  );
}
