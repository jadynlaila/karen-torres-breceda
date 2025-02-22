import React from "react"
import './Gallery.css'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Suspense, useRef, useState } from 'react'
import { OrbitControls, GizmoHelper, GizmoViewcube, GizmoViewport, useTexture, Plane, MeshDistortMaterial } from '@react-three/drei'
import { useControls } from 'leva'
import { easing } from 'maath'
import { Color, CubeTextureLoader, MeshBasicMaterial, SRGBColorSpace, TextureLoader } from 'three'


function ClickableImage({ url, descriptorUrl, enlargedHeight, isActive, startPosition, onClick, defaultHeight}) {
  const ref = useRef();
  const texture = useLoader(TextureLoader, url);
  const descriptorTexture = useLoader(TextureLoader, descriptorUrl);
  const aspectRatio = texture.image.width / texture.image.height;
  const descriptorAspectRatio = descriptorTexture.image.width / descriptorTexture.image.height;
  const [showDescriptor, setShowDescriptor] = useState(false);
  const descriptorOpacity = useRef(0); 

  useFrame((state, dt) => {
    let targetHeight = isActive ? enlargedHeight : defaultHeight;
    let targetWidth = targetHeight * aspectRatio;

    const targetPosition = isActive ? [-2, 0, 1] : startPosition;

    easing.damp3(ref.current.position, targetPosition, 0.2, dt);
    easing.damp3(ref.current.scale, [targetWidth, targetHeight, 1], 0.2, dt);

    const distance = ref.current.position.distanceTo({x: targetPosition[0], y:targetPosition[1], z:targetPosition[2]});
    if (isActive && distance < 0.1) {
      setShowDescriptor(true);
    } else { 
      setShowDescriptor(false);
      descriptorOpacity.current = 0;
    }
    if (showDescriptor) {
      easing.damp(descriptorOpacity, "current", 1, 0.2, dt);
    }
  });
  return (
    <>
    <mesh ref={ref} position={startPosition} onClick={onClick}>
      <planeGeometry args={[1, 1, 64, 64]} />
      <meshPhongMaterial map={texture} transparent />
    </mesh>
    {isActive && (
      <mesh position={[2, 0, 1]}>
        <planeGeometry args={[1, 1, 64, 64]} />
        <meshPhongMaterial map={descriptorTexture} transparent />
      </mesh>
    )}
    </>
  );
}


function UpdateSceneBackground() {
  const { scene } = useThree();
  const texture = useTexture('/background.png');
  texture.colorSpace = SRGBColorSpace;
  scene.background = texture;
}


function Gallery() {
  const [activeImage, setActiveImage] = useState(null);

  const images = [
    { id:1, url: "/no_background.png", descriptorUrl: "/speech-bubble.png", position: [-2, 2, 0], defaultHeight: 2, enlargedHeight: 6 },
    { id:2, url: "/background.png", descriptorUrl: "/speech-bubble.png", position: [2, 2, 0], defaultHeight: 1, enlargedHeight: 5},
  ];


  return (
    <div id="canvas-container">
      <Canvas>
        {images.map((img, index) => (
          <ClickableImage key={index} descriptorUrl={img.descriptorUrl} defaultHeight={img.defaultHeight} enlargedHeight={img.enlargedHeight} url={img.url} startPosition={img.position} isActive={activeImage === img.id} onClick={() => setActiveImage(activeImage === img.id ? null : img.id)}/>
        ))}     
        <ambientLight intensity={3} />
        <UpdateSceneBackground/>
      </Canvas>
    </div>
  )
}

export default Gallery;
