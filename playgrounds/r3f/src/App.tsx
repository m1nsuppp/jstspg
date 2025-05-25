import { useState, useRef, type JSX } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Mesh, Vector3 } from "three";
import { OrbitControls } from "@react-three/drei";

function Box2() {
  const meshRef = useRef<Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [position, setPosition] = useState<Vector3>(new Vector3(0, 0, 0));

  return (
    <>
      <directionalLight position={[1, 1, 1]} />
      <axesHelper scale={10} />
      <OrbitControls />
      <mesh
        ref={meshRef}
        position={position}
        onClick={() => {
          setPosition(new Vector3(position.x + 1, position.y, position.z));
        }}
        onPointerOver={() => {
          setHover(true);
          setPosition(new Vector3(1, 1, 1));
        }}
        onPointerOut={() => {
          setHover(false);
          setPosition(new Vector3(0, 0, 0));
        }}
      >
        <boxGeometry />
        <meshStandardMaterial color={hovered ? "orange" : "hotpink"} />
      </mesh>
    </>
  );
}

function App(): JSX.Element {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas>
        <Box2 />
      </Canvas>
    </div>
  );
}

export default App;
