"use client";

import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";

interface Trophy3DProps {
  modelPath: string;
}

export default function Trophy3D({ modelPath }: Trophy3DProps) {
  const ref = useRef<Group>(null);

  // Decide which path to use
  const fallbackPath = "/models/trophy1.glb";
  const finalPath = modelPath || fallbackPath;

  // Call hook once with final path
  const { scene } = useGLTF(finalPath);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.3;
    }
  });

  return <primitive object={scene} ref={ref} scale={1.5} />;
}

// Preload the models
useGLTF.preload("/models/trophy1.glb");
useGLTF.preload("/models/trophy2.glb");
useGLTF.preload("/models/trophy3.glb");
useGLTF.preload("/models/trophy4.glb");
useGLTF.preload("/models/trophy5.glb");
