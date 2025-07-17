"use client";

import { Html, OrbitControls, PerspectiveCamera, useTexture } from '@react-three/drei';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import ResponsiveNarrationPlayer from '../narration';
// Update the marker data type
export type TMarker = {
    position: [number, number, number];  // Explicitly define as tuple
    note: string;
    image: string;
    story: string;
    narrationPath: string;
};

export type MarkerProps = {
    position: [number, number, number];
    note: string;
    story: string;
    image: string;
    narrationPath: string;
    setSelectedMarker: (info: THoverInfo | null) => void;
};

export type THoverInfo = {
    note: string;
    image: string;
    story: string;
    narrationPath: string;
    position: [number, number, number];
};

const markers: TMarker[] = [
    {
        position: [-2.8, 0.5, -1.8], note: "Nigeria", image: "/placeholder.svg?height=200&width=300", story: "Nigeria, the landscape transforms as forests yield to fields and cities rise from the earth. This shift in land use carves a substantial mark on Africa's carbon footprint. The story of progress intertwines with the breath of the land, echoing both growth and its environmental toll.",
        narrationPath: "/sound/nigeria.mp3",
    },
    {
        position: [3.6, 0.5, 1], note: "Uganda", image: "/placeholder.svg?height=200&width=300", story:
            "Uganda, the aroma of burning leaves fills the air as they crackle in cooking fires. Methane rises, a silent companion to the meals prepared. This ancient practice whispers tales of tradition and necessity, blending with the modern world's unseen impacts.",
        narrationPath: "/sound/uganda.mp3",
    },
    {
        position: [0.2, 0.5, 1], note: "Congo Valley", image: "/placeholder.svg?height=200&width=300", story: "Congo Valley, the tale of carbon emissions begins with the sound of axes and saws.Vast rainforests bow to agriculture and logging, releasing stored carbon into the air.This transformation etches its mark on Africa's carbon footprint, blending the rhythm of progress with echoes of loss.",
        narrationPath: "/sound/congo-valley.mp3",
    },
    {
        position: [4, 0.5, -1.8], note: "Ethiopia", image: "/placeholder.svg?height=200&width=300", story: "Ethiopia, vast livestock farms stretch across the land, where animals graze and grow. Methane rises from their digestion, a silent yet potent contributor to the air. This scene of pastoral life intertwines with the threads of environmental impact, weaving a tale of tradition and change.Ethiopia, vast livestock farms stretch across the land, where animals graze and grow.Methane rises from their digestion, a silent yet potent contributor to the air.This scene of pastoral life intertwines with the threads of environmental impact, weaving a tale of tradition and change.",
        narrationPath: "/sound/ethiopia.mp3",
    },

];

export function Marker({ position, note, image, setSelectedMarker, story, narrationPath }: MarkerProps) {
    const ref = useRef<THREE.Mesh>(null);

    return (
        <mesh
            ref={ref}
            position={position}
            onClick={() => setSelectedMarker({ note, image, story, narrationPath, position })}
        >
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshStandardMaterial color="red" emissive="red" emissiveIntensity={0.5} />
        </mesh>
    );
}


export function Background() {
    const texture = useTexture('/img/smoke.png');
    const { scene } = useThree();

    useEffect(() => {
        const geometry = new THREE.SphereGeometry(500, 60, 40);
        geometry.scale(-1, 1, 1);

        const material = new THREE.MeshBasicMaterial({
            map: texture as THREE.Texture
        });


        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh as any);

        return () => {
            scene.remove(mesh as any);
            geometry.dispose();
            material.dispose();
        };
    }, [scene, texture]);

    return null;
}

function IsometricMap() {
    const [mapSize] = useState({ width: 19.20, height: 10.80 });
    const [selectedMarker, setSelectedMarker] = useState<THoverInfo | null>(null);
    const texture = useLoader(THREE.TextureLoader, '/map/africa.png');

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

export default function AfricaComponent() {
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