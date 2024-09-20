import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";

// Define the custom shader material
const CustomMaterial = shaderMaterial(
    { uTime: 0 }, // Uniform for time
    vertexShader,
    fragmentShader
);

// Extend the shader material to use it as a JSX tag
extend({ CustomMaterial });

// Create a component that handles the plane and its material
const AnimatedPlane = () => {
    const ref = useRef();

    // Update the uTime uniform in each frame
    useFrame(({ clock }) => {
        if (ref.current) {
        ref.current.uTime = clock.getElapsedTime()/5;
        }
    });

    return (
        <mesh>
        <sphereGeometry args={[1]} />
        {/* Use the custom shader material */}
        <customMaterial ref={ref} />
        </mesh>
    );
};

const Sandbox = () => {
    return (
        <Canvas style={{ background: "#666666" }}>
        <Suspense fallback={null}>
            <ambientLight />
            <OrbitControls enableZoom={true} enableRotate={true} />
            {/* Render the AnimatedPlane inside Canvas */}
            <AnimatedPlane />
        </Suspense>
        </Canvas>
    );
};

export default Sandbox;
