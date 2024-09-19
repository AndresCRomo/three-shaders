import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";

const CustomMaterial = shaderMaterial({}, vertexShader, fragmentShader,);

extend({ CustomMaterial });

const Sandbox = () => {
    return (
        <Canvas
        camera={{ position: [2, 2, 2], fov: 75 }}
        style={{ background: "#000000" }}
        >
        <Suspense fallback={null}>
            <ambientLight />
            <OrbitControls enableZoom={true} enableRotate={true} />
            <mesh>
            <planeGeometry args={[2, 2]} />
            <customMaterial wireframe={false}  />
            </mesh>
        </Suspense>
        </Canvas>
    );
};

export default Sandbox;
