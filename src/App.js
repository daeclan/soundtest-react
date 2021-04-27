import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { OrbitControls, useGLTF } from "drei";
import { Box } from "@react-three/drei/shapes";
import "./styles.css";
import { MeshStandardMaterial } from "three";

// const Scene = () => {
//   const scene = useRef();
//   useFrame(() => {
//     scene.current.rotation.y += 0.04;
//     scene.current.rotation.x += 0.04;
//     scene.current.rotation.z += 0.04;
//   });
//   return (
//     <group ref={scene}>
//       <Box>
//         <meshLambertMaterial attach="material" color="white" />
//       </Box>
//     </group>
//   );
// };

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
  return (
    <group rotation={[Math.PI / 8, Math.PI * 1.2, 0]}>
      <mesh geometry={nodes.TV.geometry}>
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  )
}

export default function App() {
  return (
    <Canvas>
      <fog attach="fog" args={["black", 1, 7]} />
      <OrbitControls maxPolarAngle={Math.PI / 2} minPolarAngle={0} />
      <directionalLight intensity={0.5} />
      <Suspense fallback={null}>
        <TV />
      </Suspense>
      <Floor />
    </Canvas>
  );
}
