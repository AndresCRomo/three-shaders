import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, shaderMaterial, KeyboardControls } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";
import { BallCollider, Physics, RigidBody } from "@react-three/rapier";
import * as THREE from "three";

// Define the custom shader material
const CustomMaterial = shaderMaterial(
    { uTime: 0, uColor: new THREE.Color("#84CBEA") }, // Uniform for time
    vertexShader,
    fragmentShader
);

// Extend the shader material to use it as a JSX tag
extend({ CustomMaterial });

// Create a component that handles the plane and its material
    const AnimatedPlane = () => {
    const ref = useRef();
    const ballRef = useRef();
    const ballRef2 = useRef();
    const ballRef3 = useRef();
    const initialPosition = [0, 3, 0]; // Define the posición inicial de la esfera

    // Actualizar en cada frame
    useFrame(({ clock }) => {
        // Actualizar el tiempo del shader
        if (ref.current) {
        ref.current.uTime = clock.getElapsedTime() / 10;
        }

        // Verificar la posición de la esfera
        if (ballRef.current) {
        const ballPosition = ballRef.current.translation();
        //console.log(ballPosition.y); // Log para depuración

        if (ballPosition.y < -20) {
            // Verificar si la posición y es menor que -20
            ballRef.current.setTranslation({ x: 0, y: 3, z: 0 }, true); // Restablecer la posición
            ballRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true); // Restablecer la velocidad
            ballRef.current.setAdditionalMass(0.54);
        }
        }
    });

    return (
        <>
        <RigidBody ref={ballRef} type="KinematicPositionBased">
            <BallCollider args={[1.87]} position={[0, 3, 0]} />
            <mesh position={[0, 3, 0]}>
            <icosahedronGeometry args={[1, 200]} />
            <customMaterial  /> {/* Usar el material personalizado  para aplicar el movimiento del shader agrega el ref*/}
            </mesh>
        </RigidBody>
        {/* <RigidBody ref={ballRef2} type="KinematicPositionBased">
            <BallCollider args={[1.87]} position={[0, 5, -5]} />
            <mesh position={[0, 5, -5]}>
            <icosahedronGeometry args={[1, 200]} />
            <customMaterial  />
            </mesh>
        </RigidBody>
        <RigidBody ref={ballRef3} type="KinematicPositionBased">
            <BallCollider args={[1.87]} position={[5, 8, 0]} />
            <mesh position={[5, 8, 0]}>
            <icosahedronGeometry args={[1, 200]} />
            <customMaterial  />
            </mesh>
        </RigidBody> */}
        </>
    );
    };

    const Sandbox = () => {
        const derechaRef = useRef();
        const izquierdaRef = useRef();
    return (
    <KeyboardControls
        map={[
        { name: "Derecha", keys: ["ArrowRight", "d", "D"] },
        { name: "Izquierda", keys: ["ArrowDown", "a", "A"] },
        ]}
    >

        <Canvas
        style={{ background: "#666666" }}
        camera={{
            fov: 75,
            near: 0.1,
            far: 1000,
            position: [60, 10, 10],
        }}
        >
        <Suspense fallback={null}>
            <Physics gravity={[0, -9.81, 0]}>
                <pointLight position={[2, 2, 10]} />
                <OrbitControls enableZoom={true} enableRotate={true} />

                {/* Renderizar el AnimatedPlane que incluye la lógica de reposición */}
                <AnimatedPlane />

                <RigidBody type="fixed">
                    <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <boxGeometry args={[15, 15, 0.35]} />
                    </mesh>
                </RigidBody>
                <RigidBody ref={izquierdaRef}  type="fixed">
                    <mesh position={[0, -10, -10]} rotation={[-Math.PI / 2.39, 0, 0]}>
                    <boxGeometry args={[7, 15, 2.35]} />
                    </mesh>
                </RigidBody>
                <RigidBody ref={derechaRef} type="fixed">
                    <mesh position={[0, -10, 10]} rotation={[-Math.PI / 1.74, 0, 0]}>
                    <boxGeometry args={[7, 15, 2.35]} />
                    </mesh>
                </RigidBody>
            </Physics>
        </Suspense>
        </Canvas>
    </KeyboardControls>
    );
};

export default Sandbox;
