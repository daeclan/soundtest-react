import React, { useRef, Suspense, useState } from "react";
import { Canvas, useFrame, extend } from "react-three-fiber";
import { OrbitControls, useGLTF, Effects } from "drei";
import * as THREE from "three";
import { Box } from "@react-three/drei/shapes";
import "./styles.css";
import url from "./electricity.mp4"
import { MeshStandardMaterial } from "three";
import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass"
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass"
import { WaterPass } from "./WaterPass"

extend({ BloomPass, GlitchPass, WaterPass })


const Floor = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2, -2, 0]}>
      <planeBufferGeometry args={[100, 100, 1]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
};

const TV = () => {
  const { nodes } = useGLTF('tv.gltf')

  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = url;
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.play();
    return vid
  });

  return (
    <group rotation={[Math.PI / 8, Math.PI * 1.2, 0]}>
      <mesh geometry={nodes.TV.geometry}>
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh rotation={[0, 0, 0]} position={[0, 0, 1.1]}>
        <planeGeometry args={[3.2, 1.9]} />
        <meshStandardMaterial emissive={"white"} side={THREE.DoubleSide}>
          <videoTexture attach="map" args={[video]} />
          <videoTexture attach="emissiveMap" args={[video]} />
        </meshStandardMaterial>
      </mesh>
    </group>
  )
}

const WMV = () => {
  const { nodes } = useGLTF('tv.gltf')

  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = url;
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.play();
    return vid
  });

  return (
    <group rotation={[Math.PI / 4, Math.PI * 1.5, 3.8]} position={[0, 0, 0.8]} >
      <mesh geometry={nodes.TV.geometry}>
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh rotation={[0, 0, 0]} position={[0, 0, 1.1]}>
        <planeGeometry args={[3.2, 1.9]} />
        <meshStandardMaterial emissive={"white"} side={THREE.DoubleSide}>
          <videoTexture attach="map" args={[video]} />
          <videoTexture attach="emissiveMap" args={[video]} />
        </meshStandardMaterial>
      </mesh>
    </group>
  )
}


export default function App() {
  return (
    <Canvas>
      <Effects>
        <waterPass attachArray="passes" factor={1} />
        <bloomPass attachArray="passes" />
        <glitchPass attachArray="passes" />
      </Effects>
      <fog attach="fog" args={["black", 1, 7]} />
      <OrbitControls maxPolarAngle={Math.PI / 2} minPolarAngle={0} />
      <directionalLight intensity={0.05} />
      <pointLight intensity={0.2} position={[1, 5, 0]} color="blue" />
      <Suspense fallback={null}>
        <TV />
        <WMV />
      </Suspense>
      <Floor />
    </Canvas>
  );
}
