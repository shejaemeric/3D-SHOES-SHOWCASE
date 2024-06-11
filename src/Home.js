import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";

import { Environment, ContactShadows } from "@react-three/drei";
import "./style.css";
import Shoe from "./Shoe";
import Overlay from "./Overlay";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import Underlay from "./Underlay";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [shoes, setShoes] = useState(null);
  const array = useLoader(GLTFLoader, [
    process.env.PUBLIC_URL + "models/shoes/shoe-black-white.glb",
    process.env.PUBLIC_URL + "models/shoes/shoe-brown.glb",
    process.env.PUBLIC_URL + "models/shoes/shoe-pink.glb",
    process.env.PUBLIC_URL + "models/shoes/shoe-grey.glb",
    //process.env.PUBLIC_URL + "models/shoes/shoe-dark-red.glb",
  ]);

  const colors = ["#6c6869", "#554649", "#741d5b", "#4c4d51"];
  const shoesInfo = [
    {
      price: "50$",
      releaseDate: "2024-03-28",
      series: "Jordan 5",
    },
    {
      price: "48$",
      releaseDate: "2023-06-19",
      series: "Jordan 4",
    },
    {
      price: "38$",
      releaseDate: "2022-02-18",
      series: "Jordan 3",
    },
    {
      price: "60$",
      releaseDate: "2024-02-28",
      series: "Jordan 5",
    },
  ];
  useEffect(() => {
    console.log(array);
    setShoes(array);
    console.log(shoes);
  }, [array]);

  const handleNext = () => {
    selectedIndex === shoes.length - 1
      ? setSelectedIndex(0)
      : setSelectedIndex(selectedIndex + 1);
  };
  const handlePrevious = () => {
    selectedIndex === 0
      ? setSelectedIndex(shoes.length - 1)
      : setSelectedIndex(selectedIndex - 1);
  };

  return (
    <>
      <Overlay selectedIndex={selectedIndex} colors={colors} />
      <Underlay
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        selectedIndex={selectedIndex}
        colors={colors}
      />

      <Canvas
        //style={{ background: "black" }}
        shadows
        camera={{ position: [0, 0, 4], fov: 45 }}
      >
        <ambientLight intensity={0.5} />
        {shoes && (
          <Shoe
            selectedIndex={selectedIndex}
            shoes={array}
            colors={colors}
            shoesInfo={shoesInfo}
          />
        )}
        <Environment preset="city" />
        <ContactShadows
          position={[0, -0.8, 0]}
          opacity={0.25}
          scale={12}
          blur={0.7}
          far={1.4}
        />
        <EffectComposer disableNormalPass>
          <N8AO color="white" aoRadius={2} intensity={0.1} />
        </EffectComposer>
      </Canvas>
    </>
  );
}

export default Home;
