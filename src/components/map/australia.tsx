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
        position: [0, 0.5, 0],
        narrationPath: "/sound/australia.mp3",
        note: "Australia",
        image: "/placeholder.svg?height=200&width=300",
        story: "Australia faces serious problems with carbon emissions due to the burning of fossil fuels for fuel and transport, as well as deforestation. The coal industry is the largest contributor to CO2 emissions, with coal-fired power plants producing the most. In addition, the mining sector, which produces coal, iron, and other minerals, contributes to emissions through heavy machinery and transport. Agricultural development, especially animal husbandry, leads to deforestation, increasing natural growth. Logging companies also help convert forests into timber."
    },
];

function IsometricMap() {
    const [mapSize] = useState({ width: 19.20, height: 10.80 });
    const [selectedMarker, setSelectedMarker] = useState<THoverInfo | null>(null);
    const texture = useLoader(THREE.TextureLoader, '/map/aus.png');

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
                <Marker key={index}
                    story={marker.story}
                    note={marker.note}
                    image={marker.image}
                    position={marker.position}
                    narrationPath={marker.narrationPath}
                    setSelectedMarker={setSelectedMarker} />
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

export default function AustraliaComponent() {
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