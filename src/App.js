import React from "react";
import { Canvas } from "react-three-fiber";
import "./styles.css";

const Floor = () => {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[-2, -2, 0]}>
      <planeBufferGeometry args={[100, 100, 1]} />
      <meshStandardMaterial color="white" />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas>
      <directionalLight intensity={0.5} />
      <Scene />
    </Canvas>
  );
}
