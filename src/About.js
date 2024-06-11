import React, { Suspense, useState, useEffect } from "react";
import { Canvas, useLoader } from "@react-three/fiber";

import "./style.css";
// import Home from "./Home";
import { Html, OrbitControls } from "@react-three/drei";
import { degToRad, radToDeg } from "three/src/math/MathUtils";
import { AmbientLight } from "three";
import { Instance, Instances } from "@react-three/drei";
import { RGBELoader } from "three-stdlib";
import { Center, Text3D } from "@react-three/drei";
import { MeshTransmissionMaterial } from "@react-three/drei";
import {
  Environment,
  Lightformer,
  AccumulativeShadows,
  RandomizedLight,
} from "@react-three/drei";
import { useVideoTexture } from "@react-three/drei";
import { useControls } from "leva";
import { MeshReflectorMaterial } from "@react-three/drei";
import { TextureLoader } from "three";

const About = () => {
  return (
    <>
      <Canvas
        shadows
        orthographic
        camera={{ position: [10, 20, 20], zoom: 40 }}
      >
        <color attach="background" args={["#f2f2f500"]} />
        <OrbitControls
          autoRotate={false}
          autoRotateSpeed={-0.1}
          zoomSpeed={0.25}
          minZoom={40}
          maxZoom={140}
          enablePan={false}
          dampingFactor={0.05}
          rotation={[0, degToRad(0), 0]}
          minPolarAngle={degToRad(-360)}
          maxPolarAngle={degToRad(60)}
          minAzimuthAngle={0}
          maxAzimuthAngle={0}
        />
        <Environment resolution={32}>
          <group rotation={[-Math.PI / 4, -0.3, 0]}>
            <Lightformer
              intensity={1}
              rotation-x={Math.PI / 2}
              position={[-2, 5, -9]}
              scale={[10, 10, 1]}
            />
            <Lightformer
              intensity={2}
              rotation-y={Math.PI / 2}
              position={[-5, 1, -1]}
              scale={[10, 2, 1]}
            />
            <Lightformer
              intensity={2}
              rotation-y={Math.PI / 2}
              position={[-5, -1, -1]}
              scale={[10, 2, 1]}
            />
            <Lightformer
              intensity={2}
              rotation-y={-Math.PI / 2}
              position={[10, 1, 0]}
              scale={[20, 2, 1]}
            />
            <Lightformer
              type="ring"
              intensity={2}
              rotation-y={Math.PI / 2}
              position={[-0.1, -1, -5]}
              scale={10}
            />
          </group>
        </Environment>
        {/** Soft shadows */}
        <AccumulativeShadows
          frames={100}
          colorBlend={5}
          toneMapped={true}
          alphaTest={0.3}
          opacity={0.6}
          scale={30}
          position={[0, -1.01, 0]}
        >
          <RandomizedLight
            amount={4}
            radius={10}
            ambient={0.5}
            intensity={1}
            position={[0, 10, -10]}
            size={1}
            mapSize={1024}
            bias={0.0001}
            castShadow={false}
          />
        </AccumulativeShadows>

        <Text />
      </Canvas>
    </>
  );
};

const Text = () => {
  const texture = useVideoTexture(process.env.PUBLIC_URL + "texture-video.mov");

  const config = useControls({
    backside: false,
    backsideThickness: { value: 0.84, min: 0, max: 2 },
    samples: { value: 13, min: 1, max: 32, step: 1 },
    resolution: { value: 2048, min: 64, max: 2048, step: 64 },
    transmission: { value: 1, min: 0, max: 1 },
    thickness: { value: 0, min: 0, max: 5 },
    roughness: { value: 0, min: 0, max: 1, step: 0.01 },
    ior: { value: 2, min: 0, max: 2, step: 0.01 },
    color: "#ff0000",
    gColor: "#ff0202",
  });
  const font = "/Inter_Medium_Regular.json";
  return (
    <group>
      <Center
        scale={[0.8, 1, 1]}
        front
        top
        rotation={[0, 0, 0]}
        position={[0, 0, 2.25]}
      >
        <Text3D
          castShadow
          bevelEnabled
          font={font}
          scale={5}
          letterSpacing={0.03}
          height={0.25}
          bevelSize={0.01}
          bevelSegments={10}
          curveSegments={128}
          bevelThickness={0.01}
        >
          JORDAN
          <MeshTransmissionMaterial background={texture} {...config} />
        </Text3D>
      </Center>
      <Grid />
    </group>
  );
};

const Grid = () => {
  // const textures = useTexture({
  //     map: process.env.PUBLIC_URL + "ground.jpeg",
  //     aoMap: process.env.PUBLIC_URL + "ground-ao.png",
  //     roughnessMap: process.env.PUBLIC_URL + "ground-rough.png",
  //     // metalnessMap: process.env.PUBLIC_URL + "ground-normal.jpeg",
  //     normalMap: process.env.PUBLIC_URL + "ground-normal.png",
  //     diffuseMap: process.env.PUBLIC_URL + "ground-diffuse.png",
  //     displacementMap: process.env.PUBLIC_URL + "ground-displacement.png",
  //   });
  return (
    <Instances position={[0, 0, 0]}>
      <planeGeometry args={[0.016, 0]} />
      <meshBasicMaterial color="#00000042" />
      {Array.from({ length: 63 }, (_, y) =>
        Array.from({ length: 63 }, (_, x) => (
          <group
            key={x + ":" + y}
            position={[
              x * 2 - Math.floor(63 / 2) * 2,
              -0.01,
              y * 2 - Math.floor(63 / 2) * 2,
            ]}
          >
            <Instance rotation={[-Math.PI / 2, 0, 0]} />
            <Instance rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
          </group>
        ))
      )}
      <gridHelper args={[100, 100, "#bbb", "#bbb"]} position={[0, 0, 0]} />
    </Instances>
  );
};

export default About;
