import { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";
import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";
import colorfulTexture from "../images/image.jpg";

// Define the custom shader material
const CustomMaterial = shaderMaterial(
    { uTexture: null }, // Define initial uniform for texture
    vertexShader,
    fragmentShader
);

// Extend the shader material
extend({ CustomMaterial });

const Sandbox = () => {
  // Load texture using useLoader
    const texture = useLoader(THREE.TextureLoader, colorfulTexture);

    return (
        <Canvas style={{ background: "#666666" }}>
        <Suspense fallback={null}>
            <ambientLight />
            <OrbitControls enableZoom={true} enableRotate={true} />
            <mesh>
            <planeGeometry args={[2, 2, 10, 10]} />
            {/* Pass the texture as a uniform */}
            <customMaterial uTexture={texture} />
            </mesh>
        </Suspense>
        </Canvas>
    );
};

export default Sandbox;
