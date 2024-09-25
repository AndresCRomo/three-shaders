import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, shaderMaterial, useKeyboardControls, } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";
import { BallCollider, Physics, RigidBody ,  } from "@react-three/rapier";
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
    const positionZ = Math.random() * 16 - 8; // Definir la posición z aleatoria
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
            ballRef.current.setTranslation({ x: 0, y: 45, z: positionZ }, true); // Restablecer la posición
            ballRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true); // Restablecer la velocidad
            ballRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true); // Restablecer la velocidad angular
            
        }
        }
    });


    return (
        <>
        <RigidBody ref={ballRef} mass={200} position={[0, 45,positionZ]} type="dinamic">
            <BallCollider  args={[1.87]}  />
            <mesh >
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

    const Arms= () =>{
        const derechaRef = useRef();
        const izquierdaRef = useRef();
        const allKeys = useKeyboardControls((keys) => keys);
        //console.log(allKeys);
        const rotationSpeed = 0.05;

        //rotacion Brazo Izquierdo
        //rotacion inicial
        const rotacionInicialIzquierda= -Math.PI / 1.74;
        const eulerRotationAngleIzquierda2 = new THREE.Euler(rotacionInicialIzquierda, -Math.PI / 0.82, -Math.PI / 1.055);
        const quaternionIzquierda2 = new THREE.Quaternion();
        quaternionIzquierda2.setFromEuler(eulerRotationAngleIzquierda2);
        //rotacion final
        const rotacionFinalIzquierda= -Math.PI / 2;
        const eulerRotationAngleIzquierda = new THREE.Euler(rotacionFinalIzquierda, -Math.PI / 0.82,  -Math.PI / 1.0);
        const quaternionIzquierda = new THREE.Quaternion();
        quaternionIzquierda.setFromEuler(eulerRotationAngleIzquierda);

        
        //rotacion Brazo Derecho
        
        //rotacion inicial
        const rotacionInicial= -Math.PI / 2.38;
        const eulerRotationAngle2 = new THREE.Euler(rotacionInicial, -Math.PI / 0.82, -Math.PI / -1.055);
        const quaternion2 = new THREE.Quaternion();
        quaternion2.setFromEuler(eulerRotationAngle2);
        //rotacion final
        const rotacionFinal= -Math.PI / 2.00;
        const eulerRotationAngle = new THREE.Euler(rotacionFinal, -Math.PI / 0.82, -Math.PI / 1.0);
        const quaternion = new THREE.Quaternion();
        quaternion.setFromEuler(eulerRotationAngle);

        const paddlehandler =()=>{
            if(allKeys.DerechaUp){
                derechaRef.current.setNextKinematicRotation(quaternion)
            }
            else{
                derechaRef.current.setNextKinematicRotation(quaternion2)
            }
            if(allKeys.IzquierdaUp){
                izquierdaRef.current.setNextKinematicRotation(quaternionIzquierda)
            }
            else{
                izquierdaRef.current.setNextKinematicRotation(quaternionIzquierda2)
            }
        }
        useFrame((state)=>{
            paddlehandler();
        });
        
        return( 
            <>
            <RigidBody ref={derechaRef} position={[53, -10, -10]}   type="kinematicPosition">
                    <mesh >
                    <boxGeometry args={[7, 15, 2.35]} />
                    </mesh>
                </RigidBody>
                <RigidBody ref={izquierdaRef} position={[53, -10, 10]} rotation={[-Math.PI / 1.74, 0, 0]} type="kinematicPosition">
                    <mesh >
                    <boxGeometry args={[7, 15, 2.35]} />
                    </mesh>
                </RigidBody>
            </>
        )
    }


    const Sandbox = () => {
        
        

    

    return (
    

        <Canvas
        style={{ background: "#666666" }}
        camera={{
            fov: 75,
            near: 0.1,
            far: 1000,
            position: [100, 10, 0],
        }}
        >
            
        <Suspense fallback={null}>
            <Physics gravity={[0, -9.81, 0]} debug >
                <pointLight position={[2, 2, 10]} />
                <OrbitControls enableZoom={true} enableRotate={true} />

                {/* Renderizar el AnimatedPlane que incluye la lógica de reposición */}
                <AnimatedPlane />

                {/* <RigidBody colliders="hull" type="fixed"  rotation={[0,-Math.PI/1.33,0]}>
                    <mesh position={[0, -2, 0]} >
                    <coneGeometry args={[5, 5,4]} />
                    <meshStandardMaterial color="#84CBEA" />
                    </mesh>
                </RigidBody> */}
                <RigidBody rotation={[0, 0, -Math.PI / 1.3]} position={[30,10,0]} type="fixed">
                    <mesh>
                    <boxGeometry args={[.35, 100,80]} />
                    <meshBasicMaterial color="#84CBEA"  />
                    </mesh>
                </RigidBody>
                <RigidBody rotation={[0, 0, -Math.PI / 1.3]} position={[35,16,0]} type="fixed">
                    <mesh>
                    <boxGeometry args={[.35, 100,80]} />
                    <meshBasicMaterial color="#84CBEA" transparent={true} opacity={0.3} />
                    </mesh>
                </RigidBody>

                <RigidBody type="fixed" position={[32, 13, 40]} rotation={[0,0,-Math.PI/1.3]}>
                    <mesh>
                    <boxGeometry args={[8, 100,2]} />
                    <meshBasicMaterial color="#C92F2F" />
                    </mesh>
                </RigidBody>
                <RigidBody type="fixed" position={[32, 13, -40]} rotation={[0,0,-Math.PI/1.3]}>
                    <mesh>
                    <boxGeometry args={[8, 100,2]} />
                    <meshBasicMaterial color="#C92F2F" />
                    </mesh>
                </RigidBody>
                <RigidBody type="fixed" position={[0, 49, 0]} rotation={[Math.PI/2,0.7,0]}>
                    <mesh>
                    <boxGeometry args={[8, 100,2]} />
                    <meshBasicMaterial color="#C92F2F" />
                    </mesh>
                </RigidBody>
                
                <Arms/>
            </Physics>
        </Suspense>
        </Canvas>
    
    );
};

export default Sandbox;
