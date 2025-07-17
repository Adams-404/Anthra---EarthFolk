"use client";

import { Html, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import * as THREE from 'three';
import ResponsiveNarrationPlayer from '../narration';
// Update the marker data type
import type { THoverInfo, TMarker } from './africa';
import { Background, Marker } from './africa';
// Define the marker data with the correct type
const markers: TMarker[] = [
    {
        position: [0, 0.5, 3],
        narrationPath: "/sound/southeast-asia.mp3",
        note: "Southeast Asia", image: "/placeholder.svg?height=200&width=300", story:
            "In Southeast Asia, the tale of carbon emissions is deeply tied to transportation. As cities expand and economies grow, roads become crowded with cars, trucks, and motorcycles. The constant hum of engines and the plume of exhaust create a dense tapestry of air pollution. This vibrant region’s struggle is to balance rapid development with the need to reduce transportation emissions, weaving a narrative of progress intertwined with environmental consciousness."
    },
    {
        position: [-1, 0.5, 0],
        narrationPath: "/sound/china.mp3",
        note: "China", image: "/placeholder.svg?height=200&width=300", story: "In China, rapid industrialization sweeps the nation into a haze of carbon emissions. Coal-fired power plants breathe life into factories and homes, as cities stretch and transportation hums. The relentless rise in energy demands paints the skies with layers of CO2. This is the tale of a land intertwined with its quest for progress."
    },
    {
        position: [-4, 0.5, 0],
        narrationPath: "/sound/india-and-pakistan.mp3",
        note: "India and Pakistan", image: "/placeholder.svg?height=200&width=300", story:
            "Across India and Pakistan, the carbon story is written in the booming industrial landscapes. Coal-fired power plants energize factories and urban centers, casting a shadow of carbon over the land. The ever-growing cities stretch their reach, fueled by energy demands that keep rising. Together, these nations tell a story of growth amidst the haze of emissions, aiming for a future where development and sustainability coexist."
    },
    {
        position: [-8, 0.5, 1.2],
        narrationPath: "/sound/saudi-arabia.mp3",
        note: "Saudi Arabia", image: "/placeholder.svg?height=200&width=300", story: "In Saudi Arabia, oil flows through the veins of the nation, fueling an energy sector that powers industries and transports dreams. Vast reserves drive carbon emissions skyward as cities rise and energy needs swell. The deserts echo with the whispers of carbon, marking a land steeped in its fossil fuel legacy. This is the saga of an oil-rich kingdom's environment"
    },
];

function IsometricMap() {
    const [mapSize] = useState({ width: 19.20, height: 10.80 });
    const [selectedMarker, setSelectedMarker] = useState<THoverInfo | null>(null);
    const texture = useLoader(THREE.TextureLoader, '/map/asia.png');

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
            </mesh> 1
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

export default function Asia() {
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