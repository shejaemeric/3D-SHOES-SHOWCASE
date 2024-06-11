import React, { useEffect, useRef, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { TransformControls } from "@react-three/drei";
import {
  useGLTF,
  PresentationControls,
  Environment,
  ContactShadows,
  Html,
} from "@react-three/drei";
import { useTexture } from "@react-three/drei";
import { AmbientLight, MeshBasicMaterial, Texture } from "three";
import { Text } from "@react-three/drei";
import { degToRad } from "three/src/math/MathUtils";
import { CameraControls } from "@react-three/drei";

function Shoe({ shoes, selectedIndex, colors, shoesInfo }) {
  const gltf = shoes[selectedIndex];
  const ref = useRef();
  const text1 = useRef();
  const text2 = useRef();
  const text3 = useRef();
  const [useHands, setUseHands] = useState(false);
  const camera = useRef();
  const [showCamera, setShowCamera] = useState(false);
  const textures = useTexture([
    process.env.PUBLIC_URL + "black-white.webp",
    process.env.PUBLIC_URL + "brown.png",
    process.env.PUBLIC_URL + "purple.png",
    process.env.PUBLIC_URL + "grey.png",
    process.env.PUBLIC_URL + "red.png",
  ]);

  const handleChange = () => {
    setUseHands(!useHands);
  };

  useEffect(() => {
    gltf.scene.scale.set(5, 5, 5);
    gltf.scene.position.set(1.1, 4, 0.5);
    gltf.scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material.envMapIntensity = 0.8;
        //child.material.wireframe = true;
      }
    });
    gltf.scene.castShadow = true;

    gltf.scene.receiveShadow = true;
  }, [gltf]);

  useFrame((state) => {
    if (!useHands) {
      const t = state.clock.getElapsedTime();
      ref.current.rotation.set(
        Math.cos(t / 4) / 8,
        Math.sin(t / 4) / 8,
        -0.2 - (1 + Math.sin(t / 1.5)) / 20
      );
      ref.current.position.y =
        text1.current.position.y =
        text2.current.position.y =
        text3.current.position.y =
          (3 + Math.sin(t / 1.5)) / 10;
    }
  });
  const intro = async () => {
    camera.current.dolly(-22);
    await camera.current.dolly(22, true);
    setShowCamera(false);
  };

  //   useEffect(() => {
  //     if (setShowCamera) {
  //       intro();
  //     }
  //   }, []);

  return (
    <>
      {showCamera && <CameraControls ref={camera} />}
      <PresentationControls
        global={false}
        cursor={true}
        config={{ mass: 0, tension: 100, friction: 16 }}
        snap={true}
        rotation={[degToRad(0), degToRad(-30), degToRad(0)]}
        polar={[degToRad(-30), degToRad(30)]}
        azimuth={[degToRad(-10), degToRad(80)]}
      >
        <group ref={text1}>
          <Html scale={4} rotation={[0, 0, 0]} position={[0.8, 0.2, 0.55]}>
            <div
              className="annotation"
              style={{ backgroundColor: colors[selectedIndex], color: "white" }}
            >
              Price: {shoesInfo[selectedIndex].price}
            </div>
          </Html>
        </group>

        <group ref={text2}>
          <Html scale={4} rotation={[0, 0, 0]} position={[1.5, 0, 0.55]}>
            <div
              className="annotation"
              style={{ backgroundColor: colors[selectedIndex], color: "white" }}
            >
              Release Date: {shoesInfo[selectedIndex].releaseDate}
            </div>
          </Html>
        </group>

        <group ref={text3}>
          <Html scale={4} rotation={[0, 0, 0]} position={[1.2, -0.2, 0.55]}>
            <div
              className="annotation"
              style={{ backgroundColor: colors[selectedIndex], color: "white" }}
            >
              Series : {shoesInfo[selectedIndex].series}
            </div>
          </Html>
        </group>

        <primitive object={gltf.scene} ref={ref} />
      </PresentationControls>
      <Text
        font="fonts/Poppins-Black.ttf"
        position={[-1.4, 0.3, 0.2]}
        scale={[0.3, 0.3, 0.5]}
        rotateY={degToRad(30)}
      >
        “DREAM IT, {"\n"}DO IT”{" "}
        <meshBasicMaterial map={textures[selectedIndex]} />
      </Text>
    </>
  );
}

export default Shoe;
