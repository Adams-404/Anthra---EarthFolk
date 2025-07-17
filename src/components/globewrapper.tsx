"use client";

import { Continent } from '@/app/page';
import React, { useEffect, useRef, useState } from 'react';

interface WorldProps {
    continents: Continent[];
    onSelectContinent: (continent: Continent) => void;
    selectedContinent: Continent | null;
}

const markerSvg = `<svg viewBox="-4 0 36 36">
  <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
  <circle fill="black" cx="14" cy="14" r="7"></circle>
</svg>`;

const GlobeWrapper: React.FC<WorldProps> = ({ continents, onSelectContinent, selectedContinent }) => {
    const [Globe, setGlobe] = useState<any>(null);
    const globeRef = useRef<any>(null);

    useEffect(() => {
        import('react-globe.gl').then((mod) => {
            setGlobe(() => mod.default);
        });
    }, []);

    useEffect(() => {
        if (Globe && globeRef.current) {
            globeRef.current.controls().autoRotate = true;
            globeRef.current.controls().autoRotateSpeed = 0.35;
        }
    }, [Globe]);

    useEffect(() => {
        if (globeRef.current) {
            const controls = globeRef.current.controls();
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.35;

            if (selectedContinent) {
                globeRef.current.pointOfView({ lat: selectedContinent.lat, lng: selectedContinent.lng, altitude: 1.5 }, 1000);
                controls.autoRotate = false;
            } else {
                controls.autoRotate = true;
            }
        }
    }, [selectedContinent]);

    if (!Globe) {
        return null; // or a loading indicator
    }

    return (
        <Globe
            ref={globeRef}
            globeImageUrl="/earth-blue-marble.jpg"
            backgroundImageUrl="/night-sky.png"
            htmlElementsData={continents}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            htmlElement={d => {
                const el = document.createElement('div');
                el.innerHTML = markerSvg;
                el.style.color = (d as Continent).color;
                el.style.width = `40px`;
                el.style.pointerEvents = 'auto';
                el.style.cursor = 'pointer';
                el.onclick = () => onSelectContinent(d as Continent);
                return el;
            }}
        />
    );
};

export default GlobeWrapper;