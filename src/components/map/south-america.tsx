"use client";

import { Html, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import * as THREE from 'three';

import ResponsiveNarrationPlayer from '../narration';
import type { THoverInfo, TMarker } from './africa';
import { Background, Marker } from './africa';

// Define the marker data with the correct type
const markers: TMarker[] = [
    {
        position: [1.5, 0.5, -1.4],
        narrationPath: "/sound/brazil.mp3",
        note: "Brazil", image: "/placeholder.svg?height=200&width=300", story: "In Brazil, the fields resonate with the low hum of cattle grazing. Methane rises from their digestion, a significant contributor to South America's emissions. The land and mines also add to the methane mix. Efforts to mitigate these effects focus on sustainable livestock practices and improved waste management."
    },
    {
        position: [0, 0.5, 2.4],
        narrationPath: "/sound/argentina.mp3",
        note: "Argentina", image: "/placeholder.svg?height=200&width=300", story: "In Argentina, cattle ranching dominates the landscape, producing methane through livestock digestion. The agricultural lands and mining activities contribute further emissions. Strategies here include better agricultural practices and enhanced methane capture technologies to reduce the environmental footprint."
    },
    {
        position: [0, 0.5, -3.4],
        narrationPath: "/sound/colombia.mp3",
        note: "Colombia",
        image: "/placeholder.svg?height=200&width=300", story: "In Colombia, livestock farming and landfills release substantial methane into the atmosphere. Agricultural advancements and waste management improvements are key measures to control these emissions. The country's focus on modernizing farming practices aims to lessen the impact on the environment."
    },
    {
        position: [-1.1, 0.5, -1.5],
        narrationPath: "/sound/peru.mp3",
        note: "Peru", image: "/placeholder.svg?height=200&width=300", story: "In Peru, methane emissions are primarily driven by livestock farming and mining operations. The government is working on improving agricultural methods and waste management practices to control these emissions. Methane capture technologies are also being explored to reduce the environmental footprint."
    },
];

function IsometricMap() {
    const [mapSize] = useState({ width: 19.20, height: 10.80 });
    const [selectedMarker, setSelectedMarker] = useState<THoverInfo | null>(null);
    const texture = useLoader(THREE.TextureLoader, '/map/sa.png');

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

export default function SouthAmericaComponent() {
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