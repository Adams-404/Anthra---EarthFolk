"use client";

import * as Slider from "@radix-ui/react-slider";
import { AnimatePresence, motion } from "framer-motion";
import { Settings, Volume2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const teamMembers = [
    {
        name: "Alpha Romer Coma",
        position: "Software Developer",
        image: "/credits/coma.jpg",
        linkedin: "https://www.linkedin.com/in/alpharomercoma",
    },
    {
        name: "Rab Karl Colasino",
        position: "Designer, Animations",
        image: "/credits/colasino.jpg",
        linkedin: "https://www.linkedin.com/in/mr-colasino/",
    },
    {
        name: "Aron Joash Pasamante",
        position: "Researcher, Story Writer",
        image: "/credits/pasamante.png",
        linkedin: "https://www.linkedin.com/in/aron-joash-pasamante-337190330/",
    },
    {
        name: "Jommel Rowin Sabater",
        position: "Data Analyst",
        image: "/credits/sabater.jpg",
        linkedin: "https://www.linkedin.com/in/jomszxc/",
    },
    {
        name: "Marc Olata",
        position: "Documentation Specialist",
        image: "/credits/olata.jpg",
        linkedin: "https://www.facebook.com/profile.php?id=100087194946054",
    },
    {
        name: "Abraham Magpantay",
        position: "Adviser",
        image: "/credits/magpantay.jpg",
        linkedin: "https://www.linkedin.com/in/aber-magpantay/",
    },

];

import { ISound, IVolume } from "./discover";

interface ISound {
    soundEnabled: boolean;
    setSoundEnabled: (enabled: boolean) => void;
}

interface IVolume {
    volume: number;
    setVolume: (volume: number) => void;
}

const SettingsComponent: React.FC<ISound & IVolume> = ({ soundEnabled, setSoundEnabled, volume, setVolume }) => {
    const [isOpen, setIsOpen] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume]);

    useEffect(() => {
        if (audioRef.current) {
            if (soundEnabled) {
                audioRef.current.play().catch(error => console.error("Audio playback failed:", error));
            } else {
                audioRef.current.pause();
            }
        }
    }, [soundEnabled]);

    const handleVolumeChange = (newValue: number[]) => {
        setVolume(newValue[0]);
        if (audioRef.current) {
            audioRef.current.volume = newValue[0] / 100;
        }
    };

    const toggleSound = (enabled: boolean) => {
        setSoundEnabled(enabled);
    };

    return (
        <div className="absolute top-4 right-4 z-50">
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Settings className="h-4 w-4" />
                        <span className="sr-only">Open settings</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <DropdownMenuLabel>Settings</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <div className="p-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="sound-toggle" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Enable Sound
                                </Label>
                                <Switch
                                    id="sound-toggle"
                                    checked={soundEnabled}
                                    onCheckedChange={toggleSound}
                                />
                            </div>
                            {soundEnabled && (
                                <div className="mt-4">
                                    <Label htmlFor="volume-slider" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Volume
                                    </Label>
                                    <div className="flex items-center mt-2">
                                        <Volume2 className="w-4 h-4 mr-2" />
                                        <Slider.Root
                                            className="relative flex items-center select-none touch-none w-full h-5"
                                            value={[volume]}
                                            onValueChange={handleVolumeChange}
                                            max={100}
                                            step={1}
                                            aria-label="Volume"
                                        >
                                            <Slider.Track className="bg-secondary relative grow rounded-full h-1">
                                                <Slider.Range className="absolute bg-primary rounded-full h-full" />
                                            </Slider.Track>
                                            <Slider.Thumb
                                                className="block w-4 h-4 bg-primary rounded-full focus:outline-none"
                                            />
                                        </Slider.Root>
                                        <span className="ml-2 text-sm">{volume}%</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </DropdownMenuContent>
            </DropdownMenu>
            <audio ref={audioRef} loop src="/climate_change.mp3" />
        </div>
    );
};

export default SettingsComponent;