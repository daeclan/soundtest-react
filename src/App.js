import React from "react";
import { Canvas } from "react-three-fiber";
import "./styles.css";



export default function App() {
  return (
    <Canvas>
      <directionalLight intensity={0.5} />
      <Scene />
    </Canvas>
  );
}
