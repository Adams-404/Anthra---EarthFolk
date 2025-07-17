"use client";

import { Html, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import * as THREE from 'three';

// Update the marker data type
import ResponsiveNarrationPlayer from '../narration';
import type { THoverInfo, TMarker } from './africa';
import { Background, Marker } from './africa';


// Define the marker data with the correct type
const markers: TMarker[] = [
    {
        position: [0, 0.5, 3],
        narrationPath: "/sound/america.mp3",
        note: "America", image: "/placeholder.svg?height=200&width=300", story: "In America's vast landscape, carbon emissions loom large. In states like West Virginia and Wyoming, electric power plants are the biggest sinks of carbon dioxide into the air. Natural gas, clean but still guilty, is increasing its share of natural gas. The streets are filled with gasoline-powered vehicles—cars, trucks, and buses—each contributing to a carbon footprint. Industrial giants in the Persian Gulf belched smoke, filling the sky with thick smoke.",
    },
    {
        position: [-1.5, 0.5, 0],
        narrationPath: "/sound/canada.mp3",
        note: "Canada", image: "/placeholder.svg?height=200&width=300", story:
            "Canada's carbon emissions paint a vivid picture of natural resource consumption and energy use. In Alberta, the energy-intensive extraction of bitumen from oil sands sends clouds of carbon dioxide into the sky. The nation's vast power generation, still reliant on coal and natural gas, adds its smoky contribution. On the roads, vehicles guzzle gasoline and diesel, echoing the habits of their southern neighbors. Through these elements, Canada's environmental tale unfolds, each source of emission a verse in its complex carbon narrative."
    }
];

function IsometricMap() {
    const [mapSize] = useState({ width: 19.20, height: 10.80 });
    const [selectedMarker, setSelectedMarker] = useState<THoverInfo | null>(null);
    const texture = useLoader(THREE.TextureLoader, '/map/na.png');

    const { camera } = useThree();

    useEffect(() => {
        camera.position.set(8, 8, 8);
        camera.lookAt(0, 0, 0);
    }, [camera]);

    useEffect(() => {
        if (selectedMarker) {
            camera.position.set(selectedMarker.position[0] + 1, selectedMarker.position[1] + 10, selectedMarker.position[2] + 2);
            camera.lookAt(selectedMarker.position[0], selectedMarker.position[1], selectedMarker.position[2]);
        }
    }, [camera, selectedMarker]);

    return (
        <>
            <Background />
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <boxGeometry args={[mapSize.width, mapSize.height, 0.5]} />
                <meshStandardMaterial map={texture} />
            </mesh>
            {markers.map((marker, index) => (
                <Marker key={index} {...marker} setSelectedMarker={setSelectedMarker} />
            ))}
            {selectedMarker && (
                <Html fullscreen>
                    <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white p-4 rounded-lg">
                        <h2 className="text-xl mb-2 font-bold">{selectedMarker.note}</h2>
                        <p>{selectedMarker.story}</p>
                        <ResponsiveNarrationPlayer narrationPath={selectedMarker.narrationPath} />
                        <button
                            className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                            onClick={() => setSelectedMarker(null)}
                        >
                            Close
                        </button>
                    </div>
                </Html>
            )}
        </>
    );
}

export default function NorthAmericaComponent() {
    return (
        <div className="w-full h-screen bg-white">
            <Canvas shadows>
                <PerspectiveCamera makeDefault fov={75} position={[0, 0, 10]} />
                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[5, 5, 5]}
                    intensity={1}
                    castShadow
                    shadow-mapSize-width={1920}
                    shadow-mapSize-height={1080}
                />
                <IsometricMap />
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
            </Canvas>
        </div>
    );
}